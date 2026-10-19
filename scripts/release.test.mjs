import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { hash, verifyImage, existingImageDigest, verifiedRuntimeImage } from './release-image.mjs'

const sha = 'a'.repeat(40)
const date = '2026-10-14T00:00:00Z'
function fixture(change = {}) {
  const config = Buffer.from(JSON.stringify({ os: 'linux', architecture: 'amd64', config: { Labels: {
    'org.opencontainers.image.revision': sha,
    'org.opencontainers.image.source': 'https://github.com/e-dialect/edialect.top',
    'org.opencontainers.image.version': `sha-${sha}`,
    'org.opencontainers.image.created': date,
  } }, ...change }))
  const raw = Buffer.from(JSON.stringify({ mediaType: 'application/vnd.oci.image.manifest.v1+json', config: { digest: hash(config), size: config.length } }))
  return { config, raw, digest: hash(raw) }
}
test('manifest hashes actual raw config and accepts only correct identity', () => {
  const f = fixture()
  assert.equal(verifyImage(f.raw, f.config, f.digest, sha, date), hash(f.config))
  assert.throws(() => verifyImage(f.raw, Buffer.from('{}'), f.digest, sha, date))
  assert.throws(() => verifyImage(f.raw, f.config, 'sha256:' + '0'.repeat(64), sha, date))
  assert.throws(() => verifyImage(f.raw, f.config, f.digest, 'b'.repeat(40), date))
  const arm = fixture({ architecture: 'arm64' })
  assert.throws(() => verifyImage(arm.raw, arm.config, arm.digest, sha, date))
})
test('unknown registry access fails closed and only new-package 404 is absent', async () => {
  const old = globalThis.fetch
  process.env.GHCR_TOKEN = 'synthetic-only'
  try {
    globalThis.fetch = async () => ({ status: 403, ok: false })
    await assert.rejects(existingImageDigest('web', sha, date))
    globalThis.fetch = async () => ({ status: 404, ok: false })
    assert.equal(await existingImageDigest('web', sha, date), '')
  } finally { globalThis.fetch = old; delete process.env.GHCR_TOKEN }
})

const yaml = readFileSync(new URL('../.github/workflows/release.yml', import.meta.url), 'utf8')
const authorization = yaml.split('          script: |\n')[1].split('\n  publish:')[0].split('\n').map(line => line.replace(/^            /, '')).join('\n')
const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor
async function authorize(change = {}, main = sha, gate = 'success') {
  const run = { id: 123, head_sha: sha, head_branch: 'main', head_repository: { full_name: 'e-dialect/edialect.top', id: 389886047 }, repository: { full_name: 'e-dialect/edialect.top', id: 389886047 }, workflow_id: 456, event: 'push', run_number: 7, status: 'completed', conclusion: 'success', ...change }
  const out = {}
  const github = { rest: { repos: { getBranch: async () => ({ data: { commit: { sha: main } } }) }, actions: {
    getWorkflow: async () => ({ data: { id: 456 } }), getWorkflowRun: async () => ({ data: run }),
    listWorkflowRuns: async () => ({ data: { workflow_runs: [run] } }), listJobsForWorkflowRun: () => {},
  } }, paginate: async () => [{ name: 'CI gate', status: 'completed', conclusion: gate }] }
  await new AsyncFunction('github', 'context', 'core', authorization)(github, { repo: {}, payload: { workflow_run: { id: 123, head_sha: sha } } }, { setOutput: (k, v) => { out[k] = v } })
  return out
}
test('trusted exact current main and CI gate authorize the SHA', async () => {
  assert.equal((await authorize()).source_sha, sha)
})
for (const [name, change, main, gate] of [
  ['PR run', { event: 'pull_request' }],
  ['fork', { head_repository: { full_name: 'someone/edialect.top', id: 1 } }],
  ['different workflow', { workflow_id: 99 }],
  ['failed CI', { conclusion: 'failure' }],
  ['incomplete CI', { status: 'in_progress' }],
  ['another latest run', { id: 124 }],
  ['wrong source SHA', { head_sha: 'b'.repeat(40) }],
  ['non-main', { head_branch: 'other' }],
  ['advanced main', {}, 'b'.repeat(40)],
  ['failed gate', {}, sha, 'failure'],
]) {
  test(`reject ${name}`, async () => { await assert.rejects(authorize(change, main, gate)) })
}

test('publication requires completed exact-SHA smoke with every route and asset kind', () => {
  const good = {
    result: 'PASS', cleanup: 'PASS', sourceSHA: sha,
    routes: ['/', '/about', '/introduction'], javaScriptAssets: 3, cssAssets: 2,
    imageId: 'sha256:' + 'c'.repeat(64), containerPort: 8080,
    nonRoot: true, readOnlyRootFilesystem: true,
    runtimeLimits: {
      capDrop: ['ALL'], securityOpt: ['no-new-privileges:true'],
      memoryBytes: 128 * 1024 * 1024, memorySwapBytes: 128 * 1024 * 1024,
      nanoCpus: 500_000_000, pidsLimit: 64,
      tmpfs: { '/tmp': 'rw,noexec,nosuid,size=32m' },
    },
  }
  assert.equal(verifiedRuntimeImage(good, sha), good.imageId)
  for (const change of [
    { result: 'FAIL' }, { cleanup: 'FAIL' }, { sourceSHA: 'b'.repeat(40) },
    { routes: ['/'] }, { cssAssets: 0 }, { javaScriptAssets: 0 }, { imageId: '' },
    { containerPort: 80 }, { nonRoot: false }, { readOnlyRootFilesystem: false },
    { runtimeLimits: { ...good.runtimeLimits, pidsLimit: 128 } },
  ]) {
    assert.throws(() => verifiedRuntimeImage({ ...good, ...change }, sha))
  }
})

#!/usr/bin/env python3
"""Bounded HTTP smoke of the exact static image; only its disposable container is removed."""
import argparse
import json
import re
import subprocess
import time
import urllib.parse
import urllib.request
import uuid


def docker(*args):
    return subprocess.check_output(['docker', *args], stderr=subprocess.PIPE, timeout=60).decode().strip()


def check(image, source_sha):
    info = json.loads(docker('image', 'inspect', image))[0]
    assert info['Os'] == 'linux' and info['Architecture'] == 'amd64'
    assert info['Config']['Labels']['org.opencontainers.image.revision'] == source_sha
    name = 'homepage-smoke-' + uuid.uuid4().hex
    cid = name  # Also clean up if docker run times out after creating the container.
    result = {'result': 'FAIL', 'cleanup': 'PENDING', 'sourceSHA': source_sha, 'imageId': info['Id']}
    try:
        cid = docker('run', '-d', '--pull=never', '--name', name, '--label', 'edialect.homepage-smoke=' + name,
                     '--memory', '128m', '--cpus', '1', '--pids-limit', '128', '-p', '127.0.0.1::80', info['Id'])
        bound = json.loads(docker('inspect', cid))[0]['NetworkSettings']['Ports']['80/tcp']
        assert len(bound) == 1 and bound[0]['HostIp'] == '127.0.0.1'
        origin = 'http://127.0.0.1:' + bound[0]['HostPort']
        opener = urllib.request.build_opener(urllib.request.ProxyHandler({}))

        def get(path):
            with opener.open(origin + path, timeout=5) as response:
                assert response.status == 200 and response.url == origin + path
                body = response.read(8 * 1024 * 1024 + 1)
                assert 0 < len(body) <= 8 * 1024 * 1024
                return body, response.headers.get_content_type()

        for attempt in range(30):
            try:
                get('/')
                break
            except Exception:
                if attempt == 29:
                    raise
                time.sleep(1)
        routes = ['/', '/about', '/introduction']
        for route in routes:
            body, mime = get(route)
            assert mime == 'text/html' and b'id="app"' in body and 'E方言'.encode() in body
        # Fetch every emitted JS/CSS asset, including lazy route chunks.
        assets = docker('exec', cid, 'find', '/usr/share/nginx/html', '-type', 'f').splitlines()
        counts = {'js': 0, 'css': 0}
        for filename in assets:
            if not filename.endswith(('.js', '.css')):
                continue
            suffix = filename.rsplit('.', 1)[1]
            path = '/' + urllib.parse.quote(filename.removeprefix('/usr/share/nginx/html/'), safe='/')
            body, mime = get(path)
            assert mime in ({'application/javascript', 'text/javascript'} if suffix == 'js' else {'text/css'})
            assert not body.lstrip().lower().startswith((b'<!doctype html', b'<html'))
            counts[suffix] += 1
        assert counts['js'] and counts['css']
        result.update(result='PASS', routes=routes, javaScriptAssets=counts['js'], cssAssets=counts['css'])
    finally:
        if cid:
            docker('rm', '-f', cid)
        result['cleanup'] = 'PASS'
    return result


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--image', required=True)
    parser.add_argument('--source-sha', required=True)
    args = parser.parse_args()
    assert re.fullmatch('[a-f0-9]{40}', args.source_sha)
    print(json.dumps(check(args.image, args.source_sha), indent=2))

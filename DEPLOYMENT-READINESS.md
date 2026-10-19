# Deployment readiness

This branch contains a local static-image candidate only. The release branch is
still awaiting explicit confirmation; this work does not publish an image or
authorize deployment.

The candidate listens on container port `8080`. The repository Compose route
label targets `8080`, and CI builds and starts the exact image in a disposable
container to test the routes and emitted assets. That runtime check uses the
deployment prototype's non-root, read-only root filesystem, dropped capabilities,
no-new-privileges, 128 MiB memory/swap, 0.5 CPU, 64 PID, and 32 MiB `/tmp` tmpfs
profile. PID, cache, and Nginx temporary paths are under `/tmp`.

The local static deployment prototype preserves the existing private Traefik
route label and does not infer a new router port from image `ExposedPorts`. The
currently captured route uses port `80`, so the candidate cannot be deployed
through that frozen configuration as-is. After the release branch is confirmed
and the prototype receives its separate review, deployment preparation must
explicitly update the route target from `80` to `8080` and verify it against the
private runtime configuration. Do not treat this local candidate or its CI run
as production acceptance.

# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.162.0/containers/typescript-node/.devcontainer/base.Dockerfile

# [Choice] Node.js version
ARG VARIANT="24"
FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:${VARIANT}

RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends python3-venv

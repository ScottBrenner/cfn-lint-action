# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.1.0](https://github.com/ScottBrenner/cfn-lint-action/releases/tag/v2.1.0)

### Added

- Cloud FormationLinter [Problem Matchers](https://github.com/actions/toolkit/blob/main/docs/problem-matchers.md).
- Pre-Commit Hook for running `npm run all` to ensure the software is automatically re-built on changes.

### Changed

- Metadata cleanup within `package.json` to better align with software.

## [2.0.1](https://github.com/ScottBrenner/cfn-lint-action/releases/tag/v2.0.1)

### Changed

- Bump @vercel/ncc from 0.27.0 to 0.28.3

## [2.0.0](https://github.com/ScottBrenner/cfn-lint-action/releases/tag/v2.0.0)

### Added

- GitHub Action is now written in JavaScript.
- Unit Tests (90% Coverage).
- User can now specify any command they need to run.

### Removed

- The default functionality to run a command.

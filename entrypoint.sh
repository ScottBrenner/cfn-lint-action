#!/bin/sh

set -e

echo "INFO: This version of cfn-lint-action is deprecated, please upgrade via https://github.com/ScottBrenner/cfn-lint-action#upgrading-from-version-1"

# Copy the matcher to the host system; otherwise "add-matcher" can't find it.
cp /cfn-lint.json /github/workflow/cfn-lint.json
echo "::add-matcher::${RUNNER_TEMP}/_github_workflow/cfn-lint.json"

sh -c "cfn-lint $*"

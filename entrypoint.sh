#!/bin/sh

set -e

# Copy the matcher to the host system; otherwise "add-matcher" can't find it.
cp /cfn-lint.json /github/workflow/cfn-lint.json
echo "::add-matcher::${RUNNER_TEMP}/_github_workflow/cfn-lint.json"

sh -c "cfn-lint $*"

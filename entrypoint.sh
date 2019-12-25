#!/bin/sh

set -e

echo "::add-matcher::/cfn-lint.json"

sh -c "cfn-lint $*"

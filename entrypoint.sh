#!/bin/sh

set -e

sh -c "cfn-lint $*"

#!/usr/bin/env bats

PATH="$PATH:$BATS_TEST_DIRNAME/bin"

function setup() {
  # Ensure GITHUB_WORKSPACE is set
  export GITHUB_WORKSPACE="."
}

@test "entrypoint runs successfully" {
  run ls
  run cfn-lint --help
  echo "$output"
  [ "$status" -eq 0 ]
}

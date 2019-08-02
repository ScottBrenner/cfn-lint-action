#!/usr/bin/env bats

@test "entrypoint runs successfully" {
  chmod a+x test/bin/cfn-lint
  run test/bin/cfn-lint
  echo "$output"
  [ "$status" -eq 0 ]
}

# GitHub Action for CloudFormation Linter

This Action for [CloudFormation Linter](https://github.com/aws-cloudformation/cfn-python-lint/) enables arbitrary actions for interacting with CloudFormation Linter to validate CloudFormation yaml/json templates against the CloudFormation spec and additional checks. Includes checking valid values for resource properties and best practices.

## Usage

An example workflow for testing CloudFormation templates for correct properties and their values - run the `cfn-lint` command with the path to the files you want to test as `args`.


```yaml
name: Lint CloudFormation Templates

on: [push]

jobs:
  cloudformation-linter:

    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v1

    - name: puppet-lint
      uses: scottbrenner/cfn-lint-action@master
      with:
        args: **/*.yaml
```

See [Basic Usage](https://github.com/aws-cloudformation/cfn-python-lint#basic-usage) for full usage details.

## License

The Dockerfile and associated scripts and documentation in this project are released under the [MIT License](LICENSE).

Container images built with this project include third party materials. See [THIRD_PARTY_NOTICE.md](THIRD_PARTY_NOTICE.md) for details.

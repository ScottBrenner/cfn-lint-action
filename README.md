# GitHub Action for CloudFormation Linter

This Action for [CloudFormation Linter](https://github.com/aws-cloudformation/cfn-python-lint/) enables arbitrary actions for interacting with CloudFormation Linter to validate CloudFormation yaml/json templates against the CloudFormation spec and additional checks. Includes checking valid values for resource properties and best practices.

The Action's primary purpose is to set the [CloudFormation Linter](https://github.com/aws-cloudformation/cfn-python-lint/) to the runner's $PATH so you can access the linter throughout the workflow, and use in a way that suits your application. There is a way to run a [CloudFormation Linter](https://github.com/aws-cloudformation/cfn-python-lint/) command in this workflow though if you like.

## Usage

There are multiple ways to consume this GitHub Action.

The recommended approach would be to to use this action to add the [CloudFormation Linter](https://github.com/aws-cloudformation/cfn-python-lint/) to the runners $PATH and run commands throughout the rest of the workflow. An example of that can be found below:

```yaml
name: Lint CloudFormation Templates

on: [push]

jobs:
  cloudformation-linter:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v2

      - name: Setup Cloud Formation Linter with Latest Version
        uses: scottbrenner/cfn-lint-action@v2

      - name: Print the Cloud Formation Linter Version & run Linter.
        run: |
          cfn-lint --version
          cfn-lint -t ./template.yml
```

Within the `run |` section, you specify the required Cloud Formation Linter commands.

However, if you would rather run the Cloud Cloud Formation Linter commands within this action. That is also possible. An example of that can be found below:

```yaml
name: Lint CloudFormation Templates

on: [push]

jobs:
  cloudformation-linter:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v2

      - name: Testing with CFN Lint Command
        uses: ./
        with:
          command: cfn-lint -t ./template.yml
```

Further, you can configure this action to download a specific version of the [CloudFormation Linter](https://github.com/aws-cloudformation/cfn-python-lint/), as well as the Python interpreter. See the table below for all the `INPUTS` this action can take.

| Input Name | Input Description                                  | Default Value                                             | Required? |
| ---------- | -------------------------------------------------- | --------------------------------------------------------- | --------- |
| version    | Version of CFN PyPi Package                        | Latest Version of CFN PyPi Package                        | false     |
| python     | Python Version                                     | Defaults to `python` on Windows, and `python3` otherwise. | false     |
| command    | Cloud Formation Linter Command to Run Afer Install | N/A                                                       | false     |

This GitHub Action does not directly output any values.

## How to use the Cloud Formation Linter?

See [Cloud Formation Linter Usage](https://github.com/aws-cloudformation/cfn-python-lint#basic-usage) for full usage details.

## Upgrading from Version 1?

The main difference between Version 1 and Version 2 is the fact Version 2 by default doesn't run any linting commands. The primary purpose of this action is now to provide the underlying [CloudFormation Linter](https://github.com/aws-cloudformation/cfn-python-lint/) package and enable you to run your commands. To upgrade from Version 1 to Version 2, follow the steps below:

#### Step One

Change the action in your Workflow to be:

```
- name: Setup Cloud Formation Linter with Latest Version
  uses: scottbrenner/cfn-lint-action@v2
```

#### Step Two

Below the above include the following:

```
- name: Print the Cloud Formation Linter Version & run Linter.
  run: |
    cfn-lint --version
    cfn-lint -t ./**/*.yaml
```

This should give you the same experience as before.

## License

Please see the [LICENSE](https://github.com/ScottBrenner/cfn-lint-action/blob/master/LICENSE).

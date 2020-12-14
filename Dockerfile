FROM python:3.9.1-alpine

LABEL name="cfn-lint-action"
LABEL repository="https://github.com/ScottBrenner/cfn-lint-action"
LABEL homepage="https://github.com/ScottBrenner/cfn-lint-action"
LABEL org.opencontainers.image.source="https://github.com/ScottBrenner/cfn-lint-action"

LABEL "com.github.actions.name"="cfn-lint-action"
LABEL "com.github.actions.description"="GitHub Action for CloudFormation Linter"
LABEL "com.github.actions.icon"="box"
LABEL "com.github.actions.color"="green"

LABEL "maintainer"="Scott Brenner <scott@scottbrenner.me>"

RUN pip install cfn-lint --no-cache-dir
RUN cfn-lint --update-specs
RUN cfn-lint --update-iam-policies

COPY cfn-lint.json /cfn-lint.json
COPY entrypoint.sh /entrypoint.sh
RUN ["chmod", "+x", "/entrypoint.sh"]
ENTRYPOINT ["/entrypoint.sh"]
CMD ["**/*.yml"]

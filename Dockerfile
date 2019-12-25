FROM alpine:3

LABEL name="cfn-lint-action"
LABEL version="1.3.0"
LABEL repository="https://github.com/ScottBrenner/cfn-lint-action"
LABEL homepage="https://github.com/ScottBrenner/cfn-lint-action"

LABEL "com.github.actions.name"="cfn-lint-action"
LABEL "com.github.actions.description"="GitHub Action for CloudFormation Linter"
LABEL "com.github.actions.icon"="box"
LABEL "com.github.actions.color"="green"

LABEL "maintainer"="Scott Brenner <scott@scottbrenner.me>"

RUN apk --no-cache add python3
RUN pip3 install cfn-lint

COPY cfn-lint.json /cfn-lint.json
COPY entrypoint.sh /entrypoint.sh
RUN ["chmod", "+x", "/entrypoint.sh"]
ENTRYPOINT ["/entrypoint.sh"]
CMD ["**/*.yml"]

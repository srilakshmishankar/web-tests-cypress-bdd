This is project for full stack web application testing.

- Has cypress e2e tests

More details on Notes.md

## Getting started

- Clone this repo to your local machine

Run this once after clone: `make build`

## Running the e2e tests

To run the Cypress tests locally headless, run the following commands:

`make e2e-tests-local-run-download-test`

`make e2e-tests-local-run-upload-test`

`make e2e-tests-local-run-all-test`

To run the Cypress tests on docker, run the following command: `make e2e-tests-docker`

Tests could fail because of captcha check.
To test on local system in debug mode: `make e2e-tests-local-development`

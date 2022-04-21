# Notes

## Test strategy

- I have time boxed and tried to implement tests for Upload, download with critical scenarios to start with
- Used Cypress framework
- Implemented CI using [circleci](https://app.circleci.com/pipelines/github/srilakshmishankar/wetransfer-web-tests) (.circleci/config.yml)
- Test report using mochawesome
  (cypress/results,mochawesome.html)
- Cypress test screenshot and videos (cypress/screenshots, cypress/videos)
- Makefile for easy access to commands
- README.md with instruction to run the tests

##Task

- Upload tests (With different file types, size and single, multiple upload and folder uploads)
- Download tests (1 positive scenario for download)
- Transfer link verification

I am not using static files for the tests but generating them on the go, better for the repo and CI/CD when we have to test with a lot of files and sizes.

##Test improvements:

- There were some problems I faced with folder upload and large size file upload for which test implementaion is ready but due to problems with Cypress and Node.js I could not dig deep keeping in time constraints in mind.
- Some waits (2 places) have been used due to the way app is implemented and this of course is not my preferred way and this can be handled with explicit waits (here we need to keep clicking on transfers till its available, not sure if thats the ideal behavior we want for the user)
- From coverage point of view for this app needs to be done at different levels of testing to avoid duplication and unstable long e2e test: test from user perspective on e2e and cover maximum functionality and branches at unit, itegration and feature level.

##Framework improvements:

- There were a lot of inconsistent UI which is difficult to handle without setting some cookies or session storage, for example captcha appears randomly, continue transfer button.
- Started implementing cleanup and this might need better planning for - new account behavior, existing account behavior etc so some assumptions have been made for the purpose of the task that we are testing existing account behavior.
- With better element locators we can make tests more stable.
- And a lot of refactor can be done on further test plans and re-usability of the test methods and validation

Overall I have used some shortcuts to attempt maximum things as part of this assignment

##Bug:
There is a bug in the received transfers section --> if title and message have space or special characters then that item is not visible on the list.
Currently received section is not appearing at all which was working a day before (not sure about this behavior)

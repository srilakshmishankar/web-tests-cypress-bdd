Feature: File upload tests

  Background:
  Given user is logged into the app and is on the homepage

  Scenario: User should be able to upload a file
    When user uploads a file
    Then file upload should be successful

#  Scenario: User should be able to upload multiple files
#    Given user logs into the app
#    When user uploads multiple files
#    Then file upload should be successful

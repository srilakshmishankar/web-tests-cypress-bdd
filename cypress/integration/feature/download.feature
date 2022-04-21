@download @test
Feature: File upload tests

  Background:
    Given user is logged into the app and is on the homepage

  @stable
  Scenario: User should be able to download a file received
    Given user uploads multiple files to self email
    Then the files should be present in received section
    And user should be able to download the files successfully
    Then user opens the received item
    Then user copies the transfer link and verifies transfer link

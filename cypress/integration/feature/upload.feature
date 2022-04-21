@upload
Feature: File upload tests

  Background:
    Given user is logged into the app and is on the homepage

  @stable
  Scenario Outline: Upload different types of file
    When user uploads a "<fileName>" file of type "<type>"
    Then file "<fileName>" of type "<type>" upload should be successful

    Examples:
      | fileName | type |
      | 1.txt    | txt  |
      | 2.pdf    | pdf  |
      | 3.gif    | gif  |
      | 4.jpg    | jpg  |
      | 5.aac    | aac  |
      | 6.mp3    | mp3  |
      | 7.avi    | avi  |
      | 8.mp4    | mp4  |
      | 9.bat    | bat  |
      | 10.exe   | exe  |
      | 11.zip   | zip  |
      | 12.tar   | tar  |

  @stable
  Scenario: User should be able to upload multiple files and verify transfer link
    When user uploads multiple files
    Then multiple file uploads should be successful
    Then user opens the sent item
    Then user copies the transfer link and verifies transfer link

  @stable
  Scenario: Verify expired transfer link
    When user uploads multiple files
    Then multiple file uploads should be successful
    Then user opens the sent item
    Then user copies the transfer link and verifies transfer link
    When user deletes the transfer
    Then the transfer link should be expired

  # Implementation for below tests are done
  #--- but cypress does not have capability to upload folder ---
  @unstable
  Scenario: User should be able to upload a folder containing files
    When user uploads a folder
    Then folder upload should be successful

  #--- and node.js error to upload big file (needs some digging) ---
  @unstable
  Scenario: Upload a large file
    When user uploads files exceeding 2GB
    Then user should see an error message

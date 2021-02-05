Feature: Login
  In order to gain access to the application
  As a user
  I login to my account

  Scenario: E-Mail address must not be used already
    Given I am a user with E-Mail "test@example.com" and password "12345678"
    When I login to the application
    Then the request is successful
    And the response contains a token
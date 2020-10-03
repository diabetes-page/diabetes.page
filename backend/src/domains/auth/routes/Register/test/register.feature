Feature: Registration
  In order to use the application
  As a user
  I can register a new account

  Scenario: Password must be at least 8 characters
    When I register a new account with E-Mail "test@example.com" and password "example"
    Then the request is rejected
    And the reason for the rejection is that the password must be at least 8 characters long

  Scenario: E-Mail address must have correct format
    When I register a new account with E-Mail "aaaaaaaaaa" and password "12345678"
    Then the request is rejected
    And the reason for the rejection is that the E-Mail address has the wrong format

  Scenario: E-Mail address must not be used already
    # Given a user
    When I register a new account with E-Mail "test@example.com" and password "12345678"
    Then the request is rejected
    And the reason for the rejection is that the E-Mail is already in use
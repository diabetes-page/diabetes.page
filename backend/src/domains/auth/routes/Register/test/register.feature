Feature: Registration
  In order to use the application
  As a user
  I can register a new account

  Scenario: Password must be at least 8 characters
    When I register a new account with E-Mail "test@example.com" and password "example"
    Then the request is rejected
    #And the reason for the rejection is that the password is too short
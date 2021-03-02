Feature: Registration
  In order to use the application
  As a user
  I can register a new account

  Scenario: Password must be at least 8 characters
    When I register a new account with name "Walter White", e-mail "test@example.com" and password "example"
    Then the request is rejected
    And the reason for the rejection is that the password must be at least 8 characters long

  Scenario: e-mail address must have correct format
    When I register a new account with name "Jesse Pinkman", e-mail "aaaaaaaaaa" and password "12345678"
    Then the request is rejected
    And the reason for the rejection is that the e-mail address has the wrong format

  Scenario: Name must not be empty
    When I register a new account with name "", e-mail "test@example.com" and password "12345678"
    Then the request is rejected
    And the reason for the rejection is that the name must not be empty

  Scenario: e-mail address must not be used already
    Given there is a user with name "Mr. X" and e-mail "test@example.com"
    When I register a new account with name "Gustavo Fring", e-mail "test@example.com" and password "12345678"
    Then the request is rejected
    And the reason for the rejection is that the e-mail is already in use
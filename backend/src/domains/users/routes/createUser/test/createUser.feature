Feature: Registration
  In order to use the application
  As a user
  I can register a new account

  Scenario: Password must be at least 8 characters
    Given I am a user with name "Jesse Pinkman", E-Mail "test@example.com" and password "12345678"
    And the user "Jesse Pinkman" is a consultant
    And I am logged in
    When I create a new account with name "Walter White", E-Mail "test2@example.com" and password "example"
    Then the request is rejected
    And the reason for the rejection is that the password must be at least 8 characters long

  Scenario: E-Mail address must have correct format
    Given I am a user with name "Jesse Pinkman", E-Mail "test@example.com" and password "12345678"
    And the user "Jesse Pinkman" is a consultant
    And I am logged in
    When I create a new account with name "Jesse Pinkman", E-Mail "aaaaaaaaaa" and password "12345678"
    Then the request is rejected
    And the reason for the rejection is that the E-Mail address has the wrong format

  Scenario: Name must not be empty
    Given I am a user with name "Jesse Pinkman", E-Mail "test@example.com" and password "12345678"
    And the user "Jesse Pinkman" is a consultant
    And I am logged in
    When I create a new account with name "", E-Mail "test2@example.com" and password "12345678"
    Then the request is rejected
    And the reason for the rejection is that the name must not be empty

  Scenario: E-Mail address must not be used already
    Given I am a user with name "Jesse Pinkman", E-Mail "test@example.com" and password "12345678"
    And the user "Jesse Pinkman" is a consultant
    And I am logged in
    And there is a user with name "Mr. X" and E-Mail "test2@example.com"
    When I create a new account with name "Gustavo Fring", E-Mail "test@example.com" and password "12345678"
    Then the request is rejected
    And the reason for the rejection is that the E-Mail is already in use

Feature: Registration
  In order to use the application
  As a user
  I can register a new account

  Scenario: E-Mail address must have correct format
    Given I am a user with name "Jesse Pinkman", e-mail "test@example.com" and password "12345678"
    And the user "Jesse Pinkman" is a consultant
    And I am logged in
    When I create a new account with name "Jesse Pinkman", E-Mail "aaaaaaaaaa"
    Then the request is rejected
    And the reason for the rejection is that the e-mail address has the wrong format

  Scenario: Name must not be empty
    Given I am a user with name "Jesse Pinkman", e-mail "test@example.com" and password "12345678"
    And the user "Jesse Pinkman" is a consultant
    And I am logged in
    When I create a new account with name "", E-Mail "test2@example.com"
    Then the request is rejected
    And the reason for the rejection is that the name must not be empty

  Scenario: e-mail address must not be used already
    Given I am a user with name "Jesse Pinkman", e-mail "test@example.com" and password "12345678"
    And the user "Jesse Pinkman" is a consultant
    And I am logged in
    And there is a user with name "Mr. X" and e-mail "test2@example.com"
    When I create a new account with name "Gustavo Fring", E-Mail "test@example.com"
    Then the request is rejected
    And the reason for the rejection is that the e-mail is already in use

  Scenario: User Created Successfully
    Given I am a user with name "Jesse Pinkman", e-mail "test@example.com" and password "12345678"
    And the user "Jesse Pinkman" is a consultant
    And I am logged in
    When I create a new account with name "Gustavo Fring", E-Mail "test2@example.com"
    Then the request is successful and resource created


Feature: Registration
  In order to use the application
  As a user
  I can register a new account

  Scenario: E-mail address must have correct format
    Given I am a user with name "Jesse Pinkman", e-mail "test@example.com" and password "12345678"
    And the user "Jesse Pinkman" is a consultant
    And I am logged in
    When I create a new account with name "Jesse Pinkman" and e-mail "aaaaaaaaaa"
    Then the request is rejected
    And the reason for the rejection is that the e-mail address has the wrong format
    And no e-mails were sent

  Scenario: Name must not be empty
    Given I am a user with name "Jesse Pinkman", e-mail "test@example.com" and password "12345678"
    And the user "Jesse Pinkman" is a consultant
    And I am logged in
    When I create a new account with name "" and e-mail "test2@example.com"
    Then the request is rejected
    And the reason for the rejection is that the name must not be empty
    And no e-mails were sent

  Scenario: E-mail address must not be used already
    Given I am a user with name "Jesse Pinkman", e-mail "test@example.com" and password "12345678"
    And the user "Jesse Pinkman" is a consultant
    And I am logged in
    And there is a user with name "Mr. X" and e-mail "test2@example.com"
    When I create a new account with name "Gustavo Fring" and e-mail "test@example.com"
    Then the request is rejected
    And the reason for the rejection is that the e-mail is already in use
    And no e-mails were sent

  Scenario: User created successfully
    Given I am a user with name "Jesse Pinkman", e-mail "test@example.com" and password "12345678"
    And the user "Jesse Pinkman" is a consultant
    And I am logged in
    When I create a new account with name "Gustavo Fring" and e-mail "test2@example.com"
    Then the request is successful and the resource created
    And the following e-mails were sent:
      | Recipient         | Subject       | Language |
      | test2@example.com | Gustavo Fring | en       |
    And e-mail number 1 had the following content:
      | Hi Gustavo Fring                                                                        |
      |                                                                                         |
      | Welcome to diabetes.page! We just have to check that this is really your email address. |
      |                                                                                         |
      | Click here to verify your email address.                                                |
      |                                                                                         |
      | Best wishes                                                                             |
      |                                                                                         |
      | Your diabetes.page team                                                                 |
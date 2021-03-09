Feature: Login
  In order to gain access to the application
  As a user
  I can login to my account

  Scenario: I can login with valid credentials
    Given I am a user with name "X", e-mail "test@example.com" and password "12345678"
    When I login to the application with e-mail "test@example.com" and password "12345678"
    Then the request is successful
    And the response contains a token
    And the token is valid
    And the response contains the id, email and name of me

  Scenario: I cannot login with wrong e-mail
    Given I am a user with name "X", e-mail "test@example.com" and password "12345678"
    When I login to the application with e-mail "fail@example.com" and password "12345678"
    Then the request is unauthenticated

  Scenario: I cannot login with wrong password
    Given I am a user with name "X", e-mail "test@example.com" and password "12345678"
    When I login to the application with e-mail "test@example.com" and password "fail"
    Then the request is unauthenticated

  Scenario: I cannot login without password
    Given I am a user with name "X", e-mail "test@example.com" and password "12345678"
    When I login to the application with e-mail "test@example.com" and no password
    Then the request is rejected

  Scenario: I cannot login with empty password
    Given I am a user with name "X", e-mail "test@example.com" and password "12345678"
    When I login to the application with e-mail "test@example.com" and empty password
    Then the request is rejected

  Scenario: I cannot login without e-mail
    Given I am a user with name "X", e-mail "test@example.com" and password "12345678"
    When I login to the application with no e-mail and password "12345678"
    Then the request is rejected

  Scenario: I cannot login with empty e-mail
    Given I am a user with name "X", e-mail "test@example.com" and password "12345678"
    When I login to the application with empty e-mail and password "12345678"
    Then the request is rejected

  Scenario: I can't login if verification token is set
    Given I am a user with name "X", E-Mail "test@example.com" and password "12345678"
    And I have a verification token set
    When I login to the application with E-Mail "test@example.com" and password "12345678"
    Then the request is unauthenticated
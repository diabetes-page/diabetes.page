Feature: Check authentication status
  In order to see if I am still logged in
  As a user
  I can check my authentication status

  Scenario: I am not authenticated without a token
    Given I have no JSON Web Token
    When I check my authentication status
    Then the request is unauthenticated

  Scenario: I am not authenticated with a wrong token
    Given I have a JSON Web Token "abcdef"
    When I check my authentication status
    Then the request is unauthenticated

  Scenario: I am not authenticated if my account is deleted
    Given I am a user with name "X", e-mail "test@example.com" and password "12345678"
    And I am logged in
    And my account is deleted
    When I check my authentication status
    Then the request is unauthenticated

  Scenario: I am not authenticated without a token
    Given I am a user with name "X", e-mail "test@example.com" and password "12345678"
    And I am logged in
    When I check my authentication status
    Then the request is successful
    And the response shows that I am authenticated
    And the response contains my user id
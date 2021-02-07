Feature: Check authentication status
  In order to see if I am still logged in
  As a user
  I can check my authentication status

  Scenario: I am not authenticated without a token
    Given I have no JSON Web Token
    When I check my authentication status
    Then the request is unauthorized

  Scenario: I am not authenticated with a wrong token
    Given I have a JSON WEB Token "abcdef"
    When I check my authentication status
    Then the request is unauthorized

  Scenario: I am not authenticated if my account is deleted
    Given I am a user with name "X", E-Mail "test@example.com" and password "12345678"
    And I have a valid JSON Web Token
    And my account is deleted
    When I check my authentication status
    Then the request is unauthorized
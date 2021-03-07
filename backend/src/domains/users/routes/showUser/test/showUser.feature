Feature: Show user
  In order to check my profile data
  As an appointment participant
  I can look at information about my profile

  Scenario: As a participant, I can check my own profile
    Given I am a user with name "Jesse Pinkman", e-mail "jp@example.com" and password "12345678"
    And I am logged in
    When I request the user profile of "Jesse Pinkman"
    Then the request is successful
    And the response contains the following user data:
      | Name       | Jesse Pinkman  |
      | E-Mail     | jp@example.com |
      | Consultant | No             |
      | Manager    | No             |

  Scenario: As a consultant, I cannot check another user's profile
    Given I am a user with name "Jesse Pinkman", e-mail "jp@example.com" and password "12345678"
    And there is a user with name "Gus Fring" and e-mail "gf@example.com"
    And I am logged in
    When I request the user profile of "Gus Fring"
    Then the request is unauthorized

  Scenario: As a consultant, I can check another user's profile
    Given I am a user with name "Jesse Pinkman", e-mail "jp@example.com" and password "12345678"
    And the user "Jesse Pinkman" is a consultant
    And there is a user with name "Walter White" and e-mail "ww@example.com"
    And the user "Walter White" is a consultant
    And I am logged in
    When I request the user profile of "Walter White"
    Then the request is successful
    And the response contains the following user data:
      | Name       | Walter White   |
      | E-Mail     | ww@example.com |
      | Consultant | Yes            |
      | Manager    | No             |

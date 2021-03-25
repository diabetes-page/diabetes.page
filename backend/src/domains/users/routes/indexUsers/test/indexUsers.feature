Feature: Show all users
  In order to manage the participants
  As a consultant
  I can show all users in the system

  Background:
    Given there is a user with name "Walter White" and e-mail "ww@example.com"
    And the user "Walter White" is a consultant
    And there is a user with name "Gus Fring" and e-mail "gf@example.com"
    And there is a user with name "Armin Xalamancar" and e-mail "ax@example.com"
    And there is a working group "Group A" with description "..." created by "Walter White"
    And there is a working group "Group B" with description "..." created by "Walter White"
    And the user "Gus Fring" is in the working group "Group B"
    And the user "Gus Fring" is in the working group "Group A"
    And the user "Walter White" is in the working group "Group B"

  Scenario: As a consultant, I can show the list of users
    Given I am a user with name "Jesse Pinkman", e-mail "test@example.com" and password "12345678"
    And the user "Jesse Pinkman" is a consultant
    And I am logged in
    When I request the list of all users
    Then the request is successful
    And the response contains the following users in order:
      | Name             | E-Mail           | Consultant | Manager | Working groups   |
      | Gus Fring        | gf@example.com   | No         | No      | Group A, Group B |
      | Jesse Pinkman    | test@example.com | Yes        | No      |                  |
      | Walter White     | ww@example.com   | Yes        | No      | Group B          |
      | Armin Xalamancar | ax@example.com   | No         | No      |                  |

  Scenario: As a participant, I cannot show the list of users
    Given I am a user with name "Jesse Pinkman", e-mail "test@example.com" and password "12345678"
    And I am logged in
    When I request the list of all users
    Then the request is unauthorized
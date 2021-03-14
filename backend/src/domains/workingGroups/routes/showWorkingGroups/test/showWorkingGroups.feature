Feature: Show Working Groups
  In order to view the calendar
  As a consultant
  I need to be able to load the working groups that I have written

  Scenario: As a consultant, I can show the list of working groups
    Given I am a user with name "Jesse Pinkman", e-mail "test@example.com" and password "12345678"
    And the user "Jesse Pinkman" is a consultant
    And I am logged in
    And there is a working group "Best Group" with description "Jesse" created by "Jesse Pinkman"
    When I request for my working groups
    Then the request is successful
    And the response contains the working groups in the following order:
      | name       |
      | Best Group |

  Scenario: If I am not a consultant I cannot load any working groups
    Given I am a user with name "Jesse Pinkman", e-mail "test@example.com" and password "12345678"
    And I am logged in
    When I request for my working groups
    Then the request is unauthorized

  Scenario: I cannot load other people's working groups
    Given there is a user with name "Walter White" and e-mail "ww@example.com"
    And the user "Walter White" is a consultant
    And there is a working group "Best Group" with description "Jesse" created by "Walter White"
    And I am a user with name "Jesse Pinkman", e-mail "test@example.com" and password "12345678"
    And the user "Jesse Pinkman" is a consultant
    And there is a working group "Best Group2" with description "Jesse" created by "Jesse Pinkman"
    And I am logged in
    When I request for my working groups
    Then the response contains the working groups in the following order:
      | name        |
      | Best Group2 |
    And the response does not contain the following working groups:
      | name       |
      | Best Group |



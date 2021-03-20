Feature: Show Trainings
  In order to view the calendar
  As a consultant
  I need to be able to show the trainings that I have created

  Scenario: If I am not a consultant I cannot load any trainings
    Given I am a user with name "Jesse Pinkman", e-mail "test@example.com" and password "12345678"
    And I am logged in
    When I request for my trainings
    Then the request is unauthorized

  Scenario: If I am a consultant I can load my trainings
    Given I am a user with name "Jesse Pinkman", e-mail "test@example.com" and password "12345678"
    And the user "Jesse Pinkman" is a consultant
    And I am logged in
    And there is a teaching base called "Computer Science 101"
    And the teaching base "Computer Science 101" has a topic "Turing Machines"
    And the teaching base "Computer Science 101" has a document named "Turing Machines textbook"
    And the topic "Turing Machines" has a training "Turing Machines by Jesse Pinkman" created by "Jesse Pinkman" based on the document "Turing Machines textbook"
    And the topic "Turing Machines" has a training "Finally: Turing Machines by Jesse Pinkman 2" created by "Jesse Pinkman" based on the document "Turing Machines textbook"
    When I request for my trainings
    Then the request is successful
    And the response contains the trainings in the following order:
      | Name                                        |
      | Finally: Turing Machines by Jesse Pinkman 2 |
      | Turing Machines by Jesse Pinkman            |

  Scenario: I cannot see trainings of other consultants
    Given I am a user with name "Jesse Pinkman", e-mail "test@example.com" and password "12345678"
    And the user "Jesse Pinkman" is a consultant
    And I am logged in
    And there is a user with name "Walter White" and e-mail "ww@example.com"
    And the user "Walter White" is a consultant
    And there is a teaching base called "Computer Science 101"
    And the teaching base "Computer Science 101" has a topic "Turing Machines"
    And the teaching base "Computer Science 101" has a document named "Turing Machines textbook"
    And the topic "Turing Machines" has a training "Turing Machines by Walter White" created by "Walter White" based on the document "Turing Machines textbook"
    When I request for my trainings
    Then the request is successful
    And the response contains the trainings in the following order:
      | Name |
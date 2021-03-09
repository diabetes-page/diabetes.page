Feature: Create appointment
  In order to meet with the patients
  As a consultant
  I can create a new appointment

  Background:
    Given I am a user with name "Jesse Pinkman", e-mail "jp@example.com" and password "12345678"
    And there is a user with name "Walter White" and e-mail "ww@example.com"
    And the user "Walter White" is a consultant
    And there is a teaching base called "Computer Science 101"
    And the teaching base "Computer Science 101" has a topic "Turing Machines"
    And the teaching base "Computer Science 101" has a document named "Turing Machines textbook"
    And the topic "Turing Machines" has a training "Turing Machines by Walter White" created by "Walter White" based on the document "Turing Machines textbook"
    And the training "Turing Machines by Walter White" has exactly 0 appointments

  Scenario: Consultants can create appointments
    Given the user "Jesse Pinkman" is a consultant
    And there is a user with name "xyz" and e-mail "xx@example.com"
    And I am logged in
    When I create a new appointment for the training "Turing Machines by Walter White" with start time "2020-11-10T09:00" and end time "2020-11-10T15:00"
    Then the request is successful without response
    And the response is empty
    And the training "Turing Machines by Walter White" has exactly 1 appointment

  Scenario: Participants cannot create appointments
    Given I am logged in
    When I create a new appointment for the training "Turing Machines by Walter White" with start time "2020-11-10T09:00" and end time "2020-11-10T15:00"
    Then the request is unauthorized
    And the training "Turing Machines by Walter White" has exactly 0 appointments

  Scenario: Login is required
    When I create a new appointment for the training "Turing Machines by Walter White" with start time "2020-11-10T09:00" and end time "2020-11-10T15:00"
    Then the request is unauthenticated
    And the training "Turing Machines by Walter White" has exactly 0 appointments
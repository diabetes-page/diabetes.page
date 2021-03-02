Feature: Get data about an appointment's training
  In order to display slides and other training data
  As an appointment participant or consultant
  I can get data about an appointment's training

  Background:
    Given there is a user with name "Walter White" and e-mail "ww@example.com"
    And the user "Walter White" is a consultant
    And there is a teaching base called "Computer Science 101"
    And the teaching base "Computer Science 101" has a topic "Turing Machines"
    And the teaching base "Computer Science 101" has a document named "Turing Machines textbook"
    And the topic "Turing Machines" has a training "Turing Machines by Walter White" created by "Walter White" based on the document "Turing Machines textbook"
    And the training "Turing Machines by Walter White" uses the following slides: "1,1,2,3,5,8,13,21,1,1"
    And the training "Turing Machines by Walter White" has an appointment with the following configuration:
      | Presenter  | Walter White           |
      | Start time | 2020-11-10T09:00+01:00 |
      | End time   | 2020-11-10T15:30+01:00 |
    And there is a working group "Easy group" with description "This is an easy group" created by "Walter White"

  Scenario: As a participant, I can get the training data
    Given I am a user with name "Jesse Pinkman", e-mail "test@example.com" and password "12345678"
    And the user "Jesse Pinkman" is in the working group "Easy group"
    And the appointment for the training "Turing Machines by Walter White" presented by "Walter White" is assigned to the working group "Easy group"
    And I am logged in
    And I am interested in the appointment for the training "Turing Machines by Walter White" presented by "Walter White"
    When I request the appointment's training in the context of in the working group "Easy group"
    Then the request is successful
    And the response contains a training with name "Turing Machines by Walter White" and slides "1,1,2,3,5,8,13,21,1,1"

  Scenario: As a participant, I cannot get the training data if I am not assigned to the correct working group
    Given I am a user with name "Jesse Pinkman", e-mail "test@example.com" and password "12345678"
    And the appointment for the training "Turing Machines by Walter White" presented by "Walter White" is assigned to the working group "Easy group"
    And I am logged in
    And I am interested in the appointment for the training "Turing Machines by Walter White" presented by "Walter White"
    When I request the appointment's training in the context of in the working group "Easy group"
    Then the request is unauthorized

  Scenario: As a participant, I cannot get the training data if the appointment does not belong to my working group
    Given I am a user with name "Jesse Pinkman", e-mail "test@example.com" and password "12345678"
    And the user "Jesse Pinkman" is in the working group "Easy group"
    And I am logged in
    And I am interested in the appointment for the training "Turing Machines by Walter White" presented by "Walter White"
    When I request the appointment's training in the context of in the working group "Easy group"
    Then the request is unauthorized

  Scenario: As a consultant, I can get the training data in the context of any associated working group
    Given I am a user with name "Jesse Pinkman", e-mail "test@example.com" and password "12345678"
    And the user "Jesse Pinkman" is a consultant
    And the appointment for the training "Turing Machines by Walter White" presented by "Walter White" is assigned to the working group "Easy group"
    And I am logged in
    And I am interested in the appointment for the training "Turing Machines by Walter White" presented by "Walter White"
    When I request the appointment's training in the context of in the working group "Easy group"
    Then the request is successful
    And the response contains a training with name "Turing Machines by Walter White" and slides "1,1,2,3,5,8,13,21,1,1"

  Scenario: As a consultant, I cannot get the training data if it is not associated to the working group
    Given I am a user with name "Jesse Pinkman", e-mail "test@example.com" and password "12345678"
    And the user "Jesse Pinkman" is a consultant
    And I am logged in
    And I am interested in the appointment for the training "Turing Machines by Walter White" presented by "Walter White"
    When I request the appointment's training in the context of in the working group "Easy group"
    Then the request is unauthorized
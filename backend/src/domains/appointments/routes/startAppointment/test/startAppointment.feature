Feature: Start appointment
  In order to conduct the conference
  As an appointment presenter
  I can start the appointment

  Background:
    Given there is a user with name "Walter White" and e-mail "ww@example.com"
    And the user "Walter White" is a consultant
    And there is a teaching base called "Computer Science 101"
    And the teaching base "Computer Science 101" has a topic "Turing Machines"
    And the teaching base "Computer Science 101" has a document named "Turing Machines textbook"
    And the topic "Turing Machines" has a training "Turing Machines by Walter White" created by "Walter White" based on the document "Turing Machines textbook"
    And the training "Turing Machines by Walter White" has an appointment with the following configuration:
      | Presenter  | Walter White           |
      | Start time | 2020-11-10T09:00+01:00 |
      | End time   | 2020-11-10T15:30+01:00 |
    And there is a working group "Easy group" with description "This is an easy group" created by "Walter White"

  Scenario: As a consultant, I can start an appointment if I am the presenter
    Given I am a user with name "Jesse Pinkman", e-mail "test@example.com" and password "12345678"
    And the user "Jesse Pinkman" is a consultant
    Given the training "Turing Machines by Walter White" has an appointment with the following configuration:
      | Presenter  | Jesse Pinkman          |
      | Start time | 2020-11-10T09:00+01:00 |
      | End time   | 2020-11-10T15:30+01:00 |
    And I am logged in
    When I request to start the appointment for the training "Turing Machines by Walter White" presented by "Jesse Pinkman"
    Then the request is successful without response
    And the response is empty

  Scenario: As a consultant, I cannot start an appointment if I am not the presenter
    Given I am a user with name "Jesse Pinkman", e-mail "test@example.com" and password "12345678"
    And the user "Jesse Pinkman" is a consultant
    And I am logged in
    When I request to start the appointment for the training "Turing Machines by Walter White" presented by "Walter White"
    Then the request is unauthorized

  Scenario: As a participant, I cannot start an appointment
    Given I am a user with name "Jesse Pinkman", e-mail "test@example.com" and password "12345678"
    And the user "Jesse Pinkman" is in the working group "Easy group"
    And the appointment for the training "Turing Machines by Walter White" presented by "Walter White" is assigned to the working group "Easy group"
    And I am logged in
    When I request to start the appointment for the training "Turing Machines by Walter White" presented by "Walter White"
    Then the request is unauthorized
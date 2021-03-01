Feature: Show appointment
  In order to learn about my appointments
  As an appointment participant or consultant
  I can look at information about each my appointments

  Background:
    Given there is a user with name "Walter White" and E-Mail "ww@example.com"
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

  Scenario: I can get display an appointment when I am assigned to it
    Given I am a user with name "Jesse Pinkman", E-Mail "test@example.com" and password "12345678"
    And I am logged in
    And the user "Jesse Pinkman" is in the working group "Easy group"
    And the appointment for the training "Turing Machines by Walter White" presented by "Walter White" is assigned to the working group "Easy group"
    When I request the appointment for the training "Turing Machines by Walter White" presented by "Walter White" in the working group "Easy group"
    Then the request is successful
    And the response contains an appointment with the following attributes:
      | Training      | Turing Machines by Walter White |
      | Presenter     | Walter White                    |
      | Start time    | 2020-11-10T08:00:00.000Z        |
      | End time      | 2020-11-10T14:30:00.000Z        |
      | Working group | Easy group                      |
#
#  Scenario: I cannot get a list of other people's appointments
#    Given there is a user with name "Some guy" and E-Mail "a@b.com"
#    And the user "Some guy" is in the working group "Best group"
#    And the appointment presented by "Walter White" is assigned to the working group "Best group"
#    And I am a user with name "Jesse Pinkman", E-Mail "test@example.com" and password "12345678"
#    And I am logged in
#    When I request the appointments of the user "Some guy"
#    Then the request is unauthorized
#
#  Scenario: As a consultant, I can get a list of other people's appointments
#    Given there is a user with name "Some guy" and E-Mail "a@b.com"
#    And the user "Some guy" is in the working group "Best group"
#    And the appointment presented by "Walter White" is assigned to the working group "Best group"
#    And I am a user with name "Jesse Pinkman", E-Mail "test@example.com" and password "12345678"
#    And the user "Jesse Pinkman" is a consultant
#    And I am logged in
#    When I request the appointments of the user "Some guy"
#    Then the request is successful
#    And the response contains an array of appointments
#    And the amount of appointments is 1
#    And the appointment at index 0 has presenter "Walter White"
#    And the appointment at index 0 has training "Turing Machines by Walter White"
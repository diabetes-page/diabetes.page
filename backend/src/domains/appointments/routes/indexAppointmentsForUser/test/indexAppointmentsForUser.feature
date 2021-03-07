Feature: Get appointments for user
  In order to get an overview over my appointments
  As a user
  I can get a list of my appointments

  Background:
    Given there is a user with name "Walter White" and e-mail "ww@example.com"
    And the user "Walter White" is a consultant
    And there is a teaching base called "Computer Science 101"
    And the teaching base "Computer Science 101" has a topic "Turing Machines"
    And the teaching base "Computer Science 101" has a document named "Turing Machines textbook"
    And the topic "Turing Machines" has a training "Turing Machines by Walter White" created by "Walter White" based on the document "Turing Machines textbook"
    And the training "Turing Machines by Walter White" has an appointment with presenter "Walter White"
    And there is a working group "Best group" with description "..." created by "Walter White"

  Scenario: I can get a list my own appointments
    Given I am a user with name "Jesse Pinkman", e-mail "test@example.com" and password "12345678"
    And I am logged in
    And the user "Jesse Pinkman" is in the working group "Best group"
    And the appointment for the training "Turing Machines by Walter White" presented by "Walter White" is assigned to the working group "Best group"
    When I request the appointments of the user "Jesse Pinkman"
    Then the request is successful
    And the response contains an array of appointments
    And the amount of appointments is 1
    And the appointment at index 0 has presenter "Walter White"
    And the appointment at index 0 has training "Turing Machines by Walter White"
    And the appointment at index 0 is assigned through the working group "Best group"

  Scenario: I cannot get a list of other people's appointments
    Given there is a user with name "Some guy" and e-mail "a@b.com"
    And the user "Some guy" is in the working group "Best group"
    And the appointment for the training "Turing Machines by Walter White" presented by "Walter White" is assigned to the working group "Best group"
    And I am a user with name "Jesse Pinkman", e-mail "test@example.com" and password "12345678"
    And I am logged in
    When I request the appointments of the user "Some guy"
    Then the request is unauthorized

  Scenario: As a consultant, I can get a list of other people's appointments
    Given there is a user with name "Some guy" and e-mail "a@b.com"
    And the user "Some guy" is in the working group "Best group"
    And the appointment for the training "Turing Machines by Walter White" presented by "Walter White" is assigned to the working group "Best group"
    And I am a user with name "Jesse Pinkman", e-mail "test@example.com" and password "12345678"
    And the user "Jesse Pinkman" is a consultant
    And I am logged in
    When I request the appointments of the user "Some guy"
    Then the request is successful
    And the response contains an array of appointments
    And the amount of appointments is 1
    And the appointment at index 0 has presenter "Walter White"
    And the appointment at index 0 has training "Turing Machines by Walter White"
    And the appointment at index 0 is assigned through the working group "Best group"
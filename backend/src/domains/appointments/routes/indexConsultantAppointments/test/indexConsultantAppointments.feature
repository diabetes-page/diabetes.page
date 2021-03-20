Feature: Get appointments for consultant
  In order to see look at the calendar view of all my appointments
  As a consultant
  I can get a list of my appointments

  Background:
    Given there is a user with name "Walter White" and e-mail "ww@example.com"
    And the user "Walter White" is a consultant
    And there is a teaching base called "Computer Science 101"
    And the teaching base "Computer Science 101" has a topic "Turing Machines"
    And the teaching base "Computer Science 101" has a document named "Turing Machines textbook"
    And the topic "Turing Machines" has a training "Turing Machines by Walter White" created by "Walter White" based on the document "Turing Machines textbook"
    And there is a working group "Best group" with description "..." created by "Walter White"

  Scenario: As a consultant, I can get a list of my own appointments
    Given I am a user with name "Jesse Pinkman", e-mail "test@example.com" and password "12345678"
    And I am logged in
    And the user "Jesse Pinkman" is a consultant
    And the training "Turing Machines by Walter White" has an appointment with presenter "Jesse Pinkman"
    And the appointment for the training "Turing Machines by Walter White" presented by "Jesse Pinkman" is assigned to the working group "Best group"
    When I request the appointments of the consultant "Jesse Pinkman"
    Then the request is successful
    And the response contains the following appointments in order:
      | Presenter     | Training                        | Working groups |
      | Jesse Pinkman | Turing Machines by Walter White | Best group     |

  Scenario: As a consultant, I can get a list of my own appointments if it's empty
    Given I am a user with name "Jesse Pinkman", e-mail "test@example.com" and password "12345678"
    And I am logged in
    And the user "Jesse Pinkman" is a consultant
    When I request the appointments of the consultant "Jesse Pinkman"
    Then the request is successful
    And the response contains the following appointments in order:
      | Presenter | Training | Working groups |

  Scenario: As a consultant, I can get a list of another consultant's appointments
    Given I am a user with name "Jesse Pinkman", e-mail "test@example.com" and password "12345678"
    And I am logged in
    And the user "Jesse Pinkman" is a consultant
    And the training "Turing Machines by Walter White" has an appointment with presenter "Walter White"
    And the appointment for the training "Turing Machines by Walter White" presented by "Walter White" is assigned to the working group "Best group"
    When I request the appointments of the consultant "Walter White"
    Then the request is successful
    And the response contains the following appointments in order:
      | Presenter     | Training                        | Working groups |
      | Walter White | Turing Machines by Walter White | Best group     |

  Scenario: As a participant, I cannot get a list of a consultant's appointments
    Given I am a user with name "Jesse Pinkman", e-mail "test@example.com" and password "12345678"
    And I am logged in
    And the training "Turing Machines by Walter White" has an appointment with presenter "Walter White"
    And the appointment for the training "Turing Machines by Walter White" presented by "Walter White" is assigned to the working group "Best group"
    When I request the appointments of the consultant "Walter White"
    Then the request is unauthorized
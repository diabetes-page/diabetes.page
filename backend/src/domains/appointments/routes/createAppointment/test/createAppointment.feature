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
    And there is a working group "A group" with description "Some group..." created by "Walter White"

  Scenario: Consultants can create appointments
    Given the user "Jesse Pinkman" is a consultant
    And I am logged in
    When I create a new appointment with the following data:
      | Start         | 2020-11-10T09:00                |
      | End           | 2020-11-10T15:00                |
      | Training      | Turing Machines by Walter White |
      | Working group | A group                         |
    Then the request is successful without response
    And the response is empty
    And the training "Turing Machines by Walter White" has exactly 1 appointment

  Scenario: Participants cannot create appointments
    Given I am logged in
    When I create a new appointment with the following data:
      | Start         | 2020-11-10T09:00                |
      | End           | 2020-11-10T15:00                |
      | Training      | Turing Machines by Walter White |
      | Working group | A group                         |
    Then the request is unauthorized
    And the training "Turing Machines by Walter White" has exactly 0 appointments

  Scenario: Login is required
    When I create a new appointment with the following data:
      | Start         | 2020-11-10T09:00                |
      | End           | 2020-11-10T15:00                |
      | Training      | Turing Machines by Walter White |
      | Working group | A group                         |
    Then the request is unauthenticated
    And the training "Turing Machines by Walter White" has exactly 0 appointments

  Scenario: Consultants can create appointments without training
    Given the user "Jesse Pinkman" is a consultant
    And I am logged in
    When I create a new appointment with the following data:
      | Start         | 2020-11-10T09:00 |
      | End           | 2020-11-10T15:00 |
      | Training      |                  |
      | Working group | A group          |
    Then the request is successful without response
    And the response is empty
    And the training "Turing Machines by Walter White" has exactly 0 appointments

  Scenario: End date must be after start date
    Given the user "Jesse Pinkman" is a consultant
    And I am logged in
    When I create a new appointment with the following data:
      | Start         | 2020-11-10T09:00 |
      | End           | 2020-11-10T08:00 |
      | Working group | A group          |
    Then the request is rejected
    And the reason for the rejection is that the start date must be before the end date
    And the training "Turing Machines by Walter White" has exactly 0 appointments

  Scenario: Working group must be supplied
    Given the user "Jesse Pinkman" is a consultant
    And I am logged in
    When I create a new appointment with the following data:
      | Start         | 2020-11-10T09:00                |
      | End           | 2020-11-10T15:00                |
      | Training      | Turing Machines by Walter White |
      | Working group |                                 |
    Then the request is rejected
    And the reason for the rejection is that the working group was not supplied
    And the training "Turing Machines by Walter White" has exactly 0 appointment
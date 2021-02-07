Feature: GetAppointmentsForUser
#  In order to gain access to the application
#  As a user
#  I can login to my account

  Scenario: Get Appointments for the logged in user
    Given I am a user with name "Jesse Pinkman", E-Mail "test@example.com" and password "12345678"
    And I am logged in
    And there is a user with name "Walter White" and E-Mail "ww@example.com"
    And the user "Walter White" is a consultant
    And there is a learning base called "Computer Science 101"
    And the learning base "Computer Science 101" has a topic "Turing Machines"
    And the topic "Turing Machines" has a training "Turing Machines by Walter White" created by "Walter White"
    And the training "Turing Machines by Walter White" has an appointment with id 12345 and presenter "Walter White"
    And the appointment with id 12345 is assigned to "Jesse Pinkman" (me)
    When I request my appointments
    Then the request is successful
    And the response contains an array of appoinments
    And the amount of appointments is 1

Feature: GetAppointmentsForUser
#  In order to gain access to the application
#  As a user
#  I can login to my account

  Scenario: Get Appointments for the logged in user
    Given I am a user with E-Mail "test@example.com" and password "12345678"
    Given I am logged in
    Given There is exactly 1 appointment assigned to me
    When I request for my appointments
    Then the request is successful
    And the response contains an array of appoinments
    And the amount of appointments is 1

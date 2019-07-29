Feature: PA Request Form
  As a user
  I want to be able to login with my details to the PA Request page
  So that I fill the required form and submit a Request

  Scenario: User can click on PA Request link from the Login Page
    Given No current login user
    When I access the "Login Page"
    Then I should see "PA Request Button"
    When I clicked on it
    Then I should see "PA Request Page"

  Scenario: User enters wrong email and password
    Given No current login user
    When I open "PA Request Link"
    And I fill in "email" with "dummyuser1234@test.com"
    And I fill in "password" with "test"
    And I select "Public Trade Request" for "Type of Request"
    And I click on "PA Submit Button"
    And I should see text like "Unfortunately we are unable to verify your name or password"


  Scenario: User enters correct email and password
    Given No current login user
    When I open "PA Request Link"
    And I fill in "email" with "mzndako@gmail.com"
    And I fill in "password" with "Ndako1"
    And I select "Public Trade Request" for "Type of Request"
    And I click on "PA Submit Button"
    Then I should see "Public Trade Request Form"

  
  Scenario: User login to Public Trade Request and submit without completing the form
    Given I am logged into "Public Trade Request" with email as "mzndako@gmail.com" and password as "Ndako1"
    When I click on "Send Request"
    Then I should see an error message "Please fill in security."
    When I type in "b" for "Name of Security" and I select the "first" option
    When I reset the form
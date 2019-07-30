Feature: Testing "Public Trade Request" form
  As a user
  I want to be able to login with my details to the PA Request page
  So that I fill the required form and submit a Request

  Scenario: User can click on PA Request link from the Login Page
    Given No current login user
    When I visit "/login"
    Then I should see "PA Request Button"
    When I clicked on it
    Then I should see form like "PA Request"

  Scenario: User enters wrong email and password
    Given No current login user
    When I visit "/noauth#/pa-requests"
    And I fill in "email" with "dummyuser1234@test.com"
    And I fill in "password" with "test"
    And I select "Public Trade Request" for "Type of Request"
    And I click on "Submit" button
    Then I should see text like "Unfortunately we are unable to verify your name or password"


  Scenario: User enters correct email and password
    Given No current login user
    When I visit "/noauth#/pa-requests"
    And I fill in "email" with "mzndako@gmail.com"
    And I fill in "password" with "Ndako1"
    And I select "Public Trade Request" for "Type of Request"
    And I click on "PA Submit Button"
    Then I should see "Public Trade Request Form"


  Scenario: User login to "Public Trade Request" and submit without completing the form
    Given No current login user
    When I visit '/noauth#/pa-requests'
    And I am login with "mzndako@gmail.com" as email "Ndako1" as password "Public Trade Request" as Type of Request
    When I click on "Send Request" button
    Then I should see an error message "Please fill in security"
    When I type in "b" for "Name of Security" and I select option 1
    And I click on "Send Request" button
    Then I should see an error message "You have not selected an account number"
    When I fill in "Quantity" with "35"
    And I select "COMPANY DEBENTURES" for "Investment Class"
    And I select "012345845" for "Please select the account you wish to trade through"
    And I click on "Send Request" button
    Then I should see "Request Submitted Successfully"


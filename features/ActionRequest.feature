Feature: Testing "Action Request" form
  As a user
  I want to be able to login with my details to the PA Request page
  So that I fill the required form and submit a Request

  Scenario: "Action Request" => User enters wrong email and password
    Given No current login user
    When I visit "/noauth#/pa-requests"
    And I fill in "email" with "dummyuser1234@test.com"
    And I fill in "password" with "test"
    And I select "Account Request" for "Type of Request"
    And I click on "Submit" button
    And I should see text like "Unfortunately we are unable to verify your name or password"


  Scenario: "Action Request" => User enters correct email and password
    Given No current login user
    When I visit "/noauth#/pa-requests"
    And I fill in "email" with "mzndako@gmail.com"
    And I fill in "password" with "Ndako1"
    And I select "Account Request" for "Type of Request"
    And I click on "Submit" button
    Then I should see form like "Account Request"


  Scenario: "Action Request" => User login to "Account Request" and submit without completing the form
    Given No current login user
    When I visit '/noauth#/pa-requests'
    And I am login with "mzndako@gmail.com" as email "Ndako1" as password "Account Request" as Type of Request
    When I click on "I confirm" button
    Then I should see an error message "Please fill the form"

  Scenario: "Action Request" => User login to "Account Request" and completes the form before submitting
    Given No current login user
    When I visit '/noauth#/pa-requests'
    And I am login with "mzndako@gmail.com" as email "Ndako1" as password "Account Request" as Type of Request
    And I fill in "Account Number" with "565255466"
    And I fill in "Name of Broker / Manager" with "James Jonathan"
    And I click on "I confirm" button
    Then I should see text like "Your Request has been sent!"


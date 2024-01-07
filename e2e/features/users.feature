Feature: Testing Users API

  Scenario: Verify GET request to list users
    Given I have the API base URL
    When I send a GET request to list users
    Then I should get a successful response
    And the response should contain the expected data

  Scenario: Verify GET request to a single user
    Given I have the API base URL
    When I send a GET request to a single user
    Then Single-User I should get a successful response
    And the response should contain the expected image and data

  Scenario: Verify GET request to a single user found
    Given I have the API base URL
    When I send a GET request to a single user with id
    Then I should get a user found response
    And the response should have user details

  Scenario: Verify POST request to create a user
    Given I have the API base URL
    When I send a POST request to create a user
    Then I should get a successful response for the POST request
    And the response should contain the created user details

  Scenario: Verify PUT request to update a user
    Given I have the API base URL
    When I send a PUT request to update a user
    Then I should get a successful response for the PUT request
    And the response should contain the updated user details

   Scenario: Verify DELETE request to delete a user
    Given I have the API base URL
    When I send a DELETE request to delete a user
    Then I should get a successful response for the DELETE request

  Scenario: Verify PATCH request to update a user
    Given I have the API base URL
    When I send a PATCH request to update a user
    Then I should get a successful response for the PATCH request
    And the response should contain the patched user details

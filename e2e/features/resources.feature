Feature: Testing Resources API

  Scenario: Verify GET request for resources
    Given I have the API base URL for resources
    When I send a GET request for resources
    Then I should get a successful response for the resources GET request
    And the response should contain the expected resource data

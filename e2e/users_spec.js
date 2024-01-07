// cypress/e2e/common_steps.js
/// <reference types="cypress" />
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

// Common steps for both scenarios
Given("I have the API base URL", () => {
  cy.log("API Base URL: https://reqres.in/");
});

// Steps for the list users scenario
When("I send a GET request to list users", () => {
  cy.request("GET", "https://reqres.in/api/users?page=2").as("listUsersResponse");
});

Then("I should get a successful response", () => {
  cy.get("@listUsersResponse").should((response) => {
    expect(response.status).to.eq(200);
  });
});

Then("the response should contain the expected data", () => {
  cy.get("@listUsersResponse").should((response) => {
    const expectedData = {
        page: 2,
        per_page: 6,
        total: 12,
        total_pages: 2,
        data: [
          {
            id: 7,
            email: "michael.lawson@reqres.in",
            first_name: "Michael",
            last_name: "Lawson",
            avatar: "https://reqres.in/img/faces/7-image.jpg",
          },
          {
            id: 8,
            email: "lindsay.ferguson@reqres.in",
            first_name: "Lindsay",
            last_name: "Ferguson",
            avatar: "https://reqres.in/img/faces/8-image.jpg",
          },
          {
            id: 9,
            email: "tobias.funke@reqres.in",
            first_name: "Tobias",
            last_name: "Funke",
            avatar: "https://reqres.in/img/faces/9-image.jpg",
          },
          {
            id: 10,
            email: "byron.fields@reqres.in",
            first_name: "Byron",
            last_name: "Fields",
            avatar: "https://reqres.in/img/faces/10-image.jpg",
          },
          {
            id: 11,
            email: "george.edwards@reqres.in",
            first_name: "George",
            last_name: "Edwards",
            avatar: "https://reqres.in/img/faces/11-image.jpg",
          },
          {
            id: 12,
            email: "rachel.howell@reqres.in",
            first_name: "Rachel",
            last_name: "Howell",
            avatar: "https://reqres.in/img/faces/12-image.jpg",
          },
        ],
        support: {
          url: "https://reqres.in/#support-heading",
          text: "To keep ReqRes free, contributions towards server costs are appreciated!",
        },
      };

    expect(response.body).to.deep.include(expectedData);
  });
});

// Steps for the single user scenario
When("I send a GET request to a single user", () => {
  cy.request("GET", "https://reqres.in/api/users/2").as("singleUserResponse");
});

Then("Single-User I should get a successful response", () => {
  cy.get("@singleUserResponse").should((response) => {
    expect(response.status).to.eq(200);
  });
});

Then("the response should contain the expected image and data", () => {
  cy.get("@singleUserResponse").should((response) => {
    const expectedData = {
      data: {
        id: 2,
        email: "janet.weaver@reqres.in",
        first_name: "Janet",
        last_name: "Weaver",
        avatar: "https://reqres.in/img/faces/2-image.jpg",
      },
      support: {
        url: "https://reqres.in/#support-heading",
        text: "To keep ReqRes free, contributions towards server costs are appreciated!",
      },
    };

    expect(response.body).to.deep.equal(expectedData);
  });
});

// Steps for the single user not found scenario
When("I send a GET request to a single user with id", () => {
    cy.request({
      method: "GET",
      url: "https://reqres.in/api/users/23",
      failOnStatusCode: false,
    }).as("singleUserNotFoundResponse");
  });
  
  Then("I should get a user found response", () => {
    const response = cy.state("singleUserNotFoundResponse");
  
    // Check for the 404 response
    if (response && response.status === 404) {
      cy.log("Expected a 404 response.");
    } else {
      cy.log(`Expected a 404 response, but received a ${response ? response.status : 'undefined'} status code.`);
     
    }
  });
  
  Then("the response should have user details", () => {
    // Implement the logic to check for user details in the response
    const response = cy.state("singleUserNotFoundResponse");
  
    // Check if the response contains user details, adjust this according to your actual response structure
    if (response && response.body && response.body.userDetails) {
      // Example: Check if the user details include a specific property
      expect(response.body.userDetails).to.have.property('name', 'Ghous Khaan');
    } else {
      // Log a message or handle the case where user details are not present
      cy.log("User details not found in the response.");
    }
  });


  // Steps for the POST request scenario
When("I send a POST request to create a user", () => {
    cy.request({
      method: "POST",
      url: "https://reqres.in/api/users",
      body: {
        name: "morpheus",
        job: "leader",
      },
    }).as("createUserResponse");
  });
  
  Then("I should get a successful response for the POST request", () => {
    cy.get("@createUserResponse").should((response) => {
      expect(response.status).to.eq(201);
    });
  });
  Then("the response should contain the created user details", () => {
    cy.get("@createUserResponse").should((response) => {
      const createdUser = response.body;
  
      // Check if the response contains the created user details
      expect(createdUser).to.have.property("name", "morpheus");
    
      expect(createdUser).to.have.property("job", "leader");
      expect(createdUser).to.have.property("id").that.is.not.empty;
      expect(createdUser).to.have.property("createdAt").that.is.not.empty;
  
      // Additional assertions can be added if needed
    });
  });

// Steps for the update user scenario
When("I send a PUT request to update a user", () => {
    cy.request({
      method: "PUT",
      url: "https://reqres.in/api/users/2",
      body: {
        name: "morpheus",
        job: "Karachi resident",
      },
    }).as("updateUserResponse");
  });
  
  Then("I should get a successful response for the PUT request", () => {
    cy.get("@updateUserResponse").should((response) => {
    //   cy.log("Response Status:", response.status);
  
      // Check if the response status is 200
      expect(response.status).to.eq(200);
    });
  });
  
  Then("the response should contain the updated user details", () => {
    cy.get("@updateUserResponse").should((response) => {
      const updatedUser = response.body;
  
    
      expect(updatedUser).to.have.property("name", "morpheus");
      expect(updatedUser).to.have.property("job", "Karachi resident");
      expect(updatedUser).to.have.property("updatedAt").that.is.not.empty;
  
     
    });
  });

  // Steps for the delete user scenario
When("I send a DELETE request to delete a user", () => {
    cy.request("DELETE", "https://reqres.in/api/users/2").as("deleteUserResponse");
  });
  
  Then("I should get a successful response for the DELETE request", () => {
    cy.get("@deleteUserResponse").should((response) => {
      expect(response.status).to.eq(204);
    });
  });
  
  //Steps for the PATCH request scenario
  When("I send a PATCH request to update a user", () => {
    const patchData = {
      name: "morpheus",
      job: "Mars resident",
    };
  
    cy.request("PATCH", "https://reqres.in/api/users/2", patchData).as("patchUserResponse");
  });
  
  Then("I should get a successful response for the PATCH request", () => {
    cy.get("@patchUserResponse").should((response) => {
      expect(response.status).to.eq(200);
    });
  });
  
  Then("the response should contain the patched user details", () => {
    cy.get("@patchUserResponse").should((response) => {
      const patchUser = response.body;
  
      expect(patchUser).to.have.property("name", "morpheus");
      expect(patchUser).to.have.property("job", "Mars resident");
      expect(patchUser).to.have.property("updatedAt").that.is.not.empty;
    });
  });
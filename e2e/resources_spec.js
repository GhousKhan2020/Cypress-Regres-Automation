/// <reference types="cypress" />

import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given("I have the API base URL for resources", () => {
  cy.log("API Base URL: https://reqres.in/");
});

When("I send a GET request for resources", () => {
  cy.request("GET", "https://reqres.in/api/unknown").as("resourcesResponse");
});

Then("I should get a successful response for the resources GET request", () => {
  cy.get("@resourcesResponse").should((response) => {
    expect(response.status).to.eq(200);
  });
});

Then("the response should contain the expected resource data", () => {
  cy.get("@resourcesResponse").should((response) => {
    const expectedData = {
      page: 1,
      per_page: 6,
      total: 12,
      total_pages: 2,
      data: [
        {
          id: 1,
          name: "cerulean",
          year: 2000,
          color: "#98B2D1",
          pantone_value: "15-4020",
        },
        {
            id: 2,
            name: "fuchsia rose",
            year: 2001,
            color: "#C74375",
            pantone_value: "17-2031",
        },
        {
            id: 3,
            name: "true red",
            year: 2002,
            color: "#BF1932",
            pantone_value: "19-1664",
        },
        {
            id: 4,
            name: "aqua sky",
            year: 2003,
            color: "#7BC4C4",
            pantone_value: "14-4811",
        },
        {
            id: 5,
            name: "tigerlily",
            year: 2004,
            color: "#E2583E",
            pantone_value: "17-1456",
        },
        {
            id: 6,
            name: "blue turquoise",
            year: 2005,
            color: "#53B0AE",
            pantone_value: "15-5217",
        },
      ],
      support: {
        url: "https://reqres.in/#support-heading",
        text: "To keep ReqRes free, contributions towards server costs are appreciated!",
      },
    };

    expect(response.body).to.deep.equal(expectedData);
  });
});

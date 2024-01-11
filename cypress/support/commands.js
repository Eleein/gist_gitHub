Cypress.Commands.add("loginToGithub", () => {
  cy.visit("https://github.com/login");
  cy.get("#login_field").type(Cypress.env("githubUsername"), {
    log: false,
  });
  cy.get("#password").type(Cypress.env("githubPassword"), {
    log: false,
  });
  cy.get('input[type="submit"]').click();

  cy.getCookie("logged_in").should("have.property", "value", "yes");
});

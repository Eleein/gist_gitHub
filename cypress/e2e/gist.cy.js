describe("Gist Github", () => {
  beforeEach(() => {
    cy.loginToGithub();
    cy.visit("/");
  });

  it("should create a secret gist by typing in editor, and should then delete the gist", () => {
    const description = "Cypress test";
    const text = "This is an automatic test";
    const fileName = "test.txt";

    cy.get('input[aria-label="Gist description"]').type(description);
    cy.get('input[aria-label="Filename including extension…"]').type(fileName);
    cy.get("#code-editor").type(text);
    cy.contains("button", "Create secret gist").click();

    const partialUrl = `/${Cypress.env("githubUsername")}/`;
    cy.url().should("include", partialUrl);
    cy.contains("a", fileName)
      .should("be.visible")
      .and("have.attr", "href")
      .and("includes", partialUrl);
    cy.contains(
      'span[title="Only those with the link can see this gist."]',
      "Secret",
    ).should("be.visible");
    cy.get("div #file-test-txt").should("be.visible");

    cy.get('.pagehead-actions button[aria-label="Delete this Gist"]').click();
  });
  it("should create a secret gist by drag and drop in editor, and should then delete Gist", () => {
    const description = "Another Cypress test";
    const fileName = "people.csv";

    cy.get('input[aria-label="Gist description"]').type(description);
    cy.get('input[aria-label="Filename including extension…"]').type(fileName);
    cy.get("#code-editor").selectFile("cypress/fixtures/people.csv", {
      action: "drag-drop",
    });
    cy.contains("button", "Create secret gist").click();

    const partialUrl = `/${Cypress.env("githubUsername")}/`;
    cy.url().should("include", partialUrl);
    cy.contains("a", fileName)
      .should("be.visible")
      .and("have.attr", "href")
      .and("includes", partialUrl);
    cy.contains(
      'span[title="Only those with the link can see this gist."]',
      "Secret",
    ).should("be.visible");
    cy.get("div #file-people-csv").should("be.visible");

    cy.get('.pagehead-actions button[aria-label="Delete this Gist"]').click();
  });
  it("should list your gists", () => {
    cy.get('summary[aria-label="View profile and more"]')
      .find("span.dropdown-caret")
      .click();
    cy.contains("a", "Your gists").click();

    const baseUrl = `https://gist.github.com/${Cypress.env("githubUsername")}`;
    cy.url().should("eq", baseUrl);

    cy.contains("a.UnderlineNav-item span", "All gists").should("be.visible");
  });
});

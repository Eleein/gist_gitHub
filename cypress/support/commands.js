Cypress.Commands.add('githubLogin', (username, password) => {
     cy.session(username, ()=>
     {
         cy.visit('https://github.com/login')

         cy.get('#login_field').type(username)
         cy.get('#password').type(password)
         cy.get('input[type="submit"]').click()

         cy.getCookie("logged_in").should('have.property', 'value', 'yes')
     })

   })

Cypress.Commands.add('loginToGithub', () => {
    cy.visit('https://github.com/login')
    cy.get('#login_field').type(Cypress.env('githubUsername'), {
        log: false,
    })
    cy.get('#password').type(Cypress.env('githubPassword'), {
        log: false,
    })
    cy.get('input[type="submit"]').click()

    cy.getCookie("logged_in").should('have.property', 'value', 'yes')
})
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
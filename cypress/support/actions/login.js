Cypress.Commands.add('acceptCookies', () => {
  if (Cypress.env('testEnv').includes('local')) {
    cy.get('.welcome__button--accept').click({ force: true });
  }
  cy.get('[data-route-type="plus"]').should('be.visible');
  cy.get('.transfer__button').click();
});

Cypress.Commands.add('login', (email, password) => {
  cy.get('[id="navigation.login"]').should('be.visible').click();
  cy.get('[name="email"]').should('be.visible', { timeout: 10000 }).click().type(email);
  cy.get('[name="password"]').should('be.visible').click().type(password);
  cy.get('[name="submit"]').should('be.visible').click();
});

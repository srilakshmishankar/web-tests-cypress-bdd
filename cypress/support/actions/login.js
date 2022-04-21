import '@testing-library/cypress/add-commands';

Cypress.Commands.add('acceptCookies', () => {
  cy.findByText('I accept').should('be.visible').click();
  cy.findByText('Terms of Service').should('be.visible');
  cy.get('.transfer__button').click();
});

Cypress.Commands.add('login', (email, password) => {
  cy.get('[id="navigation.login"]').should('be.visible').click();
  cy.get('[name="email"]').should('be.visible', { timeout: 10000 }).click().type(email);
  cy.get('[name="password"]').should('be.visible').click().type(password);
  cy.get('[name="submit"]').should('be.visible').click();
});

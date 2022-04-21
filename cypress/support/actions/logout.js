Cypress.Commands.add('logout', () => {
  cy.get('.TransferAccountMenuButton').click();
  cy.get('[data-valuetext="Log out"').should('be.visible').click();
});

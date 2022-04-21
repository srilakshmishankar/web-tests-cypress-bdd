Cypress.Commands.add('deleteTransfer', () => {
  cy.visit('/');
  cy.findByText('I accept').should('be.visible').click();
  cy.get('[id="navigation.user.items.transfers"]').should('be.visible').click();
  cy.get('.transferitem').first().should('contain.text', 'MultipleFileUploads');
  cy.get('.transferitem').first().realHover();
  cy.get('#transfers_page_delete').first().invoke('show').click({ force: true });
  cy.get('#transfers_page_confirm_multi_delete').click();
});

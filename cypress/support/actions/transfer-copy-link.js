Cypress.Commands.add('transferCopyLink', () => {
  cy.get('[id="navigation.user.items.transfers"]').should('be.visible').click();
  cy.get('.transferlist').then(($list) => {
    // if ($list.find('div:contains("All the transfers you send will appear here")')) {
    if ($list.find('ul:visible')) {
      cy.get('.transferitem__title').first().click();
    } else {
      cy.log('Could not open');
    }
    cy.get('.link__url').invoke('val');
  });
});

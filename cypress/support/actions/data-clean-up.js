Cypress.Commands.add('cleanUpData', () => {
  cy.get('[id="navigation.user.items.transfers"]').should('be.visible').click();
  cy.get('.transferlist').then(($list) => {
    if ($list.find('ul:visible')) {
      cy.get('.transferitem').first().realHover();
      cy.get('[id="transfers_page_delete"]').first().invoke('show').click({ force: true });
      cy.get('.transferlist__list-info > a').click();
      cy.get('[id="transfers_page_confirm_multi_delete"]').click();
    } else {
      cy.log('Nothing to delete');
    }
  });
});

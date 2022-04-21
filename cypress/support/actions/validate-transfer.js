import config from '../../config';

Cypress.Commands.add('validateErrorOnTwoGBLimit', () => {
  cy.get('.transfer__bubble').should('be.visible').then(($popup) => {
    $popup.should('contain.text', 'Hey big sender You can’t send more than 2 GB at a time. Want to send bigger transfers?');
  });
});

Cypress.Commands.add('validateTransfers', (fileName, type) => {
  cy.wait(10000); // waiting for the files to appear in transfers
  cy.get('[id="navigation.user.items.transfers"]').should('be.visible').click();
  cy.get('.transferitem').first().should('contain.text', `${fileName}-${type}`);
});

Cypress.Commands.add('validateMultipleTransfers', () => {
  cy.wait(10000); // waiting for the files to appear in transfers
  cy.get('[id="navigation.user.items.transfers"]').should('be.visible').click();
  cy.get('.transferitem').first().should('contain.text', 'MultipleFileUploads');
});

Cypress.Commands.add('validateReceived', () => {
  cy.wait(20000); // waiting for the files to appear in transfers
  cy.get('[id="navigation.user.items.transfers"]').should('be.visible').click();
  cy.get('#transfers_page_received').should('be.visible').click();
  cy.get('.transferitem').first().then(() => {
    cy.get('.transferitem__title').first().should('contain.text', config.EMAIL);
    cy.get('.metadata__filecount').first().should('contain.text', '3 files');
    cy.get('.metadata__expiry.expiry').first().should('contain.text', 'Expires in 7 days');
  });
});

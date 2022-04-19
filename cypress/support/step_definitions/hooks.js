import config from '../../config';

before(() => {
  cy.visit('/');
  cy.acceptCookies();
  cy.login(config.EMAIL, config.PASSWORD);
});

afterEach(() => {
  cy.get('[id="transfers_page_delete"]').invoke('show').click();
  cy.get('[id="transfers_page_confirm_multi_delete"]').click();
  cy.get('[aria-label="Close panel"]').click();
  cy.visit('/');
});

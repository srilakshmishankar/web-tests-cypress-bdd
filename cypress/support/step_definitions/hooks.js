import config from '../../config';

before(() => {
  cy.visit('/');
});

beforeEach(() => {
  cy.visit('/');
  cy.login(config.EMAIL, config.PASSWORD);
  cy.acceptCookies();
});

after(() => {
  // We can use this to clean up data at the end
  // cy.cleanUpData();
});

import { Given, When } from 'cypress-cucumber-preprocessor/steps';
import config from '../../config';

Given(/^user is logged into the app and is on the homepage$/, () => {
  cy.get('.uploader__locked-sender').should('contain.text', config.EMAIL);
});

When(/^user uploads a file$/, () => {
  cy.uploadFiles('sample.json');
});

When(/^user uploads multiple files$/, () => {
  cy.uploadMultipleFiles(['sample.json', 'text-file.txt']);
});

Given(/^file upload should be successful$/, () => {
  cy.validateTransfers();
});

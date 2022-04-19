// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//

import '@testing-library/cypress/add-commands';
import 'cypress-file-upload';
import 'cypress-wait-until';
import config from '../config';

Cypress.Commands.add('acceptCookies', () => {
  cy.findByText('I accept').should('be.visible').click();
  cy.findByText('Terms of Service').should('be.visible');
  cy.get('.transfer__button').click();
});

Cypress.Commands.add('login', (email, password) => {
  cy.get('[id="navigation.login"]').should('be.visible').click();
  cy.get('[name="email"]').should('be.visible').click().type(email);
  cy.get('[name="password"]').should('be.visible').click().type(password);
  cy.get('[name="submit"]').should('be.visible').click();
});

Cypress.Commands.add('uploadFiles', (fileName) => {
  const displayName = 'Single file (JSON)';
  const email = 'sample_test@mailinator.com';
  const message = 'This is a test message';
  cy.get('input[type="file"]')
    .attachFile(fileName);
  cy.get('[id="autosuggest"]').should('be.visible').click().type(email);
  cy.get('[id="displayName"]').should('be.visible').click().clear()
    .type(displayName);
  cy.get('[id="message"]').should('be.visible').click().type(message);
  cy.get('[data-testid="uploaderForm-transfer-button"]').should('be.enabled').click();
  cy.get('.details')
    .should('contain.text', 'Your transfer details')
    .should('contain.text', '1 file')
    .should('contain.text', 'Expires in 1 week');
  cy.get('.recipients')
    .should('contain.text', 'Sending to')
    .should('contain.text', email);
  cy.get('.TransferDisplayName')
    .should('contain.text', 'Title')
    .should('contain.text', displayName);
  cy.get('.message')
    .should('contain.text', 'Message')
    .should('contain.text', message);
  cy.get('.details__filelist')
    .should('contain.text', '1 file')
    .should('contain.text', fileName)
    .should('contain.text', 'json');
});

Cypress.Commands.add('uploadMultipleFiles', (fileNames) => {
  cy.get('input[type="file"]')
    .attachFile([...fileNames]);
  cy.get('[id="autosuggest"]').should('be.visible').click().type('sample_test@mailinator.com');
  cy.get('[id="message"]').should('be.visible').click().type('Test message');
  cy.get('[data-testid="uploaderForm-transfer-button"]').should('be.enabled').click();
  cy.findByText('Your transfer details').should('be.visible');
  cy.findByText('sample_test@mailinator.com').should('be.visible');
  cy.findByText('sample.json').should('be.visible');
  cy.findByText('Test message').should('be.visible');
});

Cypress.Commands.add('validateTransfers', () => {
//   cy.get('[id="navigation.user.items.transfers"]').should('be.visible').click();
  // cy.get('.emptystate')
  //     .should('contain.text','All the transfers you send will appear here');
  // cy.reload();
  cy.wait(10000);

  cy.intercept('GET', `${config.SERVICE_URL}/transfers?account_id=${config.ACCOUNT_ID}`, (req) => {
    req.alias = 'transfers';
  });

  //   cy.findByRole('button', { name: 'Close panel' }).click();
  cy.get('[id="navigation.user.items.transfers"]').should('be.visible').click();

  //   cy.waitUntil(
  //     () => cy.wait('@transfers').its('response.body').should('have.length', 1),
  //     cy.reload(),
  //     {
  //       interval: 500, // tries every 500 ms
  //       timeout: 20000, // gives up after 5 minutes
  //       errorMsg: 'Timed out waiting for transferred files',
  //     },
  //   );
  cy.wait('@transfers').its('response.statusCode').should('eq', 200);
  /* cy.wait('@transfers').its('response.body').should('have.length', 1); */
//   cy.reload();
//   cy.get('.transferitem')
//     .its('length')
//     .should('be.eq', 1);
});

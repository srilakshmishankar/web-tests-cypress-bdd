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

import './actions/data-clean-up';
import './actions/form-fill-helper';
import './actions/login';
import './actions/logout';
import './actions/upload-files';
import './actions/upload-folder';
import './actions/validate-transfer';
import './actions/transfer-copy-link';
import './actions/delete-recent-transfer';

Cypress.Commands.add('forceVisit', (url) => {
  cy.window().then((win) => win.open(url, '_self'));
});

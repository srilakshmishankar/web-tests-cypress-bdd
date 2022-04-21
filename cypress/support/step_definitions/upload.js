import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import config from '../../config';

let transferLink;

Given(/^user is logged into the app and is on the homepage$/, () => {
  cy.get('.uploader__locked-sender').should('contain.text', config.EMAIL);
});

When(/^user uploads a "([^"]*)" file of type "([^"]*)"$/, (fileName, type) => {
  cy.attachFiles({
    fileName,
    filePath: `cypress/fixtures/${fileName}`,
    size: 20000,
  });
  cy.uploadFiles(fileName, type);
});

When(/^user uploads files exceeding 2GB$/, () => {
  cy.uploadLargeFile(
    {
      filePath: 'cypress/fixtures/abc.zip',
      size: 2000 * 1010 * 1000,
    },
  );
});

When(/^user uploads multiple files$/, () => {
  cy.uploadMultipleFiles(['multiple-1.txt', 'multiple-2.jpg', 'multiple-3.zip'], 20000);
});

Then(/^user should see an error message$/, () => {
  cy.validateErrorOnTwoGBLimit();
});

When(/^user uploads a folder$/, () => {
  cy.uploadFolder('upload-folder', ['folder-1.txt', 'folder-2.jpg', 'folder-3.zip'], 10000);
});

Then(/^folder upload should be successful$/, () => {
  cy.validateTransfers();
});
Then(/^file "([^"]*)" of type "([^"]*)" upload should be successful$/, (fileName, type) => {
  cy.validateTransfers(fileName, type);
});

Then(/^multiple file uploads should be successful$/, () => {
  cy.validateMultipleTransfers();
});

Then(/^user opens the (sent|received) item$/, (transferType) => {
  if (transferType === 'received') {
    cy.get('#transfers_page_received').click();
  }
  cy.transferCopyLink();
});

Then(/^user copies the transfer link and verifies transfer link$/, () => {
  cy.get('.link__url').invoke('val').then((text) => {
    transferLink = text;
    cy.forceVisit(transferLink);
  });
  cy.findByText('I accept').should('be.visible').click();
  cy.get('h2').should('have.text', 'Ready when you are');
});

When(/^user deletes the transfer$/, () => {
  cy.deleteTransfer();
});

Then(/^the transfer link should be expired$/, () => {
  cy.forceVisit(transferLink);
  cy.get('.downloader__expired').should('be.visible');
});

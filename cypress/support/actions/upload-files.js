import 'cypress-file-upload';
import 'cypress-wait-until';
import config from '../../config';
import { fillForm, transferButtonHandle } from './helper';

Cypress.Commands.add('uploadFiles', (fileName, type) => {
  const displayName = `${fileName}-${type}`;
  const email = config.EMAIL;
  const message = 'This is a test message';

  fillForm({ displayName, email, message });

  transferButtonHandle();
  cy.get('.details', { timeout: 60000 })
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
    .should('contain.text', type);
});

Cypress.Commands.add('attachFiles', ({ fileName, filePath, size }) => {
  cy.task('createFile', { filePath, sizeInBytes: size }).then(() => {
    cy.get('input[type="file"]')
      .attachFile(fileName);
  });
});

Cypress.Commands.add('uploadMultipleFiles', (fileNames, size) => {
  fileNames.forEach((fileName) => {
    cy.task('createFile', { filePath: `cypress/fixtures/${fileName}`, sizeInBytes: size });
  });
  cy.get('input[type="file"]')
    .attachFile([...fileNames]);
  const displayName = 'MultipleFileUploads';

  const email = config.EMAIL;
  const message = 'ThisIsATestMessage';

  fillForm({ displayName, email, message });
  transferButtonHandle();

  cy.get('.details', { timeout: 60000 })
    .should('contain.text', 'Your transfer details')
    .should('contain.text', '3 files')
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
    .should('contain.text', '3 files');
});

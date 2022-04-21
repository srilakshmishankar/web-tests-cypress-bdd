import 'cypress-file-upload';
import 'cypress-wait-until';
import { fillForm } from './helper';

Cypress.Commands.add('uploadFolder', (folderName, fileNames, size) => {
  fileNames.forEach((fileName) => {
    cy.task('createFile', { filePath: `cypress/fixtures/${folderName}/${fileName}`, sizeInBytes: size });
  });
  cy.get('input[type="file"]')
    .selectFile(`cypress/fixtures/${folderName}`);
  const displayName = 'Folder upload';
  const email = 'sample_test@mailinator.com';
  const message = 'This is a test message';

  fillForm({ displayName, email, message });

  cy.get('.transfer__button').then(($footer) => {
    if ($footer.find('button:contains("I\'m 100% human")')) {
      cy.get('.transfer__button').click();
    }
  });
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

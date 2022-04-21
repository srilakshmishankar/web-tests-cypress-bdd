import { Given, Then } from 'cypress-cucumber-preprocessor/steps';

Given(/^user uploads multiple files to self email$/, () => {
  cy.uploadMultipleFiles(['multiple-1.txt', 'multiple-2.jpg', 'multiple-3.zip'], 20000);
});
Then(/^the files should be present in received section$/, () => {
  cy.validateReceived();
});
Then(/^user should be able to download the files successfully$/, () => {
  cy.get('.transferlist').then(($list) => {
    // if ($list.find('div:contains("All the transfers you send will appear here")')) {
    if ($list.find('ul:visible')) {
      cy.get('.transferitem').first().realHover();
      // cy.get('[id="transfers_page_download"]').first().invoke('show').click({ force: true });
    }
  });
});

const fillForm = ({ displayName, email, message }) => {
  cy.get('[id="autosuggest"]').should('be.visible').click().type(email);
  cy.get('[id="displayName"]').should('be.visible').click().clear()
    .type(displayName);
  cy.get('[id="message"]').should('be.visible').click().type(message);
  cy.get('[data-testid="uploaderForm-transfer-button"]').should('be.enabled').click();
  cy.wait(2000);
};

module.exports = {
  fillForm,
};

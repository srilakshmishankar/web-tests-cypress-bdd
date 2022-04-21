const fillForm = ({ displayName, email, message }) => {
  cy.get('[id="autosuggest"]').should('be.visible').click().type(email);
  cy.get('[id="displayName"]').should('be.visible').click().clear()
    .type(displayName);
  cy.get('[id="message"]').should('be.visible').click().type(message);
  cy.get('[data-testid="uploaderForm-transfer-button"]').should('be.enabled').click();
  cy.wait(2000);
};

const transferButtonHandle = (() => {
  cy.get('.transfer__footer').then(($footer) => {
    if ($footer.find('button:contains("I\'m 100% human")')) {
      cy.get('.transfer__button').click();
    }
    if ($footer.find('button:contains("No")')) {
      cy.get('.transfer__button').first().click();
    }
  });
})

module.exports = {
  fillForm,
  transferButtonHandle,
};

/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

const cucumber = require('cypress-cucumber-preprocessor').default;
const fs = require('fs');

module.exports = (on) => {
  on('file:preprocessor', cucumber());

  on('task', {
    createFile({ filePath, sizeInBytes }) {
      return new Promise((done) => {
        const fh = fs.openSync(filePath, 'w');
        fs.writeSync(fh, 'ok', Math.max(0, sizeInBytes));
        fs.closeSync(fh);
        done(true);
      });
    },
  });
};

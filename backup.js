var Nightmare = require('nightmare');
var nightmare = new Nightmare();
var fs = require('fs');

nightmare
  .goto('https://workflowy.com/accounts/login/')

  // login
  .type('#id_username', process.env.USERNAME)
  .type('#id_password', process.env.PASSWORD)
  .click('[type=submit]')
  .wait(2000)
  // open export panel
  .click('.menu-button')
  .wait(2000)
  .click('#exportAllButton')
  .wait('#id_text')
  .click('#id_text')
  .wait(2000)
  .evaluate(function () {
    return document.querySelector('.previewWindow pre').innerText;
  })
  .end()
  .then(function(exportText) {
    var filename = 'workflowy_export.txt';
    console.log('Saving export to ' + filename);
    fs.writeFileSync(filename, exportText);
  })
  .catch(function (error) {
    console.error('Search failed:', error);
  });

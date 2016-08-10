var logger    = require('yocto-logger');
var mailchimp = require('../src')(logger);

mailchimp.loadConfig([
  {
    name    : 'myAccount',
    token   : 'aaa-us14',
    version : 'v2.0',
    list : [
      {
        name        : 'test',
        id          : 'aaa',
        doubleOptin : false
      }
    ]
  }
]).then(function (value) {

  console.log('\n ---> load success - value : ', value)

  mailchimp.subscribe({
    accountName : 'myAccount',
    listName    : 'test',
    email       : 'toataao@toto.fr'
  }).then(function () {

    console.log('\n --> success subscribe ')
  }.bind(this)).catch(function (error) {

    console.log('\n error ==> subs  : ', error);
  });
}.bind(this)).catch(function (error) {

  console.log('\n error ==> ', error);
});

var mailchimp     = require('mailchimp-api');
var _             = require('lodash');
var logger        = require('yocto-logger');
var utils         = require('yocto-utils');
var joi           = require('joi');

var mc = new mailchimp.Mailchimp('8a47177c9800d9ed22cececac138405a-us14');

var idList = '2844f6b6d7';

mc.lists.subscribe({
  id    : idList,
  double_optin : false,
  email : {
    email :'lonnya@yocto.re' }
  }, function(data) {
  console.log('\n ---> success : ', data);
},
function(error) {
  console.log('\n --> error : ', error);
});

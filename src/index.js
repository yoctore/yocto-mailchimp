'use strict';

var mailchimp     = require('mailchimp-api');
var _             = require('lodash');
var logger        = require('yocto-logger');
var utils         = require('yocto-utils');

/**
 * manage Mailchimp setup
 *
 * @class Mailchimp
 */
function Mailchimp (config, logger) {
}


// Default export
module.exports = function (l) {
  // is a valid logger ?
  if (_.isUndefined(l) || _.isNull(l)) {
    logger.warning('[ Yocto-Mailchimp.constructor ] - Invalid logger given. Use internal logger');
    // assign
    l = logger;
  }
  // default statement
  return new (Mailchimp)(l);
};

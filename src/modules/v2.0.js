'use strict';

var mailchimp     = require('mailchimp-api');
var _             = require('lodash');
var logger        = require('yocto-logger');
var utils         = require('yocto-utils');
var Q             = require('q');

/**
 * manage Mailchimp setup
 *
 * @class Mailchimp
 */
function Mailchimp (logger) {

  /**
   * Defaut logger
   * @type {Object}
   */
  this.logger = logger;
}

/**
 * Load an external file to construct response just by specifing error code
 *
 * @param  {Object} configMc config mail chimp
 * @param  {Object} configList config of the list
 * @param  {String} email the email to add into
 * @return {boolean} true if file is loaded, otherwise false
 */
Mailchimp.prototype.subscribe = function (configMc, configList, email) {
  // create promise
  var deferred = Q.defer();

  // Create a new mailchimp client with the token of account
  var mc = new mailchimp.Mailchimp(configMc.token);

  this.logger.debug('[ Mailchimp.v2.subsribe ] - send request to subscribe email : ' + email +
  ' into list : ' + configList.name);
  // subscribe user
  mc.lists.subscribe(utils.obj.underscoreKeys({
    id          : configList.id,
    doubleOptin : configList.doubleOptin,
    email       : {
      email : email
    }
  }), function (value) {
    this.logger.debug('[ Mailchimp.v2.subsribe ] - subscribe success into list ' +
    configList.name + ', more details : ', utils.obj.inspect(value));
    // success so resolve value returned
    deferred.resolve(value);
  }.bind(this), function (error) {
    this.logger.error('[ Mailchimp.v2.subscribe ] - subscribe faile into list ' + configList.name +
    ', more details : ' + utils.obj.inspect(error));
    // success so resolve value returned
    deferred.reject(error);
  }.bind(this));

  // return promise
  return deferred.promise;
};

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

'use strict';

var _             = require('lodash');
var logger        = require('yocto-logger');
var utils         = require('yocto-utils');
var joi           = require('joi');
var Q             = require('q');

/**
 * manage Mailchimp setup
 *
 * @class Mailchimp
 */
function Mailchimp (logger) {
  /**
  * Default logger
  * @type {Object}
  */
  this.logger = logger;

  /**
   * Default config of module
   * @type {Object}
   */
  this.config = {};

  /**
   * List of all modules available
   * @type {Object}
   */
  this.modules = {
    'v2.0' : require('./modules/v2.0.js')(logger)
  };
}

/**
 * Load an external file to construct response just by specifing error code
 *
 * @param  {Object} data config
 * @return {boolean} true if file is loaded, otherwise false
 */
Mailchimp.prototype.loadConfig = function (data) {

  var deferred = Q.defer();

  // joi schema of the config file
  var schema = joi.array().min(1).items(
    joi.object().required().keys({
      version : joi.string().required().allow([ 'v2.0' ]),
      name    : joi.string().required().empty(),
      token   : joi.string().required().empty(),
      list    : joi.array().items(
        joi.object({
          name        : joi.string().required().empty(),
          id          : joi.string().required().empty(),
          // Indicate if double otpin was used
          doubleOptin : joi.boolean().optional().default(true)
        }).required()
      ).required().min(1)
    })
  );

  // validate joi schema with the given file
  var result   = joi.validate(data, schema);

  // check if an error occured
  if (result.error) {
    // throw a new exception
    deferred.reject('The joi validation failed, more details : ' + result.error.toString());

    // return result of process
    return deferred.promise;
  }

  // set config
  this.config.setting = result.value;

  this.logger.info('[ Mailchimp.loadConfig ] - config load success');

  deferred.resolve(true);

  return deferred.promise;
};

/**
 * Load an external file to construct response just by specifing error code
 *
 * @param {Object} data for subscribe
 *       - {Object} accountName name of the accout to retrieve the API Key
 *       - {Object} listName name of the list
 *       - {String} email the email to add into
 * @return {boolean} true if file is loaded, otherwise false
 */
Mailchimp.prototype.subscribe = function (data) {

  var deferred = Q.defer();

  // joi schema of the params
  var schema = joi.object().required().keys({
    accountName : joi.string().required().empty(),
    listName    : joi.string().required().empty(),
    email       : joi.string().email().required().empty()
  });

  // validate joi schema with the given file
  var result   = schema.validate(data);

  // check if an error occured
  if (result.error) {
    // reject error
    deferred.reject('The required params are not present, more details : ' +
    utils.obj.inspect(result.error));

    // return result of process
    return deferred.promise;
  }

  var configMc = _.find(this.config.setting, {
    name : data.accountName
  });

  if (_.isUndefined(configMc)) {

    this.logger.error('[ Mailchimp.subscribe ] - Unknow config for the account name : ' +
    data.accountName);

    // reject error
    deferred.reject('Unknow config for the account name : ' + data.accountName);

    // return result of process
    return deferred.promise;
  }

  var configList = _.find(configMc.list, {
    name : data.listName
  });

  if (_.isUndefined(configList)) {

    this.logger.error('[ Mailchimp.subscribe ] - Unknow config for the account list name : ' +
    data.accountName + ' of account : ' + data.listName);

    // reject error
    deferred.reject('Unknow config for the account list name : ' + data.accountName +
    ' of account : ' + data.listName);

    // return result of process
    return deferred.promise;
  }

  // Call the methods subscribe
  return this.modules[ configMc.version ].subscribe(configMc, configList, data.email);
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

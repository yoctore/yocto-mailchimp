var utils  = require('yocto-utils');
var chai   = require('chai').assert;
var expect = require('chai').expect;
var should = require('chai').should;
var _      = require('lodash');
var mailchimp = require('../../src/')();
var util      = require('util');

mailchimp.logger.enableConsole(false);

var types = [ null, undefined, 1, true, false, NaN, 'a', '', {}, [] ];

var config = [
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
];

describe('Load config', function () {

  // valid conf
  describe('loadConfig() must return a return success promise : ', function () {
    // test load mailchimp with promised
    it('Use valid configuration', function( ) { // no done

      // note the return
      return mailchimp.loadConfig(config).then(function( data){
        expect(data).to.is.equal(true);
      });// no catch, it'll figure it out since the promise is rejected
    });
  });

  // wrong conf
  describe('loadConfig() must return a return fail promise because < version > will not be an ' +
  'valid value : ', function () {

    types.forEach(function (t) {
      it('Using type for : < ' +  util.inspect(t, { depth : null }) + ' > for field < version >',
      function () {

        var config = [
          {
            name    : t,
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
        ];

        // note the return
        return mailchimp.loadConfig(config).catch(function (data) {
          expect(data).to.be.an('string');
        });// no catch, it'll figure it out since the promise is rejected
      });
    });
  });
});

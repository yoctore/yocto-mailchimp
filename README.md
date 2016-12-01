[![NPM](https://nodei.co/npm/yocto-mailchimp.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/yocto-mailchimp/)

![alt text](https://david-dm.org/yoctore/yocto-mailchimp.svg "Dependencies Status")
[![Code Climate](https://codeclimate.com/github/yoctore/yocto-mailchimp/badges/gpa.svg)](https://codeclimate.com/github/yoctore/yocto-mailchimp)
[![Test Coverage](https://codeclimate.com/github/yoctore/yocto-mailchimp/badges/coverage.svg)](https://codeclimate.com/github/yoctore/yocto-mailchimp/coverage)
[![Issue Count](https://codeclimate.com/github/yoctore/yocto-mailchimp/badges/issue_count.svg)](https://codeclimate.com/github/yoctore/yocto-mailchimp)
[![Build Status](https://travis-ci.org/yoctore/yocto-mailchimp.svg?branch=master)](https://travis-ci.org/yoctore/yocto-mailchimp)

## Overview

This module is a part of yocto node modules for NodeJS.

Please see [our NPM repository](https://www.npmjs.com/~yocto) for complete list of available tools (completed day after day).

This module provide a simple config validator tools for your node app.

## Motivation

Create an easy and ready to use connector & model builder based on mongoose.

## Mailchimp APi version

This module implements the v2.0 of the mailchimp API.

## Available Methods

### Configuration of module

```javascript

var logger    = require('yocto-logger');
var mailchimp = require('yocto-mailchimp')(logger);

// Multiple Mailchimp account can be configured
mailchimp.loadConfig([
  {
    // Name of config
    name    : 'myAccount',
    // Private token
    token   : 'aaa4545521-us14',
    // Version of Mailchimp Api to use
    version : 'v2.0',
    // Configuration of mailing list that will be used
    list : [
      {
        // Name of the mailinglist into Mailchimp
        name        : 'test',
        // Id of the list
        id          : 'aaa',
        // Enable doubleOptin or not
        doubleOptin : false
      }
    ]
  }
]).then(function (value) {
  console.log('load config success')
}.bind(this)).catch(function (error) {
  console.log('load config failed');
});
```

### subscribe

This method permit to subscribe an user to mailing list

>Before use subscribe(), your module should be correctly initialized

```javascript

mailchimp.subscribe({
  // The account name defined in config to use
  accountName : 'myAccount',
  // The mailing list name
  listName    : 'test',
  // The email to add
  email       : 'toataao@toto.fr'
]).then(function (value) {
  console.log('load config success')
}.bind(this)).catch(function (error) {
  console.log('load config failed');
});
```

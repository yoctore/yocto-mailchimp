/* yocto-mailchimp - Manage mailchimp client - V0.1.0 */
"use strict";function Mailchimp(a){this.logger=a}var mailchimp=require("mailchimp-api"),_=require("lodash"),logger=require("yocto-logger"),utils=require("yocto-utils"),Q=require("q");Mailchimp.prototype.subscribe=function(a,b,c){var d=Q.defer(),e=new mailchimp.Mailchimp(a.token);return this.logger.debug("[ Mailchimp.v2.subsribe ] - send request to subscribe email : "+c+" into list : "+b.name),e.lists.subscribe(utils.obj.underscoreKeys({id:b.id,doubleOptin:b.doubleOptin,email:{email:c}}),function(a){this.logger.debug("[ Mailchimp.v2.subsribe ] - subscribe success into list "+b.name+", more details : ",utils.obj.inspect(a)),d.resolve(a)}.bind(this),function(a){this.logger.error("[ Mailchimp.v2.subscribe ] - subscribe faile into list "+b.name+", more details : "+utils.obj.inspect(a)),d.reject(a)}.bind(this)),d.promise},module.exports=function(a){return(_.isUndefined(a)||_.isNull(a))&&(logger.warning("[ Yocto-Mailchimp.constructor ] - Invalid logger given. Use internal logger"),a=logger),new Mailchimp(a)};
/**
 * Author: Mustapha Taiwo
 */

'use strict';

var config = require('config'),
    _ = require('lodash'),
    moment = require('moment'),
    crypto = require('crypto'),
    salt = crypto.randomBytes(128).toString('base64');

var hashPassword = function (password) {
    var key;
    crypto.pbkdf2(password, salt, 10000, 512, function (err, derivedKey) {
        key = derivedKey;
    });
    return key;
}
    
var Accounts = module.exports = {
    login: function(req, res, next) {

    },
    logout: function(req, res, next) {

    },
    ensureLogin: function(req, res, next) {

    }
}
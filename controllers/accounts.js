/**
 * Author: Mustapha Taiwo
 */

'use strict';

var config = require('config'),
    _ = require('lodash'),
    moment = require('moment');
const crypto = require('crypto'),
    secret = 'aetsapp@bellstech';


const hashPassword = function (password) {
    const hash = crypto.createHmac('sha256', secret)
        .update(password)
        .digest('hex');
    console.log("hashedPassword: ",hash);
    return hash;
    // var key;
    // crypto.pbkdf2(password, salt, 10000, 512, function (err, derivedKey) {
    //     key = derivedKey;
    // });
    // return key;
}
    
var Accounts = module.exports = {
    login: function(req, res, next) {

    },
    logout: function(req, res, next) {

    },
    ensureLogin: function(req, res, next) {

    },
    hash: hashPassword
}
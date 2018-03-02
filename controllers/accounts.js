/**
 * Author: Mustapha Taiwo
 */

'use strict';

var config = require('config'),
    _ = require('lodash'),
    moment = require('moment');
const crypto = require('crypto'),
    secret = 'aetsapp@bellstech';


//##APP
var models = require('../models');

const hashPassword = function (password) {
    const hash = crypto.createHmac('sha256', secret)
        .update(password)
        .digest('hex');
    return hash;
    // var key;
    // crypto.pbkdf2(password, salt, 10000, 512, function (err, derivedKey) {
    //     key = derivedKey;
    // });
    // return key;
}
    
var Accounts = module.exports = {
    login: function(req, res, next) {
        var loginDetails = req.body;
        models.Users.findAll({
            where:{
                username: loginDetails.username,
                password: Accounts.hash(loginDetails.password)
            },
            attributes:['id','name','username','isAdmin','isSuperAdmin']
        }).then(user => {
            console.log("User: ",user);
            if (!user || _.isEmpty(user)){
                return res.send({
                    error: 1,
                    message: "Username or Password is incorrect"
                });
            }
            res.send(user);
        })

    },
    logout: function(req, res, next) {

    },
    ensureLogin: function(req, res, next) {

    },
    hash: hashPassword
}
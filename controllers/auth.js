(function(params) {

    /**
     * @author: Mustapha Taiwo
     */

    'use strict';

    const config = require('config'),
        _ = require('lodash'),
        moment = require('moment');
    const crypto = require('crypto'),
        secret = 'aetsapp@bellstech';


    //##APP
    const models = require('../models');

    let Auth = {};
    Auth.hash = function(password) {
        const hash = crypto.createHmac('sha256', secret)
            .update(password)
            .digest('hex');
        return hash;
    };
    Auth.login = function(req, res, next) {
        var loginDetails = req.body;
        return models.Users.findAll({
            where: {
                username: loginDetails.username,
                password: Auth.hash(loginDetails.password)
            },
            attributes: ['id', 'name', 'username', 'isAdmin', 'isSuperAdmin']
        }).then(user => {
            console.log("User: ", JSON.stringify(user));
            if (!user || _.isEmpty(user)) {
                return {
                    status: 1,
                    message: "Username or Password is incorrect"
                };
            }
            user = JSON.stringify(user);
            return {
                status: 0,
                data: JSON.parse(user)
            };
        }, function(err) {
            return {
                status: 2,
                message: err
            };
        });
    };
    Auth.logout = function(req, res, next) {};
    Auth.ensureLogin = function(req, res, next) {};

    module.exports = Auth;
})();
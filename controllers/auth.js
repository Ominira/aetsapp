(function() {

    /**
     * @author: Mustapha Taiwo
     * @file: auth.js
     * @namespace: controllers
     * @name: Auth
     * @description: Everything about User Accounts and Authentications is handled here
     */

    'use strict';

    const config = require('config'),
        crypto = require('crypto'),
        _ = require('lodash'),
        hashConfig = config.hash;

    //##APP
    const models = require('../models');

    let Auth = {};
    Auth.hash = function(password) {
        const hash = crypto
            .createHmac(hashConfig.algorithm, hashConfig.secret)
            .update(password)
            .digest(hashConfig.digest);
        return hash;
    };
    Auth.getRequestParams = function(request) {
        return (request && request.params) ? request.params : {};
    };
    Auth.getRequestBody = function(request) {
        return (request && request.body) ? request.body : {};
    };
    Auth.getRequestParamsByArgs = function(request, args) {
        if (request) {
            return request.param(arg);
        }
    };
    Auth.getHomeView = function(req, res, next) {
        res.render("index", { title: "Home" });
    };
    Auth.flashMessage = (req, res) => {

    };
    Auth.ensureLogin = function(req, res, next) {
        if (!(req.user || req.session.user)) {
            res.redirect("/");
        } else {
            next();
        }
    };
    Auth.login = function(req, res, next) {
        var loginDetails = Auth.getRequestBody(req);
        return models.Users.findOne({
                where: {
                    username: loginDetails.username,
                    password: Auth.hash(loginDetails.password)
                },
                attributes: ["id", "name", "username", "email", "isAdmin", "isSuperAdmin"]
            })
            .then(
                user => {
                    // console.log("User: ", JSON.stringify(user));
                    if (!user || _.isEmpty(user)) {
                        res.redirect("/");
                    } else {
                        req.session.user = JSON.parse(JSON.stringify(user));
                        res.locals.user = req.session.user;
                        res.redirect("/admin");
                    }
                },
                function(err) {
                    req.flash("info", {
                        status: 2,
                        type: "danger",
                        message: err
                    });
                    res.locals.infoMessage = req.flash();
                    Auth.getHomeView(req, res, next);
                }
            )
            .catch(ex => {
                console.log("Exception in Checking User login Credentials: ", ex);
                req.flash("info", {
                    status: 3,
                    type: "danger",
                    message: ex
                });
                res.locals.infoMessage = req.flash();
                Auth.getHomeView(req, res, next);
            });
    };
    Auth.logout = function(req, res, next) {
        if (req.session) {
            req.session.destroy(function(err) {
                if (err) {
                    console.log(err);
                } else {
                    res.redirect("/");
                }
            });
        } else {
            res.redirect("/");
        }
    };

    module.exports = Auth;
})();
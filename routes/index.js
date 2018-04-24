(function() {
    /**
     * @author: Mustapha Taiwo
     * @file: ./routes/index.js
     * @name: Routes Main
     * @description: Routes Config/Index
     */
    "use strict";

    var express = require("express"),
        router = express.Router();
    const auth = require("../controllers/auth");

    /**
     * @name: Home/Login Page
     * @namespace: Route
     * @description: Goes to and Renders the home/login view
     * @method: GET
     */
    router.get("/", auth.getHomeView);
    /**
     * @name: Login Handler
     * @namespace: Route
     * @description: Handles user login
     * @param: In body, username and password
     * @method: POST
     * @requires: Authentication (auth) Login subroutine (auth.login)
     * @returns: Redirects to Admin view, if Successful, Else, redirects to Login Page
     */
    router.post("/", auth.login);
    /**
     * @name: Logout Handler
     * @namespace: Route
     * @description: Resets/Destroys Session and Routes user back to Login page
     * @method: GET
     * @requires: Authentication (auth) Logout subroutine (auth.logout)
     * @returns: nothing, redirects user to login page
     */
    router.get("/logout", auth.logout);
    /**
     * @name: Users Route
     * @requires: routes/users
     * @description: Users Bound Route
     */
    router.use("/users", require("./users"));
    /**
     * @name: Admin 
     * @requires: routes/admin, auth.ensureLogin
     * @description: Admin Bound Routes
     */
    router.use("/admin", auth.ensureLogin, require("./admin"));
    /**
     * @name: Resource Route
     * @requires: routes/resource
     * @description: Resource Bound Routes
     */
    router.use("/resource", require("./resource"));

    module.exports = router;
})();
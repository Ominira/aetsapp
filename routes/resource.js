(function() {
    /**
     * @author: Mustapha Taiwo
     * @name: Resource
     * @description: App Resource Route Handler
     */

    'use strict';

    var express = require("express"),
        router = express.Router();
    const resource = require('../controllers/resource');
    //####################################################################################################################//
    /**
     * @name: Courses
     * @description: Route to get courses
     * @method: GET 
     * @param: None
     * @returns: [{
     *    code: "",
     *    name: "",
     *    units: i,
     *    department: "",
     *    college: ""
     *  },{}]
     */
    router.get("/courses", resource.courses);

    module.exports = router;
})();
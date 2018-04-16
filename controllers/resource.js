(function() {
    /**
     * @author: Mustapha Taiwo
     * @name: Resource
     * @description: App Model Resource Handler/Controller
     */

    'use strict';

    const _ = require("lodash"),
        q = require("q"),
        _async = require("async"),
        //### App
        models = require("../models");

    let Resource = {};

    Resource.courses = function(req, res, next) {
        return models.Course.findAll({
                attributes: [
                    ['course_id', 'code'],
                    ['course_desc_short', 'name'],
                    ['course_units', 'units']
                ],
                include: [{
                    model: models.Department,
                    attributes: [
                        ["dept_desc_short", "department"]
                    ],
                    include: [{
                        model: models.College,
                        attributes: [
                            ['college_id', 'college']
                        ]
                    }]
                }, ]
            })
            .then(function(courses) {
                courses = JSON.stringify(courses);
                courses = _.map(JSON.parse(courses), function(course) {
                    course.department = course.Department.department;
                    course.college = course.Department.College.college;
                    delete course.Department;
                    return course;
                });
                res.send(courses);
            }, function(err) {
                console.error("Getting Course Error: ", err);
            })
            .catch(ex => {
                console.error("Some Exceptions Getting Course: ", ex);
            });
    };

    module.exports = Resource;
})();
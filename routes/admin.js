(function() {
    /**
     * @author: Mustapha Taiwo
     * @file: ./routes/admin.js
     * @name: Admin Routes
     * @description: Admin bound Routes
     */
    'use strict';

    var express = require('express');
    var router = express.Router();
    var models = require('../models');

    /**go to admin dashboard*/
    router.get('/', (req, res, next) => res.render('admin/index'));

    router.post('/', (req, res, next) => {});

    router.get('/timetable', (req, res, next) => res.render('admin/timetable'));

    router.get('/datamanagement', (req, res, next) => {
        models.sequelize.query('SHOW TABLES').then(function(tables) {
            res.render('admin/datamanagement', {
                tables: tables[0]
            });
        });
    });

    module.exports = router;
})();
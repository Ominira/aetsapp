var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  models.sequelize.query('SHOW TABLES').then(function(tables){
    res.render('index', { 
      title: 'Express',
      otherTitle: 'Trying Sequelize: Express Example',
      tables: tables[0]
    });
  })
});

module.exports = router;

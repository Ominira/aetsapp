var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  models.Progam.findAll({}).then(function(programs){
    res.render('index', { 
      title: 'Express',
      otherTitle: 'Sequelize: Express Example',
      programs: programs
    });
  })
});

module.exports = router;

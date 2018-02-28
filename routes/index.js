var express = require('express');
var router = express.Router();
var models = require('../models').sequelize;

/* GET home page. */
router.get('/', function(req, res, next) {
  models.query('SELECT * FROM db_bellstech_aets.program').then(function(programs){
    //console.log("Programs: ",JSON.stringify(programs));
    res.render('index', { 
      title: 'Express',
      otherTitle: 'Sequelize: Express Example',
      programs: programs[0]
    });
  })
});

module.exports = router;

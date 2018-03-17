var express = require('express');
var router = express.Router();
var _ = require('lodash');
var models = require('../models');
var auth = require('../controllers/auth');

var defaultUser = {
    name: "Azzahra Ominira",
    username: "default@bells"
};
/**go to admin dashboard*/
router.get('/', function(req, res, next){
    var user = defaultUser;
    if (!_.isEmpty(req.query)){
        user = JSON.parse(req.query.user)[0];
    }
    console.log("Passed User: ",user);
    models.Program.findAll({}).then(function(programs){
        res.render('admin/index',{
            user: user,
            programs: programs
        });
    });
});

router.post('/', function(req, res, next){
    
});

router.get('/timetable', function(req, res, next) {
    res.render('admin/timetable',{
        user: defaultUser
    });
});

router.get('/datamanagement', function(req, res, next) {
    models.sequelize.query('SHOW TABLES').then(function(tables){
        res.render('admin/datamanagement', {    
            tables: tables[0],
            user: defaultUser
        });
    });
});

module.exports = router;
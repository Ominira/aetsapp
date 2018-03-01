var express = require('express');
var router = express.Router();
var models = require('../models');

/**go to admin dashboard*/
router.get('/', function(req, res, next){
    var name = 'John Philips';
    if (req.query && req.query.username){
        name = req.query.username;
    }
    models.Program.findAll({}).then(function(programs){
        res.render('admin/index',{
            username: name,
            programs: programs
        });
    })
});

router.post('/', function(req, res, next){
    //res.send(req.body);
    var username = req.body.username;
    res.redirect('/admin?username='+username);
});

module.exports = router;
var express = require('express');
var router = express.Router();
var _ = require('lodash');
var models = require('../models');
var accounts = require('../controllers/accounts');

/**go to admin dashboard*/
router.get('/', function(req, res, next){
    var user = {name:"John Philips"}
    if (!_.isEmpty(req.query)){
        user = JSON.parse(req.query.user)[0];
    }
    console.log("Passed User: ",user);
    models.Program.findAll({}).then(function(programs){
        res.render('admin/index',{
            user: user,
            programs: programs
        });
    })
});

router.post('/', function(req, res, next){
    var loginDetails = req.body;
    models.Users.findAll({
        where:{
            username: loginDetails.username,
            password: accounts.hash(loginDetails.password)
        },
        attributes:['id','name','username','isAdmin','isSuperAdmin']
    }).then(user => {
        console.log("User: ",user);
        if (!user || _.isEmpty(user)){
            return res.send({
                error: 1,
                message: "Username or Password is incorrect"
            });
        }
        res.redirect('/admin?user='+JSON.stringify(user));
    })
});

module.exports = router;
var express = require('express');
var router = express.Router();
var _ = require('lodash');
var models = require('../models');
var accounts = require('../controllers/accounts');

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
        res.send(user);
    })
});

module.exports = router;
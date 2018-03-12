var express = require('express');
var router = express.Router();
var _ = require('lodash');
var models = require('../models');
var auth = require('../controllers/auth');

/**go to admin dashboard*/
router.get('/', function(req, res, next){
    var user = {
        name:"Default User",
        username: "default@bells"
    }
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
            password: auth.hash(loginDetails.password)
        },
        attributes:['id','name','username','email','isAdmin','isSuperAdmin']
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

router.get('/timetable', function(req, res, next) {
    res.render('admin/timetable',{
        user: {
            name: 'csfsfsf',
            username: 'default@bells'
        }
    });
})

module.exports = router;
var express = require('express');
var router = express.Router();
var models = require('../models');
var _ = require('lodash');
var auth = require('../controllers/auth');


var getHomeView = function(req, res, next) {
  res.render('index', {title: 'Home'});
}
/* GET home page. */
router.get('/', getHomeView);

router.post('/', function(req, res, next) {
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
          req.flash('info',{
            type: 'danger',
            message: "Username or Password is incorrect"
          });
          res.locals.infoMessage = req.flash();
          getHomeView(req, res, next);
        } else{
          res.redirect('/admin?user='+JSON.stringify(user));          
        }
    })
});

module.exports = router;

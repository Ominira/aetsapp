var express = require('express');
var router = express.Router();

/* GET admin listing. */
router.get('/', function(req, res, next) {
  res.send('this is the admin');
});

/**go deeper into admin */
router.get('/dashboard', function(req, res, next){
    res.render('admin/index',{username:'John Philips'});
});

module.exports = router;
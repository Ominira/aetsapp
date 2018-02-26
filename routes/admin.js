var express = require('express');
var router = express.Router();

/**go to admin dashboard*/
router.get('/', function(req, res, next){
    res.render('admin/index',{username:'John Philips'});
});

module.exports = router;
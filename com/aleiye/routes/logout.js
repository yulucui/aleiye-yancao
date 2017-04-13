/**
 * Created by yulucui on 16/8/23.
 */
var express = require('express');
var router = express.Router();
var authority = require(ALEIYE_PATH + 'com/aleiye/service/authority/Authority');

router.get('/',function(req,res,next) {
    req.session.User = undefined;
    res.render('server/user/login');
});

module.exports = router;
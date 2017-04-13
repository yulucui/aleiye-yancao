/**
 * Created by yulucui on 16/8/23.
 */
var express = require('express');
var router = express.Router();
var authority = require(ALEIYE_PATH + 'com/aleiye/service/authority/Authority');
/* GET home page. */
router.post('/', function(req, res, next) {
    var username = req.param('username');
    var password = req.param('password');
    var session = req.session;
    authority.login(username,password,function(result){
        if(result.length){
            var user = result[0];
            authority.getAuthoritysByIds(user.resources,function(result){
                user.resources = result;
                session.User = user;
                res.render('server/index', { User: user, title: '管理后台', data: { content: 0, category: 0, comment: 0, user: 1, role: 2, file: 1 }});
            });
        } else {
            res.render('server/user/login',{stat: '账号密码错误'});
        }
    });
});

router.get('/',function(req,res,next) {
    var user = req.session.User;
    if(user)
        res.render('server/index', { User: user, title: '管理后台', data: { content: 0, category: 0, comment: 0, user: 1, role: 2, file: 1 }});
    else
        res.render('server/user/login');
});

module.exports = router;
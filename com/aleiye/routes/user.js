var express = require('express');
var router = express.Router();
var user = require(ALEIYE_PATH + 'com/aleiye/service/authority/Authority');
var report = require(ALEIYE_PATH + 'com/aleiye/service/data/Report');
// var searcher = require(ALEIYE_PATH + 'com/aleiye/service/platform/Searcher');

router.get('/list', function(req, res, next) {
  user.getAllUser(function(result){
    res.render('server/user/list',{users:result});
  });
});

router.get('/creat',function(req,res,next) {
  report.getAllReport(function(result) {
    res.render('server/user/add',{reports:result});
  })
});

router.get('/edit',function(req,res,next) {
  var id = req.param('_id');
  user.getUserById(id,function(user) {
    report.getAllReport(function(reports){
      res.render('server/user/edit',{user:user,reports:reports});
    });
  });
});

router.post('/save',function(req,res,next) {
  var param = req.param('param');
  param = JSON.parse(param);
  param.userGrop = 3;
  if(param._id){
    user.updateUser(param,function(result){
      res.send('' + result);
    });
  } else {
    user.creatUser(param,function(result){
      res.send('' + result);
    });
  }
});

router.get('/del', function(req, res, next) {
  var id = req.param('_id');
  user.delUser(id,function(result) {
    res.send('' + result);
  });
});

module.exports = router;

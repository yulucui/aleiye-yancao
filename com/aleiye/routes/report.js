var express = require('express');
var router = express.Router();
var chart = require(ALEIYE_PATH + 'com/aleiye/service/data/Chart');
var report = require(ALEIYE_PATH + 'com/aleiye/service/data/Report');
// var searcher = require(ALEIYE_PATH + 'com/aleiye/service/platform/Searcher');

router.get('/list', function(req, res, next) {
  report.getAllReport(function(result){
    res.render('server/report/list',{reports:result});
  });
});

router.get('/creat',function(req,res,next) {
  chart.getAllChart(function(result){
    res.render('server/report/add',{charts:result});
  });
});

router.get('/edit',function(req,res,next) {
  var id = req.param('_id');
  report.getReportById(id,function(report) {
    chart.getAllChart(function(charts){
      res.render('server/report/edit',{report:report[0],charts:charts});
    });
  });
});
router.post('/save',function(req,res,next) {
  var param = req.param('param');
  param = JSON.parse(param);
  if(param._id){
    report.updateReportById(param,function(result){
      res.send('' + result);
    });
  } else {
    report.creatReport(param,function(result){
      res.send('' + result);
    });
  }
});

router.get('/del', function(req, res, next) {
  var id = req.param('_id');
  report.delReportById(id,function(result) {
      res.send('' + result);
  })
});

module.exports = router;

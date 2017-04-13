var express = require('express');
var router = express.Router();
var chart = require(ALEIYE_PATH + 'com/aleiye/service/data/Chart');
var parser = require(ALEIYE_PATH + 'com/aleiye/service/platform/Parser');
var searcher = require(ALEIYE_PATH + 'com/aleiye/service/platform/Searcher');

router.get('/list', function(req, res, next) {
  chart.getAllChart(function(result){
    res.render('server/chart/list',{charts:result});
  });
});

router.get('/creat',function(req,res,next) {
  res.render('server/chart/add');
});

router.get('/edit',function(req,res,next) {
  var id = req.param('_id');
  chart.getChartById(id,function(result) {
    res.render('server/chart/edit',{params:result[0]});
  });
});

router.post('/query',function(req,res,next) {
  var queryModel = req.param('queryModel');
  queryModel = JSON.parse(queryModel);
  parser.qmParser(queryModel,function(newQM) {
    searcher.queryReport(newQM,function(qmResult) {
      res.send(parser.dataConvert(qmResult));
    });
  });
  // searcher.queryReport(index,queryStr,reportStr,function(result) {
  //   res.send(chart.dataConvert(result));
  // });
});

router.post('/save',function(req,res,next) {
  var param = req.param('param');
  param = JSON.parse(param);
  if(param._id){
    chart.updateChartById(param,function(result){
      res.send('' + result);
    });
  } else {
    chart.saveChart(param,function(result){
      res.send('' + result);
    });
  }
});

router.get('/del', function(req, res, next) {
  var id = req.param('_id');
  chart.delChartById(id,function(result) {
      res.send('' + result);
  })
});

module.exports = router;

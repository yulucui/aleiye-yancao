var express = require('express');
var router = express.Router();
var chart = require(ALEIYE_PATH + 'com/aleiye/service/data/Chart');
var report = require(ALEIYE_PATH + 'com/aleiye/service/data/Report');
// var searcher = require(ALEIYE_PATH + 'com/aleiye/service/platform/Searcher');

router.get('/reports', function(req, res, next) {
    var user = req.session.User;
    if(user.userGrop == 1 || user.userGrop == 2){
        report.getAllReport(function(result){
            res.render('server/justwatch/reports',{reports:result});
        });
    }
    report.getReportsByIds(user.reports,function(result) {
        res.render('server/justwatch/reports',{reports:result});
    })
});

router.get('/charts', function(req, res, next) {
    var id = req.param('_id');
    report.getReportById(id,function(result) {
        res.render('server/justwatch/charts',{report:result[0]});
    })
});

module.exports = router;

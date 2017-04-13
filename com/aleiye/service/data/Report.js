/**
 * Created by yulucui on 16/8/25.
 */
var reportDao = require(ALEIYE_PATH + 'com/aleiye/dao/data/ReportDao');

var report = {
    getAllReport: function(callback) {
        reportDao.getAllReport(function(result) {
            callback(result);
        });
    },
    creatReport: function(param,callback) {
        reportDao.creatReport(param,function(result) {
            callback(result);
        });
    },
    updateReportById: function(param,callback) {
        reportDao.updateReportById(param,function(result) {
            callback(result);
        });
    },
    delReportById: function(id,callback) {
        reportDao.delReportById(id,function(result) {
            callback(result);
        });
    },
    getReportById: function(id,callback) {
        reportDao.getReportById(id,function(result) {
            callback(result);
        });
    },
    getReportsByIds: function(ids,callback) {
        reportDao.getReportsByIds(ids,function(result) {
            callback(result);
        });
    }
}

module.exports = report;
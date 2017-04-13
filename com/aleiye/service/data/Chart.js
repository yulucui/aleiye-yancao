/**
 * Created by yulucui on 16/8/25.
 */
var chartDao = require(ALEIYE_PATH + 'com/aleiye/dao/data/ChartDao');

function dataConvert(objData) {

}

var chart = {
    getAllChart: function(callback) {
        chartDao.getAllChart(function(result) {
            callback(result);
        });
    },
    getChartById: function(id,callback) {
        chartDao.getChartById(id,function(result) {
            callback(result);
        });
    },
    saveChart: function(data,callback) {
        chartDao.saveChart(data,function(result) {
            callback(result);
        });
    },
    updateChartById: function(data,callback) {
        chartDao.updateChartById(data,function(result) {
            callback(result);
        });
    },
    delChartById: function (id,callback) {
        chartDao.delChartById(id,function(result) {
            callback(result);
        })
    },
    getChartsByIds: function(ids,callback) {
        chartDao.getChartsByIds(ids,function(result) {
            callback(result);
        });
    }
}

module.exports = chart;
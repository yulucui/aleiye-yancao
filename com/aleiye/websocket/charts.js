/**
 * Created by yulucui on 16/8/30.
 */
var async = require('async');
var chart = require(ALEIYE_PATH + 'com/aleiye/service/data/Chart');
var parser = require(ALEIYE_PATH + 'com/aleiye/service/platform/Parser');
var searcher = require(ALEIYE_PATH + 'com/aleiye/service/platform/Searcher');

var wsListener = function(server) {
    var io = require('socket.io')(server);
    io.on('connection',function(socket) {
        socket.on('get charts',function(ids) {
            chart.getChartsByIds(ids,function(charts){
                async.each(charts,function(chart) {
                    parser.qmParser(chart.queryModel,function(qm) {
                        searcher.queryReport(qm,function(result) {
                            chart.data = parser.dataConvert(result);
                            socket.emit('showChart',chart);
                        })
                    })
                });
            })
        });
    })
};

module.exports = wsListener;
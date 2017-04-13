/**
 * Created by yulucui on 16/8/24.
 */
var mongo = require('mongodb');
// var mongoClient = mongo.MongoClient;
var ObjectID = mongo.ObjectID;
var systemConf = require(ALEIYE_PATH + 'config/SystemConf');
var dbConn = require('../base/MongoConnBase');
// var systemConf = require('../../../../' + 'config/SystemConf');
var chartDao = function () {

    var url = ALEIYE_CONFIG.mongo.url;
    // var url = 'mongodb://10.0.1.81:27017/aleiye_report';
    function mongoConn(callBack) {
        dbConn(callBack);
    }

    return {
        saveChart: function (data,callback) {
            mongoConn(function(db){
                var chartsCollection = db
                    .collection(systemConf.collections.charts);
                chartsCollection.insert(data,function(err,result) {
                    if(err){
                        ALEIYE_LOG.info('Error:' + err);
                        return ;
                    }
                    callback(result.result.n);
                    db.close();
                })
            });
        },
        delChartById: function (id,callback) {
            mongoConn(function(db){
                var chartsCollection = db
                    .collection(systemConf.collections.charts);
                var param = {_id:ObjectID(id)};
                chartsCollection.remove(param,function(err,result) {
                    if(err){
                        ALEIYE_LOG.info('Error:' + err);
                        return ;
                    }
                    callback(result.result.n);
                    db.close();
                })
            });
        },
        updateChartById: function (data,callback) {
            mongoConn(function(db){
                var chartsCollection = db
                    .collection(systemConf.collections.charts);
                var param = {_id: ObjectID(data._id)};
                delete data._id;
                chartsCollection.update(param,{$set:data},function(err,result) {
                    if(err){
                        ALEIYE_LOG.info('Error:' + err);
                        return ;
                    }
                    callback(result.result.n);
                    db.close();
                })
            });
        },
        getAllChart: function (callback) {
            mongoConn(function (db) {
                var chartsCollection = db
                    .collection(systemConf.collections.charts);
                chartsCollection.find({}).toArray(function (err,result) {
                    if(err){
                        ALEIYE_LOG.info('Error:' + err);
                        return ;
                    }
                    callback(result);
                    db.close();
                });
            })
        },
        getChartById: function (id,callback) {
            mongoConn(function (db) {
                var chartsCollection = db
                    .collection(systemConf.collections.charts);
                var param = {_id:ObjectID(id)}
                chartsCollection.find(param).toArray(function (err,result) {
                    if(err){
                        ALEIYE_LOG.info('Error:' + err);
                        return ;
                    }
                    callback(result);
                    db.close();
                });
            })
        },
        getChartsByIds: function (ids,callback) {
            mongoConn(function(db){
                var chartsCollection = db
                    .collection(systemConf.collections.charts);
                var param = {$or:[]}
                for(var i in ids){
                    param.$or.push({_id:ObjectID(ids[i])});
                }
                chartsCollection.find(param).toArray(function(err,result) {
                    if(err){
                        ALEIYE_LOG.info('Error:' + err);
                        return ;
                    }
                    callback(result);
                    db.close();
                });
            });
        }
    }
}

module.exports = chartDao();
/**
 * Created by yulucui on 16/8/24.
 */
var mongo = require('mongodb');
// var mongoClient = mongo.MongoClient;
var ObjectID = mongo.ObjectID;
var systemConf = require(ALEIYE_PATH + 'config/SystemConf');
var dbConn = require('../base/MongoConnBase');
// var systemConf = require('../../../../' + 'config/SystemConf');
var reportDao = function () {

    var url = ALEIYE_CONFIG.mongo.url;
    // var url = 'mongodb://10.0.1.81:27017/aleiye_report';
    function mongoConn(callBack) {
        dbConn(callBack);
    }

    return {
        creatReport: function (data,callBack) {
            mongoConn(function(db){
                var reportCollection = db
                    .collection(systemConf.collections.reports);
                reportCollection.insert(data,function(err,result) {
                    if(err){
                        ALEIYE_LOG.info('Error:' + err);
                        return ;
                    }
                    callBack(result.result.n);
                    db.close();
                })
            });
        },
        delReportById: function (id,callBack) {
            mongoConn(function(db){
                var reportCollection = db
                    .collection(systemConf.collections.reports);
                var param = {_id:ObjectID(id)};
                reportCollection.remove(param,function(err,result) {
                    if(err){
                        ALEIYE_LOG.info('Error:' + err);
                        return ;
                    }
                    callBack(result.result.n);
                    db.close();
                })
            });
        },
        updateReportById: function (data,callBack) {
            mongoConn(function(db){
                var reportCollection = db
                    .collection(systemConf.collections.reports);
                var param = {_id: ObjectID(data._id)};
                delete data._id;
                reportCollection.update(param,{$set:data},function(err,result) {
                    if(err){
                        ALEIYE_LOG.info('Error:' + err);
                        return ;
                    }
                    callBack(result.result.n);
                    db.close();
                })
            });
        },
        getAllReport: function (callBack) {
            mongoConn(function (db) {
                var reportCollection = db
                    .collection(systemConf.collections.reports);
                reportCollection.find({}).toArray(function (err,result) {
                    if(err){
                        ALEIYE_LOG.info('Error:' + err);
                        return ;
                    }
                    callBack(result);
                    db.close();
                });
            })
        },
        getReportById: function (id,callBack) {
            mongoConn(function (db) {
                var reportCollection = db
                    .collection(systemConf.collections.reports);
                var param = {_id:ObjectID(id)}
                reportCollection.find(param).toArray(function (err,result) {
                    if(err){
                        ALEIYE_LOG.info('Error:' + err);
                        return ;
                    }
                    callBack(result);
                    db.close();
                });
            })
        },
        getReportsByIds: function (ids,callback) {
            mongoConn(function(db){
                var reportCollection = db
                    .collection(systemConf.collections.reports);
                var param = {$or:[]}
                for(var i in ids){
                    param.$or.push({_id:ObjectID(ids[i])});
                }
                reportCollection.find(param).toArray(function(err,result) {
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

module.exports = reportDao();
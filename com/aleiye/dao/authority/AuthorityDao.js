/**
 * Created by yulucui on 16/8/23.
 */
var mongo = require('mongodb');
// var mongoClient = mongo.MongoClient;
var ObjectID = mongo.ObjectID;
var crypto = require('crypto');
var systemConf = require(ALEIYE_PATH + 'config/SystemConf');
var dbConn = require('../base/MongoConnBase');
// var systemConf = require('../../../../' + 'config/SystemConf');
var authorityDao = function () {

    // var url = ALEIYE_CONFIG.mongo.url;
    // var url = 'mongodb://10.0.1.81:27017/aleiye_report';
    function mongoConn(callBack) {
        dbConn(callBack);
    }

    return {
        login: function (username,password,callback) {
            //密码加密
            var md5 = crypto.createHash('md5');
            password = md5
                .update(password)
                .digest('hex');
            mongoConn(function(db){
                var userInfoCollection = db
                    .collection(systemConf.collections.sys_user_info);
                var param = {username:username,password:password}
                userInfoCollection.find(param).toArray(function(err,result) {
                    if(err){
                        ALEIYE_LOG.info('Error:' + err);
                        return ;
                    }
                    callback(result);
                    db.close();
                });
            });
        },
        creatUser: function (userParam,callback) {
            mongoConn(function(db){
                var userInfoCollection = db
                    .collection(systemConf.collections.sys_user_info);
                var userp = {username:userParam.username}
                userInfoCollection.find(userp).toArray(function(err,users) {
                    if(users && users.length){
                        callback(-1);
                    } else {
                        //密码加密
                        var md5 = crypto.createHash('md5');
                        userParam.password = md5
                            .update(userParam.password)
                            .digest('hex');
                        //添加默认权限
                        userParam.resources = [6];
                        userInfoCollection.insert(userParam,function(err,result) {
                            if(err){
                                ALEIYE_LOG.info('Error:' + err);
                                return ;
                            }
                            callback(result.result.n);
                            db.close();
                        });
                    }
                });
            });
        },
        updateUser: function (userParam,callback) {
            mongoConn(function(db){
                var userInfoCollection = db
                    .collection(systemConf.collections.sys_user_info);
                var id = userParam._id;
                var idParam = {_id: ObjectID(id)};
                delete userParam._id;
                userInfoCollection.update(idParam,{$set: userParam},function(err,result) {
                    if(err){
                        ALEIYE_LOG.info('Error:' + err);
                        return ;
                    }
                    callback(result.result.n);
                    db.close();
                });
            });
        },
        delUser: function (id,callback) {
            mongoConn(function(db){
                var userInfoCollection = db
                    .collection(systemConf.collections.sys_user_info);
                var param = {_id:ObjectID(id)}
                userInfoCollection.remove(param,function(err,result) {
                    if(err){
                        ALEIYE_LOG.info('Error:' + err);
                        return ;
                    }
                    callback(result.result.n);
                    db.close();
                });
            });
        },
        // editUser: function (userParam,callback) {
        //     mongoConn(function(db){
        //         var userInfoCollection = db
        //             .collection(systemConf.collections.sys_user_info);
        //         var param = {_id:ObjectID(userParam._id)}
        //         userInfoCollection.update(param,userParam,function(err,result) {
        //             if(err){
        //                 ALEIYE_LOG.info('Error:' + err);
        //                 return ;
        //             }
        //             callback(result.result.n);
        //             db.close();
        //         });
        //     });
        // },
        getAllUser: function (callback) {
            mongoConn(function(db){
                var userInfoCollection = db
                    .collection(systemConf.collections.sys_user_info);
                userInfoCollection.find({}).toArray(function(err,result) {
                    if(err){
                        ALEIYE_LOG.info('Error:' + err);
                        return ;
                    }
                    //不显示密码
                    for(i in result){
                        delete result[i]['password'];
                    }
                    callback(result);
                    db.close();
                });
            });
        },
        getUserById: function (id,callback) {
            mongoConn(function(db){
                var userInfoCollection = db
                    .collection(systemConf.collections.sys_user_info);
                var param = {_id:ObjectID(id)}
                userInfoCollection.find(param).toArray(function(err,result) {
                    if(err){
                        ALEIYE_LOG.info('Error:' + err);
                        return ;
                    }
                    result = result[0];
                    //不显示密码
                    delete result['password'];
                    callback(result);
                    db.close();
                });
            });
        },
        getAuthoritysByIds: function (ids,callback) {
            mongoConn(function(db){
                var sysResourceCollection = db
                    .collection(systemConf.collections.sys_resource);
                var param = {$or:[]}
                for(var i in ids){
                    param.$or.push({id:ids[i]});
                }
                sysResourceCollection.find(param).toArray(function(err,result) {
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

module.exports = authorityDao();
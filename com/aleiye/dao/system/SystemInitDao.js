/**
 * Created by yulucui on 16/8/22.
 */
var systemConf = require(ALEIYE_PATH + 'config/SystemConf');
// var mongoClient = require('mongodb').MongoClient;
var crypto = require('crypto');
// var url = ALEIYE_CONFIG.mongo.url;
var dbConn = require('../base/MongoConnBase');

function mongoConn(callBack) {
    dbConn(callBack);
}

function initSystem(db){
    ALEIYE_LOG.info('系统初始化...');
    var sysResourceCollection = db.collection(systemConf.collections.sys_resource);
    var userInfoCollection = db.collection(systemConf.collections.sys_user_info);
    //初始化系统资源
    sysResourceCollection.insert(systemConf.resources,function(err,result){
        if(err){
            ALEIYE_LOG.info('Error:' + err);
            return ;
        } else {
            ALEIYE_LOG.info('系统资源初始化完成');
            //加载系统资源到全局变量global.CATCH_RESOURCE中
            loadResource(db);
            //用户密码加密
            for(var i in systemConf.users){
                var md5 = crypto.createHash('md5');
                var password = md5
                    .update(systemConf.users[i].password)
                    .digest('hex');
                systemConf.users[i].password = password;
            }
            //初始化管理员用户
            userInfoCollection.insert(systemConf.users,function(err,result){
                if(err){
                    ALEIYE_LOG.info('Error:' + err);
                    return ;
                }
                ALEIYE_LOG.info('管理员用户初始化完成');
                db.close();
            });
        }
    });
}

function loadResource(db) {
    var sysResourceCollection = db.collection(systemConf.collections.sys_resource);
    var query = {}
    sysResourceCollection.find(query).toArray(function(err,result){
        if(err){
            ALEIYE_LOG.info('Error:' + err);
            return ;
        }
        CACHE_RESOURCE = result;
    });
}

module.exports = function(){
    mongoConn(function(db){
        var collection = db.collection(systemConf.collections.sys_user_info);
        var query = {}
        collection.find(query).toArray(function (err,result) {
            if(err){
                ALEIYE_LOG.info('Error:' + err);
                return ;
            }
            if(!result.length){
                initSystem(db);
            }
            else{
                //加载系统资源到全局变量global.CATCH_RESOURCE中
                loadResource(db);
                db.close();
            }
        });
    });
};

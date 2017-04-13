/**
 * Created by yulucui on 17/1/16.
 */
var mongo = require('mongodb');
var mongoClient = mongo.MongoClient;
module.exports = function(callBack) {
    var url = ALEIYE_CONFIG.mongo.url,
        auth = ALEIYE_CONFIG.mongo.auth,
        username = ALEIYE_CONFIG.mongo.username,
        password = ALEIYE_CONFIG.mongo.password;
    if(auth){
        mongoClient.connect(url,function (err,db) {
            var adminDb = db.admin();
            adminDb.authenticate(username,password,function(err,result) {
                if(err){
                    ALEIYE_LOG.info('Error:' + err);
                    return ;
                }
                callBack(db);
            });
        });
    } else {
        mongoClient.connect(url,function (err,db) {
            if(err){
                ALEIYE_LOG.info('Error:' + err);
                return ;
            }
            callBack(db);
        });
    }
}
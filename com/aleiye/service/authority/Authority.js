/**
 * Created by yulucui on 16/8/23.
 */
var authorityDao = require(ALEIYE_PATH + 'com/aleiye/dao/authority/AuthorityDao');
// var authorityDao = require('../../../../' + 'com/aleiye/dao/authority/AuthorityDao');
var authService = {
    login: function(username,password,callback){
        authorityDao.login(username,password,function(result) {
            callback(result);
        })
    },
    getAuthoritysByIds: function (ids,callback) {
        authorityDao.getAuthoritysByIds(ids,function(result) {
            callback(result);
        });
    },
    getAllUser: function(callback) {
        authorityDao.getAllUser(function(result) {
            callback(result);
        });
    },
    creatUser: function(param,callback) {
        authorityDao.creatUser(param,function(result) {
            callback(result);
        });
    },
    updateUser: function(param,callback) {
        authorityDao.updateUser(param,function(result) {
            callback(result);
        });
    },
    delUser: function(id,callback) {
        authorityDao.delUser(id,function(result) {
            callback(result);
        });
    },
    getUserById: function(id,callback) {
        authorityDao.getUserById(id,function(result) {
            callback(result);
        });
    }
}

module.exports = authService;
// authService.login('dataManager','e10adc3949ba59abbe56e057f20f883e',function (result) {
//     console.log(result);
// });
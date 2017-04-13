/**
 * Created by yulucui on 16/8/22.
 */
var globalSet = function(){
    //项目跟路径
    global.ALEIYE_PATH = process.cwd() + '/';
    //配置信息
    global.ALEIYE_CONFIG = require(ALEIYE_PATH + '/config/Config');
    //log
    var log4js = require('log4js');
    log4js.configure(global.ALEIYE_CONFIG.log4js.configure);
    global.ALEIYE_LOG = log4js.getLogger('normal');
    global.ALEIYE_LOG.setLevel(global.ALEIYE_CONFIG.log4js.level);
    //系统资源
    global.CACHE_RESOURCE = [];

}

module.exports = globalSet;
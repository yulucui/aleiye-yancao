/**
 * Created by yulucui on 16/8/22.
 */
var crypto = require('crypto');
var md5 = crypto.createHash('md5');
var config = {
    mongo: {
        url: 'mongodb://10.0.1.81:27017/aleiye_report',
        auth: true,
        username: 'aleiye',
        password: 'cdewsxzaq321'
    },
    log4js: {
        level: 'INFO',
        configure: {
            appenders: [
                { type: 'console' }, //控制台输出
                {
                    type: 'file', //文件输出
                    filename: 'logs/console.log',
                    maxLogSize: 1024,
                    backups:3,
                    category: 'normal'
                }
            ]
        }
    },
    thrift: {
        host:'10.0.1.76',
        port:6060
    },
    platform: {
        userId: md5.update('51').digest('hex')
    }
}

module.exports = config;
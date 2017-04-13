/**
 * Created by yulucui on 16/8/23.
 */
var crypto = require('crypto');
var md5 = crypto.createHash('md5');
var password = md5.update('123456').digest('hex');
console.log(password);

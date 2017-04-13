/**
 * Created by yulucui on 16/9/2.
 */
var moment = require('moment');

var dateParser = function(inDate) {

    function toTimestamp(date) {
        return moment(date).format('x');
    }

    function rd2date(inDate) {
        var symbol = inDate.replace(/[^+-]/ig,""),
            num = inDate.replace(/[^0-9.]/ig,""),
            rd = inDate.replace(/[^a-zA-Z]/ig,""),
            snum = symbol + num;
        return moment()
            .startOf(rd)
            .add(snum,rd);
    }

    return function (inDate) {
        if(moment(inDate).isValid()){    //如果是日期格式>转成时间戳
            return toTimestamp(inDate);
        } else {                        //否则判断是否包含字母
            var isRd = /[a-zA-Z]/ig.test(inDate);
            if(!isRd){                  //包含字母>转成数字>转时间戳
                return toTimestamp(parseInt(inDate));
            } else {                    //不包含>相对时间解析>转时间戳
                var date = rd2date(inDate);
                return toTimestamp(date);
            }
        }
    }
}

module.exports = dateParser;
/**
 * Created by yulucui on 16/8/31.
 */
var model = require('./gen-nodejs/ESmodel_types');
var dateParser = require('./DateParser')();

var parser = function() {

    function qDateParse(qDate) {
        var start = qDate.indexOf('[')+1,
            end = qDate.indexOf(']'),
            dateArr = qDate
                .substring(start,end)
                .split('TO');
        var rdFrom = dateArr[0].trim(),
            rdTo = dateArr[1].trim();
        var newFrom = dateParser(rdFrom),
            newTo = dateParser(rdTo);

        return qDate
            .replace(rdFrom,newFrom)
            .replace(rdTo,newTo);
    }

    return {
        qmParser: function(queryModel,callback) {

            if(queryModel.queryDate && queryModel.queryDate != '')
                queryModel.queryDate = qDateParse(queryModel.queryDate);

            if(queryModel.queryDate && queryModel.queryDate != '')
                queryModel.queryStr = queryModel.queryDate + ' AND ' + queryModel.queryStr;

            if(queryModel.querySpan && queryModel.querySpan != '')
                queryModel.queryStr = queryModel.queryStr + ' ' + queryModel.querySpan;

            var userId = ALEIYE_CONFIG.platform.userId;

            var qm = new model.TQueryModel();
            qm.isProcessTime = queryModel.isProcessTime;
            qm.queryString = queryModel.queryStr;
            qm.a_from = queryModel.a_from;
            qm.a_to = queryModel.a_to;
            // qm.userId = userId;
            callback(qm);
        },
        dataConvert: function(qmResult) {
            var newRsult = [];
            if(qmResult && qmResult.datas && qmResult.header){
                newRsult = qmResult.datas;
                newRsult.unshift(qmResult.header);
            }
            // var newResult = [["d_outTime","brandnName","count_brandnName"],["201501","芙蓉王(硬)","3258.0"],["201501","黄鹤楼(软蓝)","1250.0"],["201502","芙蓉王(硬)","1964.0"],["201502","黄鹤楼(软蓝)","590.0"],["201503","芙蓉王(硬)","1930.0"],["201503","黄鹤楼(软蓝)","690.0"],["201504","芙蓉王(硬)","1815.0"],["201504","黄鹤楼(软蓝)","960.0"],["201505","芙蓉王(硬)","2640.0"],["201505","黄鹤楼(软蓝)","1210.0"],["201506","芙蓉王(硬)","2440.0"],["201506","黄鹤楼(软蓝)","1070.0"],["201507","芙蓉王(硬)","2444.0"],["201507","黄鹤楼(软蓝)","1579.0"],["201508","芙蓉王(硬)","1870.0"],["201508","黄鹤楼(软蓝)","1240.0"],["201509","芙蓉王(硬)","3594.0"],["201509","黄鹤楼(软蓝)","1082.0"],["201510","黄鹤楼(软蓝)","1289.0"],["201510","芙蓉王(硬)","773.0"],["201511","芙蓉王(硬)","1827.0"],["201511","黄鹤楼(软蓝)","1044.0"],["201512","芙蓉王(硬)","1341.0"],["201512","黄鹤楼(软蓝)","359.0"],["201601","芙蓉王(硬)","2820.0"],["201601","黄鹤楼(软蓝)","1987.0"],["201602","芙蓉王(硬)","1180.0"],["201602","黄鹤楼(软蓝)","538.0"],["201603","芙蓉王(硬)","1641.0"],["201603","黄鹤楼(软蓝)","1138.0"],["201604","芙蓉王(硬)","1557.0"],["201604","黄鹤楼(软蓝)","1059.0"],["201605","芙蓉王(硬)","1709.0"],["201605","黄鹤楼(软蓝)","1164.0"],["201606","芙蓉王(硬)","1763.0"],["201606","黄鹤楼(软蓝)","1157.0"],["201607","芙蓉王(硬)","1585.0"],["201607","黄鹤楼(软蓝)","1042.0"]];
            return newRsult;
        }
    }
}

module.exports = parser();
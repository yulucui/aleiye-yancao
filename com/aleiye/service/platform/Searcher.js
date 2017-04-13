/**
 * Created by yulucui on 16/8/25.
 */
var thrift = require('thrift');
var TFramedTransport = require('thrift/lib/nodejs/lib/thrift/transport').TFramedTransport;
var TBinaryProtocol = require('thrift/lib/nodejs/lib/thrift/protocol').TBinaryProtocol;

var model = require('./gen-nodejs/ESmodel_types');
var SearchDataService = require('./gen-nodejs/SearchData');

var connection = thrift.createConnection(
    ALEIYE_CONFIG.thrift.host,
    ALEIYE_CONFIG.thrift.port,
    {
        transport : TFramedTransport,
        protocol : TBinaryProtocol
    }
);

var multiplexer = new thrift.Multiplexer();
var client =  multiplexer.createClient("com.aleiye.client.service.search.SearchData",SearchDataService,connection);

var searcher = {
    query: function(queryModel,callback) {
        // var qm = new model.TQueryModel();
        // qm.queryString = '*:*';
        // qm.a_from = new Date().getTime() - 31536000000;
        // qm.a_to = new Date().getTime();
        client.query(queryModel,function (err,res) {
            if(err){
                ALEIYE_LOG.info(err);
                return ;
            }
            callback(res);
        });
    },
    queryReport: function(queryModel,callback) {

        client.queryReport(queryModel,function (err,res) {
            if(err){
                ALEIYE_LOG.info(err);
                return ;
            }
            callback(res);
        });
    }
}

module.exports = searcher;
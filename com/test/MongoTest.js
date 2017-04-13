var mongo = require('mongodb');
var mongoClient = mongo.MongoClient;
var ObjectID = mongo.ObjectID;

mongoClient.connect('mongodb://localhost/aleiye_report',function (err,db) {
    if(err){
        console.info('Error:' + err);
        return ;
    }
    var collection = db.collection('sys_user_info');
    find(collection);
    db.close();
});

function insert(collection) {
    var data = {"creatTime":"2016-08-25T10:32:50.786Z","queryParam":{"index":"yancao-cs","queryStr":"*:*","reportStr":""},"chartParam":{"title":"a","xAxis":"b","yAxis":"c"},"pivotParam":{"derivedAttributes":{},"aggregators":{},"renderers":{},"hiddenAttributes":[],"menuLimit":200,"cols":[],"rows":[],"vals":[],"exclusions":{},"inclusions":{},"unusedAttrsVertical":85,"autoSortUnusedAttrs":false,"rendererOptions":{"localeStrings":{"renderError":"An error occurred rendering the PivotTable results.","computeError":"An error occurred computing the PivotTable results.","uiRenderError":"An error occurred rendering the PivotTable UI.","selectAll":"Select All","selectNone":"Select None","tooMany":"(too many to list)","filterResults":"Filter results","totals":"Totals","vs":"vs","by":"by"}},"onRefresh":null,"localeStrings":{"renderError":"An error occurred rendering the PivotTable results.","computeError":"An error occurred computing the PivotTable results.","uiRenderError":"An error occurred rendering the PivotTable UI.","selectAll":"Select All","selectNone":"Select None","tooMany":"(too many to list)","filterResults":"Filter results","totals":"Totals","vs":"vs","by":"by"},"inclusionsInfo":{},"aggregatorName":"总数","rendererName":"Table"}};
    collection.insert(data,function(err,result){
        console.log(result);
    });
}

function find(collection) {
    // var param = {_id:ObjectID('57bd0278a86253132e56353f')}
    // var param = {$or:[{id:1},{id:2}]}
    var param = {username:'test'};
    collection.find(param).toArray(function (err,result) {
        console.log(result);
    });
}

function update(collection) {
    var param = {_id: objectID('57bd0278a86253132e56353f')}
    var data = {$set:{name:'ddd',age:'1234'}}
    collection.update(param,data,function (err,result) {
        console.log(result);
    })
}

function remove(collection) {
    var param = {name:'aaa'}
    collection.remove(param,function (err,result) {
        console.log(result);
    })
}
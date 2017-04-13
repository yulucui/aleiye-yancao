/**
 * Created by yulucui on 16/8/30.
 */
$(function() {
    var socket = io();
    var charts = $('#report').attr('charts');
    var ids = charts.split(',');
    socket.emit('get charts',ids);
    socket.on('showChart',function (chart) {
        var templet = $('#templet .chart_templet').clone();
        $(templet).attr('id',chart._id);
        $('#report').append(templet);
        $('#' + chart._id).find('.title').text(chart.chartParam.title.text);
        $('#' + chart._id).find('.remark').text(chart.remark);
        $('#' + chart._id)
            .find('.chart')
            .data('pivotUIOptions',chart.pivotParam)
            .pivotUI(
                chart.data,
                {},
                null,
                null,
                chart.chartParam,
                true
            );
    });
});
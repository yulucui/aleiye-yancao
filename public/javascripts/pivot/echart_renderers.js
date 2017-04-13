(function () {
    var callWithJQuery;

    callWithJQuery = function (pivotModule) {
        if (typeof exports === "object" && typeof module === "object") {
            return pivotModule(require("jquery"));
        } else if (typeof define === "function" && define.amd) {
            return define(["jquery"], pivotModule);
        } else {
            return pivotModule(jQuery);
        }
    };

    callWithJQuery(function ($) {
        var def = {
            title: {
                text: '',
                left: 'center'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                top: 'bottom',
                data: []
            },
            grid: {
                left: '3%',
                right: '10%',
                bottom: '5%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    dataView: {readOnly: false},
                    magicType: {type: ['line', 'bar','stack','tiled']},
                    restore: {},
                    saveAsImage: {}
                }
            },
            series: []
        };
        function lineOrBar(pivotData, opts, ecOpts, type) {

            var mediaOption,
                boundaryGap = type == 'bar' ? true : false,
                lineOpt = {
                    legend: {data: []},
                    xAxis: {
                        axisLabel:{
                            interval:0,
                        },
                        type: 'category',
                        boundaryGap: boundaryGap,
                        data: []
                    },
                    series: []
                },
                tree;

            if ($.isEmptyObject(pivotData.tree)) {
                //一个序列
                tree = {};
                tree[pivotData.aggregatorName] = pivotData.colTotals;
            } else {
                //多序列
                tree = pivotData.tree;
            };
            for(var i in pivotData.colKeys){
                lineOpt.xAxis.data.push(pivotData.colKeys[i][0]);
            }
            for (var legendName in tree) {
                var series = {
                    name: '',
                    type: type,
                    smooth: true,
                    markPoint: {
                        data: [
                            {type: 'max', name: '最大值'},
                            {type: 'min', name: '最小值'}
                        ]
                    },
                    lineStyle: {
                        normal: {
                            width: 3,
                            shadowColor: 'rgba(0,0,0,0.4)',
                            shadowBlur: 10,
                            shadowOffsetY: 10,
                        }
                    },
                    data: []
                }
                lineOpt.legend.data.push(legendName);
                series.name = legendName;
                for (var xName in tree[legendName]) {
                    // if ($.inArray(xName, lineOpt.xAxis.data) == -1) {
                    //     lineOpt.xAxis.data.push(xName);
                    // }
                    var agg = '';
                    if (tree[legendName][xName]['sum'] != undefined)
                        agg = 'sum';
                    else if (tree[legendName][xName]['count'] != undefined)
                        agg = 'count';
                    series.data.push(tree[legendName][xName][agg]);
                }
                lineOpt.series.push(series);
            }
            lineOpt = $.extend(true, {}, def, lineOpt, ecOpts);
            mediaOption = {
                baseOption: lineOpt,
                media: [
                    {
                        query: {
                            maxWidth: 1000               // 当容器宽度小于 1000 时。
                        },
                        option: {
                            xAxis: {
                                axisLabel:{rotate:320}
                            },
                            grid: {
                                bottom: '10%'
                            }
                        }
                    },
                    {
                        query: {
                            maxWidth: 500               // 当容器宽度小于 500 时。
                        },
                        option: {
                            legend: {
                                right: 10,              // legend 放置在右侧中间。
                                top: '15%',
                                orient: 'vertical'      // 纵向布局。
                            },
                            toolbox: {show: false}
                        }
                    }
                ]
            }
            return mediaOption;
        }

        function pie(pivotData, opts, ecOpts) {
            var p = pivotData.colTotals;
            var seriesName = pivotData.aggregatorName;
            var pieOpt = {
                legend: {data: []},
                series: [{
                    name: seriesName,
                    type: 'pie',
                    smooth: true,
                    data: []
                }]
            };
            for(var name in p){
                pieOpt.legend.data.push(name);
                pieOpt.series[0].data.push({
                    value:p[name].sum,
                    name:name
                });
            }
            pieOpt = $.extend(true, {}, def, pieOpt, ecOpts);
            return pieOpt;
        }

        return $.echart_renderers = {
            "EC_Line": function (pivotData, opts, ecOpts) {
                return lineOrBar(pivotData, opts, ecOpts, 'line');
            },
            "EC_Bar": function (pivotData, opts, ecOpts) {
                return lineOrBar(pivotData, opts, ecOpts, 'bar');
            },
            "EC_Pie": function (pivotData, opts, ecOpts) {
                var pieEcOption = {
                    title: {text: ecOpts.title.text}
                }
                return pie(pivotData, opts, pieEcOption);
            }
        };
    });

}).call(this);

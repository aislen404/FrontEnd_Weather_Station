/**
 * Created by Aislen404 on 7/5/17.
 */

var Charts = function () {

    return {

        initOtherCharts: function (label,idchart,data) {

            var plot = $.plot($("#chart_"+idchart), [{
                data: data,
                label: label
            }], {
                series: {
                    lines: {
                        show: true,
                        lineWidth: 2,
                        fill: true,
                        fillColor: {
                            colors: [{
                                opacity: 0.3
                            }, {
                                opacity: 0.01
                            }
                            ]
                        }
                    },
                    points: {
                        show: true
                    },
                    shadowSize: 5,
                    grow: { active: true, duration: 1500 }
                },
                grid: {
                    hoverable: true,
                    clickable: true,
                    tickColor: "#eee",
                    borderWidth: 0
                },
                colors: ["#FF22FF"],
                xaxis: {
                    mode: "time",
                    ticks: 10,
                    tickDecimals: 0,
                    timezone: "browser"
                },
                yaxis: {
                    ticks: 10,
                    tickDecimals: 0
                }
            });

            function showTooltip(x, y, contents) {
                $('<div id="tooltip">' + contents + '</div>').css({
                    position: 'absolute',
                    display: 'none',
                    top: y + 5,
                    left: x + 15,
                    border: '1px solid #333',
                    padding: '4px',
                    color: '#fff',
                    'border-radius': '3px',
                    'background-color': '#333',
                    opacity: 0.80
                }).appendTo("body").fadeIn(200);
            }

            var previousPoint = null;
            $(".chart").bind("plothover", function (event, pos, item) {
                $("#x").text(pos.x.toFixed(2));
                $("#y").text(pos.y.toFixed(2));

                if (item) {
                    if (previousPoint != item.dataIndex) {
                        previousPoint = item.dataIndex;

                        $("#tooltip").remove();
                        var x = item.datapoint[0].toFixed(2),
                            y = item.datapoint[1].toFixed(2);

                        showTooltip(item.pageX, item.pageY, Math.round(y)+' '+item.series.label);
                    }
                } else {
                    $("#tooltip").remove();
                    previousPoint = null;
                }
            });

        }
    };

}();

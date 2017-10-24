window.onload = function() {
Highcharts.chart('container', {
    chart: {
        type: 'heatmap',
        spacing : [0,100,0,0],
        backgroundColor: "",
    },

    title: {
        text: null
    },
    exporting:{
        enabled:false
    },

    colorAxis: {
        min: 0,
        // minColor: Highcharts.getOptions().colors[8],
        maxColor: Highcharts.getOptions().colors[1]
    },

    tooltip: {
        enabled: true,
        backgroundColor: "transparent",
        borderWidth: 0,
        shadow: false,
        useHTML: true,
        positioner: function () {
            return { x: 100, y: 20 };
        },
        formatter: function () {
            return '<b>' + this.series.xAxis.categories[this.point.x] + ' <br><b>' +
            this.point.value + '<br><b>' + this.series.yAxis.categories[this.point.y] + '</b>';
        }
    },

    yAxis: {
        categories: [ 'Lukas', 'Maria', 'Leon', 'Anna'],
        min: 0,
        gridLineWidth: 0,
        title: {
            text: null
        },
        labels:{
            enabled:false//default is true
        }
    },
    xAxis: {
        min: null,
        gridLineWidth: null,
        categories: ['Alexander','Alexander','Alexander','Alexander'],
        labels: {
            enabled: false
        },
        minorTickLength: 0,
        tickLength: 0
    },

    legend: {
        enabled: false
    },

    series: [{
        borderWidth: 0,
        data: [[0, 0, 100], [0, 1, 30], [0, 2, 0], [0, 3, 24], [1, 0, 92], [1, 1, 58], [1, 2, 78],
                [1, 3, 117], [2, 0, 35],[2, 1, 15], [2, 2, 123], [2, 3, 64], [3, 0, 10], [3, 1, 19],
                [3, 2, 8], [3, 3, 24]] }],
        credits:{
            enabled:false
        }
    });
}

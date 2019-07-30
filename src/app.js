// import * as c3 from 'c3';
// import '../node_modules/c3/c3.css'
import './app.css';

//./node_modules/.bin/webpack-cli src/app.js --output=build/build.js --module-bind 'css=style-loader!css-loader' -d -w

function genChartData(uptime, divid, xaxis, c_w, c_h, chartTitle) {
    const dates = [];
    const code = [];
    const ac_time = [];

    for (const x of uptime) {
        // const date = x.date.split('.')[0].replace('T',' ').replace(/-/g, ".");
        const date = x.date.split('.')[0].split('T')[0]
        // Date.parse(date);
        // console.log(Date.parse(x.date))
        // const date = x.date;
        let c;
        if (x.code == 408 || x.code == 404 || x.code == 301 || x.code == 302 || x.code == 502) {
            c = 199;
        } else if (x.code == 200 || x.code == 202) {
            c = 200;
        } else if (x.code == null) {
            c = 201;
        } else {
            c = x.code;
        }
        if (dates[dates.length - 1] != date) {
            // console.log(dates[dates.length-1] )
            dates.push(date);
            code.push(c);
            ac_time.push(x.access_time);
        }

    }
    dates.unshift('dates');
    code.unshift('Status');
    ac_time.unshift('Access Time');
    populateChart(dates, code, ac_time, divid, xaxis, c_w, c_h, chartTitle)
}

function populateChart(dates, code, ac_time, divid, xaxis, c_w, c_h, chartTitle) {
    const tickOptionsX = {
        // format: '%m-%d',
        rotate: 90,
        multiline: false,
        outer: false,
    }
    const tickOptionsY = {
        outer: false,
        tooltip: false,

    }
    const tickOptionsY2 = {
        outer: false,
        format: function (x) { return x % 1 === 0 ? x : ''; }
    }
    const lowResponseTime = '#ff8214',
        highResponseTime = '#7C151D',
        noInfoCaptured = '#cccccc',
        online = '#006b38',
        offline = '#d1350f';
    // console.log(xaxis)
    const chart = c3.generate({
        data: {
            // xFormat: '%Y-%m-%dT%H:%M:%S.%LZ',
            x: 'dates',

            columns: [
                code,
                ac_time,
                dates,
            ],
            types: {

                'Access Time': 'area',
                'Status': 'bar',
            },
            axes: {
                'Access Time': 'y',
                'Status': 'y2',
            },
            colors: {
                'Access Time': function (d) {
                    // if(d.value){
                    if (d.value >= 240) {
                        return highResponseTime;
                    } else {
                        return lowResponseTime;
                    };
                    // }
                },
                'Status': function (d) {
                    // if(d.value){
                    if (d.value == 200) {
                        return online;
                    } else if (d.value == 199) {
                        return offline;
                    } else {
                        return noInfoCaptured;
                    }
                },
                'Online': online,
                'Offline': offline,
                'No information captured': noInfoCaptured
                // 'Status': '#588147'
            },
            order: false,

        },
        bar: {
            width: {
                ratio: 1,
            }
        },
        size: {
            height: Number(c_h),
            width: Number(c_w),
        },
        title: {
            text: chartTitle,
        },
        axis: {
            y2: {
                show: false,
                tick: tickOptionsY2,
                max: 4000,
                inverted: false,
                padding: {
                    left: 0,
                },

            },
            y: {
                show: true,
                tick: tickOptionsY,
                min: 0,

                label: {
                    text: 'Access time in milliseconds',
                    position: 'outer-center'
                },

                // inverted:false,
                padding: {
                    bottom: 11,

                },

            },

            x: {
                type: 'category',
                // type : 'timeseries',
                tick: tickOptionsX,
                label: {
                    text: 'Dates',
                    position: 'outer-right'
                },
                padding: {
                    right: 2,

                }

            },

        },
        subchart: {
            show: false,
        },
        padding: {
            top: 0,
        },
        legend: {
            padding: 5,
            item: {
                tile: {
                    width: 15,
                    height: 2
                },
            },
            show: false,
            position: 'bottom',
        },
        bindto: '#' + divid,
        tooltip: {
            contents: function (d, defaultTitleFormat, defaultValueFormat, color) {


                let $$ = this, config = $$.config,

                    titleFormat = config.tooltip_format_title || defaultTitleFormat,
                    nameFormat = config.tooltip_format_name || function (name) { return name; },
                    valueFormat = config.tooltip_format_value || defaultValueFormat,
                    text, i, title, value, name, bgcolor, total = 0;

                for (i = 0; i < d.length; i++) {

                    total = total + d[i].value;
                    if (!(d[i] && (d[i].value || d[i].value === 0))) { continue; }

                    if (!text) {
                        title = titleFormat ? titleFormat(d[i].x) : d[i].x;
                        text = "<table class='" + $$.CLASS.tooltip + "'>" + (title || title === 0 ? "<tr><th colspan='2'>" + title + "</th></tr>" : "");
                    }


                    name = nameFormat(d[i].name, d[i].ratio, d[i].id, d[i].index);
                    value = valueFormat(d[i].value, d[i].ratio, d[i].id, d[i].index);
                    // console.log(name, value)
                    // bgcolor = $$.levelColor ? $$.levelColor(d[i].value) : color(d[i].id);
                    // bgcolor = $$.levelColor ? $$.levelColor(d[i].value) : d[i].value>160?'#FFD300' : '#588147';
                    if (name == 'Access Time') {

                        if (d[i].value >= 160) {
                            bgcolor = highResponseTime
                        } else {
                            bgcolor = lowResponseTime
                        };
                    } else {
                        if (d[i].value == 200) {
                            bgcolor = online
                        } else if (d[i].value == 199) {
                            bgcolor = offline
                        } else {
                            bgcolor = noInfoCaptured
                        };
                    };

                    text += "<tr class='" + $$.CLASS.tooltipName + "-" + d[i].id + "'>";
                    text += "<td class='name'><span style='background-color:" + bgcolor + "'></span>" + name + "</td>";

                    if (name == 'Access Time') {
                        text += "<td class='value'>" + value + "ms </td>";
                    }
                    else {
                        if (value == 200) {
                            text += "<td class='value'> Online </td>";
                        } else if (value == 199) {
                            text += "<td class='value'> Offline </td>";
                        } else if (value == 201) {
                            text += "<td class='value'> No information captured </td>";
                        } else {
                            text += "<td class='value'>" + value + "</td>";
                        }

                    }

                    text += "</tr>";
                }
                return text + "</table>";
            },
        }
    });

    d3.select('#'+divid).insert('div', '.chart').attr('class', 'oeb-legend')
    .insert('div','.chart').attr('class','legend-scale')
    .insert('ul','.chart').attr('class','legend-labels')
    
    .selectAll('span')

    .data(['Online','Offline','No information captured', 'Access Time'])
    .enter().append('li').html(function (id) { return id; }).append('span')
    .attr('data-id', function (id) { return id; })
    
    .each(function (id) {
        d3.select(this).style('background-color', chart.color(id));
    })
}


async function loadChart(elems) {

    // console.log(elems);
    if (elems === undefined) {
        elems = document.getElementsByClassName("opebuptime");
    }

    let i = 0;
    for (let y of elems) {
        try {
            i++;
            const dataId = y.getAttribute('data-id');
            const chartUrl = y.getAttribute('data-url');
            const mode = y.getAttribute('dev')
            let chartTitle = y.getAttribute('data-title');
            if (!chartTitle) {
                chartTitle = '';
            }
            let xaxis = y.getAttribute('data-xaxis');
            if (!xaxis) {
                xaxis = "false";
            }

            let c_w = y.getAttribute('data-w');
            if (c_w < 200 || c_w == 0 || !c_w) {
                c_w = null;
            }
            let c_h = y.getAttribute('data-h');
            if (c_h < 200 || c_h == 0 || !c_h) {
                c_h = null;
            }
            let limit = y.getAttribute('data-limit');
            if (!limit || limit < 5) {
                limit = 5;
            }
            const div = document.createElement("div");
            const divid = dataId + i;
            div.id = divid;
            y.appendChild(div)
            genChartData(await fetchUrl(chartUrl, limit, mode), divid, xaxis, c_w, c_h, chartTitle)

        } catch (err) {
            console.log('Internat error :' + err)
        }
    }
}
async function fetchUrl(url, limit, mode) {
    try {
        let base_url;
        if (mode != null) {
            base_url = "dev-openebench"
        } else {
            base_url = "openebench"
        }

        // console.log("https://openebench.bsc.es/monitor/rest/homepage/"+url+"?limit="+limit)
        let request = await fetch("https://" + base_url + ".bsc.es/monitor/rest/homepage/" + url + "?limit=" + limit)
        let result = await request.json();
        return result;

    }
    catch (err) {
        console.log(`Invalid Url Error: ${err.stack} `);
    }
}

export {
    loadChart
}
loadChart();
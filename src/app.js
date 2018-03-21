import * as d3 from 'd3-format';
import * as c3 from 'c3';
import * as style from '../node_modules/c3/c3.css';

//./node_modules/.bin/webpack-cli src/app.js --output=build/build.js --module-bind 'css=style-loader!css-loader' -d -w

async function fetchUrl(url) {
    try {
        let request = await fetch(url);
        let result = await request.text();
        return JSON.parse(result);
    }
    catch (err) {
        console.log(`Error: ${err.stack}`);
    }
}
function genChartData(uptime,chartName){
    const dates = [];
    const code = [];
    const ac_time = [];

    for(const x of uptime){
        
        dates.push(x.date.split('T')[0]);
        code.push(x.code);
        ac_time.push(x.access_time);
    }
    dates.unshift('dates');
    code.unshift('Status');
    ac_time.unshift('Access Time');
    console.log(dates, code , ac_time);
   populateChart(dates, code , ac_time , chartName)
}



function populateChart(dates, code , ac_time,chartName){
    const tickOptionsX = {
        fit: true,
        // format: "%e %b %y",
        outer: false,
    }
    const tickOptionsY = {
        outer: false,
        format: function(x) { return x % 1 === 0 ? x : ''; }
        
    }
    const tickOptionsY2 = {
        outer: false,
        format: d3.format('d'),
    }
    const chart = c3.generate({
        data: {
            x:'dates',
            columns:[
                dates,
                code,
                ac_time,
            ],
            types:{
                'Access Time': 'line',
                'Status': 'scatter',
            },
            axes:{
                'Status': 'y',
                'Access Time': 'y2',
            },
        },
        axis: {
            y2:{
                show: false,
                tick: tickOptionsY2,
                inverted: false,
                
            },
            y:{
                show: false,
                tick: tickOptionsY,
                min:0,
                max:400,
                inverted:true,
                padding:{
                    bottom:0,
                }
            },
            
            x:{
                type : 'timeseries',
                tick: tickOptionsX,
            },
            
        },
        grid: {
            y: {
                lines: [
                    {value: 400, text: 'offline', axis:'y'},
                    {value: 200, text: 'online', axis:'y'},
                ]
            },
        },
        zoom: {
            enabled: true
        },
        point:{
            show:false,
        },
        subchart: {
            show: false,
        },
        bindto: '#'+chartName,
        tooltip: {
            contents: function (d, defaultTitleFormat, defaultValueFormat, color) {
                // console.log(d)
                let $$ = this, config = $$.config,
                    
                    titleFormat = config.tooltip_format_title || defaultTitleFormat,
                    nameFormat = config.tooltip_format_name || function (name) { return name; },
                    valueFormat = config.tooltip_format_value || defaultValueFormat,
                    text, i, title, value, name, bgcolor, total=0;
                
                for (i of d){
                    console.log(i);
                }
                // for (i = 0; i < d.length; i++) {
                //     total = total+d[i].value;
                //     if (! (d[i] && (d[i].value || d[i].value === 0))) { continue; }

                //     if (! text) {
                //         title = titleFormat ? titleFormat(d[i].x) : d[i].x;
                //         text = "<table class='" + $$.CLASS.tooltip + "'>" + (title || title === 0 ? "<tr><th colspan='2'>" + title + "</th></tr>" : "");
                //     }

                    
                //     name = nameFormat(d[i].name,d[i].ratio, d[i].id, d[i].index);
                //     value = valueFormat(d[i].value, d[i].ratio, d[i].id, d[i].index);
                //     console.log(value)
                //     bgcolor = $$.levelColor ? $$.levelColor(d[i].value) : color(d[i].id);
                    
                //     text += "<tr class='" + $$.CLASS.tooltipName + "-" + d[i].id + "'>";
                //     text += "<td class='name'><span style='background-color:" + bgcolor + "'></span>" + name + "</td>";
                //     text += "<td class='value'>" + value + "</td>";
                //     text += "</tr>";
                // }
                // // text += "<tr class='" + $$.CLASS.tooltipName +"'>";
                // // text += "<td class='name'> Total </td>";
                // // text += "<td class='value'>" + total + "</td>";
                // // text += "</tr>";
                // return text + "</table>";
            },  
}
            
    });
}

function loadChart (){
    const x = document.getElementsByClassName("opebuptime");
    for(let y of x){
        try{
            const chartName = y.getAttribute('data-id');
            const chartUrl = y.getAttribute('data-url');
            const div = document.createElement("div");
            div.id = chartName;
            y.appendChild(div)
            const upitme = fetchUrl(chartUrl);
            
            upitme.then(function(result) {
                genChartData(result,chartName)
                
            });
        }catch(err){
            console.log(err)
        }
    }
}
loadChart();

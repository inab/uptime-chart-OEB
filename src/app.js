import * as d3 from 'd3';
import * as c3 from 'c3';
import '../node_modules/c3/c3.css'
import './app.css';

//./node_modules/.bin/webpack-cli src/app.js --output=build/build.js --module-bind 'css=style-loader!css-loader' -d -w

// function doEverything(){
    async function fetchUrl(url, limit) {
        try {

            let request = await fetch("https://openebench.bsc.es/monitor/rest/homepage/"+url+"?limit="+limit);
            let result = await request.text();
            return JSON.parse(result);
        }
        catch (err) {
            console.log(`Invalid Url Error: ${err.stack} `);
        }
    }
    function genChartData(uptime,chartName,xaxis,c_w,c_h ,chartTitle){
        const dates = [];
        const code = [];
        const ac_time = [];
    
        for(const x of uptime){
            const date = x.date.split('.')[0].replace('T',' ').replace(/-/g, ".");
            // const date = x.date.split('.')[0].split('T')[0]
            dates.push(date);
            code.push(x.code);
            ac_time.push(x.access_time);
        }
        dates.unshift('dates');
        code.unshift('Status');
        ac_time.unshift('Access Time');
       populateChart(dates, code , ac_time , chartName,xaxis,c_w,c_h,chartTitle)
    }
    
    
    
    function populateChart(dates, code , ac_time,chartName,xaxis,c_w,c_h,chartTitle){
        
        const tickOptionsX = {
            format: '%m-%d',
            rotate: 50,
            multiline: false,
            outer: false,
        }
        const tickOptionsY = {
            outer: false,
            tooltip:false,
            
        }
        const tickOptionsY2 = {
            outer: false,
            // format: function(x) { console.log(x); return x % 1 === 0 ? x : ''; }
        }
        // console.log(xaxis)
        const chart = c3.generate({
            data: {
                xFormat: '%Y-%m-%dT%H:%M:%S.%LZ',
                x:'dates',
                
                columns:[
                    dates,
                    code,
                    ac_time,
                ],
                types:{
                    'Access Time': 'area',
                    'Status': 'line',
                },
                axes:{
                    'Status': 'y',
                    'Access Time': 'y2',
                },
            },
            size: {
                height: Number(c_h),
                width: Number(c_w),
            },
            title:{
                text: chartTitle,
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
                    
                    inverted:true,
                    padding:{
                        bottom:0,
                    }
                },
                
                x:{
                    type : 'category',
                    // type : 'timeseries',
                    tick: tickOptionsX,
                    extent: [dates.length-5, dates.length],
                    show: xaxis == 'true' ? 1:0,
                    padding:{
                        right: 0.5,
                        
                    }
                },
                
            },
            grid: {
                y: {
                    lines: [
                        {value: 400, text: 'offline', axis:'y', class: 'gridonline'},
                        {value: 200, text: 'online', axis:'y', class: 'gridonline'},
                    ]
                },
            },
            zoom: {
                enabled: false,
                rescale: false,
            },
            point:{
                show:false,
            },
            subchart: {
                show: false,
            },
            padding:{
                top:0,
            },
            legend: {
                position: 'top',
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
                    
                    for (i = 0; i < d.length; i++) {
                        total = total+d[i].value;
                        if (! (d[i] && (d[i].value || d[i].value === 0))) { continue; }
    
                        if (! text) {
                            title = titleFormat ? titleFormat(d[i].x) : d[i].x;
                            text = "<table class='" + $$.CLASS.tooltip + "'>" + (title || title === 0 ? "<tr><th colspan='2'>" + title + "</th></tr>" : "");
                        }
    
                        
                        name = nameFormat(d[i].name,d[i].ratio, d[i].id, d[i].index);
                        value = valueFormat(d[i].value, d[i].ratio, d[i].id, d[i].index);
                        // console.log(value)
                        bgcolor = $$.levelColor ? $$.levelColor(d[i].value) : color(d[i].id);
                        
                        text += "<tr class='" + $$.CLASS.tooltipName + "-" + d[i].id + "'>";
                        text += "<td class='name'><span style='background-color:" + bgcolor + "'></span>" + name + "</td>";
                        
                        if(name == 'Access Time'){
                            text += "<td class='value'>" + value +"ms </td>";
                        }else{
                            if (value == 200){
                                text += "<td class='value'> Online </td>";
                            } else if(value == 400 ) {
                                text += "<td class='value'> Offline </td>";
                            } else {
                                text += "<td class='value'>" + value +"</td>";
                            }
                            
                        }
                        
                        text += "</tr>";
                    }
                    return text + "</table>";
                },  
            }
                
        });
    }
    
    function loadChart (elems){
       
        // console.log(elems);
        if(elems===undefined) {
            elems = document.getElementsByClassName("opebuptime");
        }
        for(let y of elems){
            try{
              
                const chartName = y.getAttribute('data-id');
                const chartUrl = y.getAttribute('data-url');
                let chartTitle = y.getAttribute('data-title');
                    if(!chartTitle){
                        chartTitle = '';
                    }
                let xaxis = y.getAttribute('data-xaxis');
                    if(!xaxis){
                        xaxis="false";
                    }
                let c_w = y.getAttribute('data-w');
                    if(c_w<200 || c_w==0 || !c_w){
                        c_w=null;
                    }
                let c_h = y.getAttribute('data-h');
                    if(c_h<200 || c_h==0 || !c_h){
                        c_h=null;
                    }
                let limit = y.getAttribute('data-limit');
                    if(!limit || limit < 5){
                        limit = 5;
                    }
                const div = document.createElement("div");
                div.id = chartName;
                y.appendChild(div)
                const upitme = fetchUrl(chartUrl,limit).then(function(result) {
                        genChartData(result,chartName,xaxis,c_w,c_h,chartTitle)
                    });
            }catch(err){
                // console.log(err)
            }
        }
    }

export{
   loadChart
}
loadChart();
import * as d3 from 'd3-format';
import * as c3 from 'c3';
import * as style from '../node_modules/c3/c3.css';


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
function genChartData(citations,chartName,title,dataH,fullName){
    const columsData = [];
    const xsData = {};
    
    for(const i of citations){
        for(const y of i.found_pubs){
            const temp = {};
            const max = new Date().getFullYear();
            let min = y.year;
            // console.log(Object.keys(y.citation_stats)[0]);
            for(min; min<=max; min++){
                temp[min]=0;
            }
            const title = y.title;
            const pmid = y.pmid;
            const citation_count = y.citation_count;
            const citation_stats_temp = y.citation_stats;
            const citation_stats = Object.assign(temp,citation_stats_temp);
            const years = Object.keys(citation_stats);
            const count = Object.values(citation_stats);
            let key = 'PMID: '+pmid+' ('+citation_count+')';
            if(fullName=="true"){
                key = title+' PMID: '+pmid+' ('+citation_count+')';
            };
            count.unshift(key);
            years.unshift(key+'y');
            columsData.push(years,count);
            xsData[key]=key+'y';
        }
    }
    populateChart(columsData,xsData,chartName,title,dataH);
}


//Depricated
// function genChartDataB (citations,chartName){
//     console.log(citations);
//     const columsData = [];
//     const xsData = {};
//     for(let i of citations){
//         const years = Object.keys(i.citation_stats);
//         const count = Object.values(i.citation_stats);
//         count.unshift(i.id);
//         years.unshift(i.id+'y');
//         columsData.push(years,count);
//         xsData[i.id]=i.id+'y';
//     };
//     populateChart(columsData,chartName,xsData);
// }
function populateChart(columsData,xsData,chartName,title,dataH){
    const tickOptionsX = {
        
        format: d3.format('d'),
        outer: false,
    }
    const tickOptionsY = {
        
        outer: false,
        format: function(x) { return x % 1 === 0 ? x : ''; }
        
    }
    
    const chart = c3.generate({
        
        size: {
            height: dataH?dataH:480,
        },
        title:{
            text: title,
        },
        data: {
            xs:xsData,
                columns: columsData,
            },
            legend: {
                position: 'bottom',
            },
            axis: {
                y:{
                    tick: tickOptionsY,
                    label: {
                        text: 'Citations',
                        position: 'outer-center'
                    },
                    min: 0,
                    padding: {
                        bottom: 5,
                    },
                },
                x:{
                    tick: tickOptionsX,
                    label: {
                        text: 'Year',
                        position: 'outer-right'
                    },
                    padding: {
                        right: 0.3,
                    },
                },
            },
            bindto: '#'+chartName,
            
            tooltip: {
                contents: function (d, defaultTitleFormat, defaultValueFormat, color) {

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

                        name = nameFormat(d[i].name);
                        value = valueFormat(d[i].value, d[i].ratio, d[i].id, d[i].index);
                        bgcolor = $$.levelColor ? $$.levelColor(d[i].value) : color(d[i].id);

                        text += "<tr class='" + $$.CLASS.tooltipName + "-" + d[i].id + "'>";
                        text += "<td class='name'><span style='background-color:" + bgcolor + "'></span>" + name + "</td>";
                        text += "<td class='value'>" + value + "</td>";
                        text += "</tr>";
                    }
                    text += "<tr class='" + $$.CLASS.tooltipName +"'>";
                    text += "<td class='name'> Total </td>";
                    text += "<td class='value'>" + total + "</td>";
                    text += "</tr>";
                    return text + "</table>";
                },  
            }
    });
}

function loadUptimeChart (){
    const x = document.getElementsByClassName("opebcitations");
    for(let y of x){
        try{
            const chartName = y.getAttribute('data-id');
            const chartUrl = y.getAttribute('data-url');
            const title = y.getAttribute('data-title');
            const dataH = y.getAttribute('data-h');
            const fullName = y.getAttribute('data-full-name');
            const div = document.createElement("div");
            div.id = chartName;
            y.appendChild(div);
            const citations = fetchUrl(chartUrl);
            citations.then(function(result) {
                genChartData(result.entry_pubs,chartName,title,dataH,fullName);
            });
        }catch(err){
            console.log(err);
        }
    }
}
loadUptimeChart();

(function() {

// Localize jQuery variable
var jQuery;

/******** Load jQuery if not present *********/
if (window.jQuery === undefined || window.jQuery.fn.jquery !== '3.2.1') {
    var script_tag = document.createElement('script');
    script_tag.setAttribute("type","text/javascript");
    script_tag.setAttribute("src","http://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js");
    if (script_tag.readyState) {
      script_tag.onreadystatechange = function () { // For old versions of IE
          if (this.readyState == 'complete' || this.readyState == 'loaded') {
              scriptLoadHandler();
          }
      };
    } else {
      script_tag.onload = scriptLoadHandler;
    }
    // Try to find the head, otherwise default to the documentElement
    (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);
} else {
    // The jQuery version on the window is the one we want to use
    jQuery = window.jQuery;
    main();
}

/******** Called once jQuery has loaded ******/
function scriptLoadHandler() {
    // Restore $ and window.jQuery to their previous values and store the
    // new jQuery in our local jQuery variable
    jQuery = window.jQuery.noConflict(true);
    // Call our main function
    main();
}



function createElements(){
    document.createElement('rect');
    document.createElement('opeb');
    document.createElement('opeb-widget');
    document.createElement('opeb-widget-tooltip');
}

function css(){
    var widgetStyle = document.createElement('style');
    widgetStyle.innerHTML =
    'opeb{display:flex; } opeb-widget{ width:100px; height:100px; display:flex; flex-direction:column;  flex-wrap:wrap; align-content: flex-start;  border-radius: 25px; overflow:visable} rect{width:25px;height:25px;display:block;background-color:pink; } rect:hover{opacity:.5} opeb-widget-tooltip{ display: flex; padding:0;margin:0; z-index:100; min-width: 200px;  flex-direction:row;}';
    return widgetStyle;
}

function buildTooltip(data){
    var tooltip =
    "<opeb-widget-tooltip><p>Desc : "+data.project.description+"<p><p>Publications: "+data.project.publications+"<p><p>operational: "+data.project.website.operational+"<p><p>Support: "+data.support.email+"<p></opeb-widget-tooltip>"
    return tooltip
}


function palette(min, max) {
    var d = (max-min)/10;
    return d3.scale.threshold()
        .range(['#ff8c00','#ee7d29','#dc6d3b','#cb5e49','#b94f55','#a6405f','#933168','#7e2271','#67127a','#4b0082'])
        .domain([min+1*d,min+2*d,min+3*d,min+4*d,min+5*d,min+6*d,min+7*d,min+8*d,min+9*d,min+10*d]);
}
/******** Our main function ********/
function main() {
    jQuery(document).ready(function($) {
        /******* Creating dom elements *******/
        createElements();

        /******* Load CSS *******/
        css();

        /******* Load HTML *******/
        $('head').append( css());
        var jsonp_url = $("opeb").attr("data-widgetService");
        $.getJSON(jsonp_url, function(data) {
            console.log(data);
            var colorArray = ['#ff8c00','#fa8813','#f5831e','#f07f26','#eb7a2c','#e67632','#e17137','#dc6d3c','#d76940','#d26444','#cd6048','#c85b4c','#c2574f','#bd5252','#b74e56','#b34a59','#ad455b','#a8415f','#a23d61','#9d3864','#973467','#913069','#8c2b6c','#85276e','#7f2271','#791d74','#721976','#6c1478','#640f7b','#5d0a7d','#540480','#4b0082'];
            $("opeb").append("<opeb-widget ></opeb-widget>");
            for (var i = 0; i <= 15; i++) {
                $("opeb-widget").append("<rect data-widget-text="+i+" style=background-color:"+colorArray[Math.floor((Math.random() * 16) +1)]+";></rect>")
            }
            $("opeb-widget").hover( function(){
                $(this).append(buildTooltip(data));
            },function(){
                $("opeb-widget-tooltip").remove();
            })
        });
    });
}


})(); // We call our anonymous function immediately

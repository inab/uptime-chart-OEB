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

/******** Our main function ********/
function main() {
    jQuery(document).ready(function($) {
        /******* Creating dom elements *******/
        document.createElement('rect');
        document.createElement('opeb');
        document.createElement('opeb-widget');
        document.createElement('opeb-widget-tooltip');
        /******* Load CSS *******/
        var widgetStyle = document.createElement('style');
        widgetStyle.innerHTML =
        'opeb{ border: 1px solid black;display:block;width:300px; height:150px; margin:10px;} opeb-widget{ width:100px; height:100px; display:flex; flex-direction:column;  flex-wrap:wrap; align-content: flex-start;} rect{width:25px;height:25px;display:block;background-color:pink; } rect:hover{opacity:.5} opeb-widget-tooltip{width:100px; height:100px;border:1px solid red; display:block}';

        $('head').append(widgetStyle);

        /******* Load HTML *******/
        var jsonp_url = $("opeb").attr("data-widgetService");
        $.getJSON(jsonp_url, function(data) {
            console.log(data);
            $("opeb").append("<opeb-widget ></opeb-widget>");
            for (var i = 0; i <= 15; i++) {
                $("opeb-widget").append("<rect data-widget-text="+i+" >"+i+"</rect>")
            }
            // $("opeb").append("")
            $("opeb-widget").hover(function (){
                $(this).append("<opeb-widget-tooltip><a href="+data.homepage+">link</a><h1>hola<h1></opeb-widget-tooltip>");
            },function(){
                $("opeb-widget-tooltip").remove();
            })
            // $('opeb-widget').attr('title',data["@type"].toUpperCase()+"\n<a href="+data.homepage+"></a>");
        });
    });
}

})(); // We call our anonymous function immediately

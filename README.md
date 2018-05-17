# UpTime
This is a widget to display the uptime of a tool
# How to
All you need is the build file which you can download from build/build.js and tag it into your html
eg: 
```html
<html>
  <meta charset="utf-8">
  <body>
    <div data-id="test" data-xaxis="true" data-title="trimal" data-url="bio.tools:pmut:2017/cmd/mmb.irbbarcelona.org" data-limit="15" class="opebuptime" ></div>
  <script src="build/build.js" ></script>
  </body>
</html>
```
### Params
* data-id : should be unique and start with a letter
* data-url : from where the data is retrived
* data-title : chart title
* data-xaxis : boolean
* data-w : width of the chart
* data-h : height of the chart
* data-limit : amout of dates to be displayed

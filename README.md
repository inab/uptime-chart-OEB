# UpTime
This is a widget to display the uptime of a tool at openebench
# How to
Add JS cdn for D3
Add JS and CSS cdns for c3
```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/c3/0.7.3/c3.min.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/c3/0.7.3/c3.min.js"></script>

<script src=https://cdnjs.cloudflare.com/ajax/libs/d3/5.9.7/d3.min.js></script>
```
Add the build file which you can download from build/build.js and tag it into your html. The HTML file should look like the following example: 
```html
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/c3/0.7.3/c3.min.css" />
</head>

<body>

  <div data-id="test" data-xaxis="true" data-yaxis="false"
    data-url="biotools:1000genomes_vep:1/web/browser.1000genomes.org" data-limit="22" class="opebuptime"></div>

  <script src=https://cdnjs.cloudflare.com/ajax/libs/d3/5.9.7/d3.min.js> </script> 
  <script src="https://cdnjs.cloudflare.com/ajax/libs/c3/0.7.3/c3.min.js"></script>
  <script src="build/build.js"></script>
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

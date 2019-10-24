# UpTime

This is a standalone widget to display the uptime of a tool at OpenEBench.

![Alt text](docs/images/screenshot.png 'Screenshot')

Live demo available at : https://inab.github.io/uptime-chart-OEB/

# How to

Add JS cdn for D3
Add JS and CSS cdns for c3

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/c3/0.7.3/c3.min.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/c3/0.7.3/c3.min.js"></script>
<script src=https://cdnjs.cloudflare.com/ajax/libs/d3/5.9.7/d3.min.js></script>
```

Add the build file which you can download from build/build.js and tag it into your html. You can then call the `loadChart()` function. The HTML file should look like the following example:

**Note** : The class attribute on the div should be `class="opebuptime"`

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<link
			rel="stylesheet"
			href="https://cdnjs.cloudflare.com/ajax/libs/c3/0.7.3/c3.min.css"
		/>
	</head>

	<body>
		<div
			data-id="test"
			data-xaxis="true"
			data-yaxis="false"
			data-url="biotools:1000genomes_vep:1/web/browser.1000genomes.org"
			data-limit="22"
			class="opebuptime"
		></div>

		<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/5.9.7/d3.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/c3/0.7.3/c3.min.js"></script>
		<script src="build/build.js"></script>
		<script>
			loadChart();
		</script>
	</body>
</html>
```

### Attributes that can be set on the _<div\>_ tag

-   data-id : should be unique and start with a letter
-   data-url : the ID of the tool from OEB
-   data-title : chart title
-   data-xaxis : boolean
-   data-w : width of the chart
-   data-h : height of the chart
-   data-limit : amout of dates to be displayed (min : 5)

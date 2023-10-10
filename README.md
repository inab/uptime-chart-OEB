# OpenEBench software monitoring uptime Chart

This is a standalone widget to display the uptime of a tool at OpenEBench.

![Alt text](docs/images/screenshot.png 'Screenshot')

## Live Demo
Live demo available at : https://inab.github.io/uptime-chart-OEB/

## NPM Package 
NPM Package `@inb/oeb-classification-table` published to: `https://www.npmjs.com/package/@inb/oeb-uptime-chart`.

## How to use

The component can be imported in two ways: As npm package (preferred), or via the build file from the git repository (see bottom).


### Use the npm Package (Recommended way)

- Install the npm package in your project
	```bash
	npm i @inb/oeb-uptime-chart
	```
- Add JS cdn for d3 (`src`=`https://cdnjs.cloudflare.com/ajax/libs/d3/5.9.7/d3.min.js`)
- Add JS cdn for c3 (`src`=`https://cdnjs.cloudflare.com/ajax/libs/c3/0.7.3/c3.min.js`)
- Add stylesheet for c3 (`href`=`https://cdnjs.cloudflare.com/ajax/libs/c3/0.7.3/c3.min.css`)
- Add a div with the class `opebuptime` and the appropriate attributes (see "Attributes" section for more details): 

	```html
	<div 
		data-id="test" 
		data-xaxis="true" 
		data-yaxis="false" 
		data-mode="dev"
		data-url="biotools:1000genomes_vep:1/web/browser.1000genomes.org" 
		data-limit="5" 
		class="opebuptime">
	</div>
	```

- Import the `loadChart` function in your frontend component and call it: 

	```javascript
	import {loadChart} from "@inb/oeb-uptime-chart"

	loadChart()
	```


###  Clone from repository (Alternative way)

- Add JS cdn for D3
	```html
	<script src=https://cdnjs.cloudflare.com/ajax/libs/d3/5.9.7/d3.min.js></script>
	```

- Add JS and CSS cdns for c3

	```html
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/c3/0.7.3/c3.min.css" />
	<script src="https://cdnjs.cloudflare.com/ajax/libs/c3/0.7.3/c3.min.js"></script>
	```
- Add a` div` with the class `opebuptime` and the appropriate attributes (see "Attributes" section for more details).

- Add the build file which you can download from `build/build.js` and tag it into your html.
	```HTML
	<script src="build/build.js"></script>
	```

- You can then call the `loadChart()` function. The HTML file should look like [this
](https://github.com/inab/uptime-chart-OEB/blob/master/index.html) 


## Attributes 

Attributes can be set on the _<div\>_ tag

-   data-id : should be unique and start with a letter
-   data-url : the ID of the tool from OEB
-   data-title : chart title
-   data-xaxis : boolean
-   data-w : width of the chart
-   data-h : height of the chart
-   data-limit : amout of dates to be displayed (min : 5)

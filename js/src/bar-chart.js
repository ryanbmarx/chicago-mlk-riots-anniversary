/*
new BarChart({
    container: document.querySelector(<container selector|string>),
    dataset: <data|iterable object>, // Will be charted AS IS. All transforms, etc., should be done by now.
    innerMargins:{ top:0,right:0,bottom:0,left:0 }, // This will inset the chart from the base container (which should be controlled by CSS)
    barFillColor:"#aaa", // must be a valid color syntax, #HEX, rgba(), etc.
    xAxis:{
        dataAttribute:<x attribute key|string>, // The key of the x attribute in the data set
        axisFormatter: false,
        minValue:0,
        maxValue:false, // Useful for making multiple charts match in scale
        showAxis: true,
        removeAxisDomain: true,// the straight line with the axis
        removeAxisTicks: false, // Set to true to remove the lines (not numbers)
        totalTicks: 5 // Remember, with d3 axes, this number is a suggestions
    },
    yAxis:{
        dataAttribute:<x attribute key|string>, // The key of the y attribute in the data set
        axisFormatter:false,
        minValue:0,
        maxValue:false, // Useful for making multiple charts match in scale
        showAxis: true,
        removeAxisDomain: true, // the straight line with the axis
        removeAxisTicks: false, // Set to true to remove the lines (not numbers)
        totalTicks: 5 // Remember, with d3 axes, this number is a suggestions
    },
    meta:{
        headline:false, // You must make room for this in the margins
        xAxisLabel: false,
        yAxisLabel: false,
        sources: false, // You must make room for this in the margins
        credit: false // You must make room for this in the margins
    }
});

*/

import * as d3 from 'd3';
import addMeta from './add-meta.js';
import addAxes from './add-axes.js';

class BarChart{
	constructor(options){
		const app = this;
		app.options = options;
		app._container = options.container
		app.meta = options.meta;
		app.initChart(options.dataset);
	}

	initChart(data){
		let app = this;

		// ----------------------------------
		// GET THE KNOW THE CONTAINER
		// ----------------------------------

		const 	container = d3.select(app._container),
				bbox = app._container.getBoundingClientRect(), 
				height = bbox.height,
				width = bbox.width,
				margin = app.options.innerMargins,
				innerHeight = height - margin.top - margin.bottom,
				innerWidth = width - margin.right - margin.left,
				y = app.options.yAxis.dataAttribute, 
				x = app.options.xAxis.dataAttribute;
				app.innerHeight = innerHeight;
				app.innerWidth = innerWidth;
				app.container = container;

		// ----------------------------------
		// MAKE SCALES
		// ----------------------------------

		// If the user has defined min or max values for the x range, such as starting at zero,
		// then use those values. Otherwise, find them.
		const 	yMax = typeof(app.options.yAxis.maxValue) == "number" ? parseFloat(app.options.yAxis.maxValue) : d3.max(data, d => parseFloat(d[y])),
				yMin = typeof(app.options.yAxis.minValue) == "number" ? parseFloat(app.options.yAxis.minValue) : d3.min(data, d => parseFloat(d[y]));

		//Scale functions
		//This is the y scale used to size and position the bars
		const yScale = d3.scaleLinear()
			.domain([yMin, yMax])
			.nice()
			.range([innerHeight, 0]);


		// If the user has defined min or max values for the x range, such as starting at zero,
		// then use those values. Otherwise, find them.
		const 	xMax = typeof(app.options.xAxis.maxValue) == "number" ? parseFloat(app.options.xAxis.maxValue) : d3.max(data, d => parseFloat(d[x])),
				xMin = typeof(app.options.xAxis.minValue) == "number" ? parseFloat(app.options.xAxis.minValue) : d3.min(data, d => parseFloat(d[x]));

		// Make the x scale
		const xScale = d3.scaleBand()
			.domain(data.map(d => d[x]))
			.range([0, innerWidth])
			.padding(.1);

		// ----------------------------------
		// START MESSING WITH SVGs
		// ----------------------------------

		//Inserts svg and sizes it
		const svg = container
            .append("svg")
            .attr("width", width)
            .attr("height", height);

		const chartInner = svg.append('g')
			.classed('chartInner', true)
			.attr("width",innerWidth)
			.attr("height",innerHeight)
			.attr(`transform`,`translate(${margin.left},${margin.top})`);

		// ----------------------------------
		// APPEND <g> ELEMENTS FOR SCALES 
		// ----------------------------------

		addAxes(app, svg, yScale, xScale);

		// if (app.options.yAxis.showAxis){
		// 	// Define the y axis and add a tick formatter if a format string is define in the options.
		// 	const yAxis = d3.axisLeft(yScale);

		// 	// If the user has defined a format function
		// 	if (app.options.yAxis.axisFormatter) yAxis.tickFormat(app.options.yAxis.axisFormatter)

		// 	// If the user has defined the desired # ticks ...
		// 	if (app.options.yAxis.totalTicks) yAxis.ticks(app.options.yAxis.totalTicks);

		//    svg.append('g')
		// 		.attr("class", "y axis")
		// 		.attr(`transform`,`translate(${margin.left},${margin.top})`)
		// 		.call(yAxis);
	        
		// 	// Maybe we don't want all those lines on the axis
	 //        if (app.options.yAxis.removeAxisDomain) d3.select('.y.axis').selectAll('.domain').remove();

	 //        // Maybe we don't want all those lines on the axis
	 //        if (app.options.yAxis.removeAxisTicks){
	 //        	d3.select('.y.axis').selectAll('.tick line').remove();
	 //        	d3.select('.y.axis').selectAll('.tick text').attr('dx', '.7em');
	 //        }

		// }
		
		// if (app.options.xAxis.showAxis){
		// 	// Create an x axis if the option requires it

		// 	// Define the x axis 
		// 	const xAxis = d3.axisBottom(xScale);

		// 	// ... add a tick formatter if a format fucntion is supplied in the options.
		// 	if (app.options.xAxis.axisFormatter) xAxis.tickFormat(app.options.xAxis.axisFormatter);

		// 	// If the user has defined the desired # ticks ...
		// 	if (app.options.xAxis.totalTicks) xAxis.ticks(app.options.xAxis.totalTicks);	

		// 	// Now, append the axis elements to the SVG
		//    svg.append('g')
		// 		.attr("class", "x axis")
		// 		.attr(`transform`,`translate(${ margin.left },${ margin.top + innerHeight })`)
		// 		.transition()
		// 			.duration(app.options.transitionTime)
		// 			.call(xAxis);

		// 	// Maybe we don't want all those lines on the axis
	 //        if (app.options.xAxis.removeAxisDomain) d3.select('.x.axis').selectAll('.domain').remove();
	        
		// 	// Maybe we don't want all those lines on the axis
	 //        if (app.options.xAxis.removeAxisTicks){
	 //        	d3.select('.x.axis').selectAll('.tick line').remove();
	 //        	d3.select('.x.axis').selectAll('.tick text').attr('dy', '.3em');
	 //        }

		// }

		// ----------------------------------
		// ADD SOME FRIGGIN' BARS!
		//		     ~  ~
		//	      ( o )o)
		//	     ( o )o )o)
		//	   (o( ~~~~~~~~o
		//	   ( )' ~~~~~~~'
		//	   ( )|)       |-.
		//	     o|     _  |-. \
		//	     o| |_||_) |  \ \
		//	      | | ||_) |   | |
		//	     o|        |  / /
		//	      |        |." "
		//	      |        |- '
		//	      .========.   mb
		// ----------------------------------



		chartInner.selectAll('.bar')
			.data(data)
			.enter()
			.append('rect')
			.attr('class', d => d[y] >=0 ? `bar bar--positive bar--${d[x]}` : `bar bar--negative bar--${d[x]}`)
			.attr('x', d => xScale(d[x]))
			.attr('y', d => d[y] >=0 ? yScale(0)- Math.abs(yScale(d[y]) - yScale(0)) : yScale(0))
			.attr("width", xScale.bandwidth())
	        .attr("height", function(d) {
	            return Math.abs(yScale(d[y]) - yScale(0));
	        })
			.style('fill', app.options.barFillColor)


		// ----------------------------------
		// ADD THE META LABELING
		// ----------------------------------
		addMeta(app, svg)	
		
		// if (app.meta){
		// 	// Add the <g> for the labeling, and hang some base styles on it.
		// 	// Only text attr/style that differs from this needs to be applied.
		// 	const labels = svg.append('g')
		// 		.classed('chart-labels', true)
		// 		.style('font-family','Arial, sans-serif')
		// 		.style('font-size','13px')
		// 		.style('font-weight','bold')
		// 		.style('margin','0 0 0 0')
		// 		.style('line-height', '1.3em')
		// 		.attr('text-anchor', 'middle')
		// 		.attr('dy', '1em');

		// 	if (app.meta.headline){
		// 		labels.append('text')
		// 			.classed('chart-labels__headline', true)
		// 			.text(`${app.meta.headline}`)
		// 			.style('font-size','19px')
		// 			.attr('x', 0)
		// 			.attr('y', 0)
		// 			.attr('text-anchor', 'start');
		// 	}
		// 	if (app.meta.xAxisLabel){
		// 		labels.append('text')
		// 			.classed('chart-labels__xAxisLabel', true)
		// 			.text(`${app.meta.xAxisLabel}`)
		// 			.attr('x', margin.left + (innerWidth / 2))
		// 			.attr('y', height)
		// 			.attr('dy', '-.3em');
					
		// 	}
		// 	if (app.meta.yAxisLabel){
		// 		labels.append('text')
		// 			.classed('chart-labels__yAxisLabel', true)
		// 			.text(`${app.meta.yAxisLabel}`)
		// 			.attr('x', 0)
		// 			.attr('y', margin.top + (innerHeight / 2))
		// 			.attr('transform', `rotate(-90, 0, ${margin.top + (innerHeight / 2)})`)
		// 							.attr('dy', '1em');
		// 	}

		// 	if (app.meta.sources){
		// 		container.append('p')
		// 			.classed('chart-labels__source', true)
		// 			.style('font-weight','normal')
		// 			.text(`${app.meta.sources}`);
		// 	}

		// 	if(app.meta.credit){
		// 		container.append('p')
		// 			.classed('chart-labels__credit', true)
		// 			.text(`${app.meta.credit}`)
		// 			.style('font-family','Arial, sans-serif')
		// 			.style('font-size','13px')
		// 			.style('margin','7px 0 0 0')
		// 			.style('line-height', '1.3em');
		// 	}
		// }

     }
}


module.exports = BarChart;
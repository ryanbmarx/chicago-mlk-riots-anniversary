// import getTribColor from '../utils/getTribColors.js';
// import * as d3 from 'd3';
// import filter from 'lodash.filter';
// import orderBy from 'lodash.orderby';
// import monthFormatter from '../utils/month-formatter.js';

import * as d3 from 'd3';
// import addMeta from './add-meta.js';
// import addAxes from './add-axes.js';




class MultilineChart{
	constructor(options){
		const 	app = this;
		app.options = options;
		app.data = options.dataset;
		app._container = options.container;
		app.mobileLayoutBreakpoint = 600;
		app.isMobile = window.innerWidth < 850 ? true : true;
		MultilineChart.initChart(app);
	}

	static initChart(app){
		
		// ----------------------------------
		// GET THE KNOW THE CONTAINER
		// ----------------------------------

		const 	data = app.data,
				container = d3.select(app._container),
				bbox = app._container.getBoundingClientRect();

				let width= bbox.width;

		const	height = bbox.height,
				margin = app.options.innerMargins,
				innerHeight = height - margin.top - margin.bottom,
				innerWidth = width - margin.right - margin.left,
				x = app.options.xAxis.dataAttribute; 		
	
		// ----------------------------------
		// start working with the SVG
		// ----------------------------------

		const svg = container
			.append('svg')
			.attr('width', width)
			.attr('height', height);

		const chartInner = svg
			.append('g')
			.classed('chart-inner', true)
			.attr('width', innerWidth)
			.attr('height', innerHeight)
			.attr('transform', `translate(${margin.left}, ${margin.top})`);


		// ----------------------------------
		// MAKE SOME SCALES
		// ----------------------------------
		
		// If the user has defined min or max values for the y range, such as starting at zero,
		// then use those values. Otherwise, find them. The key is, howver, that since this is
		// a multiline chart, we need to find the overall max by looping through each attribute
		// and finding the biggest, then grabbing the max of that group.

		let yMin, yMax;

		if (typeof(app.options.yAxis.maxValue) == "number"){
			yMax = parseFloat(app.options.yAxis.maxValue)
		} else {
			const temp = [];
			app.options.yAxis.dataAttributes.forEach(att => {
				temp.push(d3.max(data, d => d[att]))
			});
			yMax = d3.max(temp);
		}

		// Same as above, except max = min

		if (typeof(app.options.yAxis.minValue) == "number"){
			yMin = parseFloat(app.options.yAxis.minValue)
		} else {
			const temp = [];
			app.options.yAxis.dataAttributes.forEach(att => {
				temp.push(d3.min(data, d => d[att]))
			});
			yMin = d3.min(temp);
		}

		//Scale functions
		const yScale = d3.scaleLinear()
			.domain([yMin, yMax])
			.nice()
			.range([innerHeight, 0]);

		const yAxisFunc = d3.axisLeft(yScale);

		if (app.options.yAxis.axisFormatter){
			// If the user has defined a yAxis formatter, then use it.
			yAxisFunc.tickFormat(app.options.yAxis.axisFormatter);
		}		

		if (app.options.yAxis.totalTicks){
			// If the user has defined a yAxis formatter, then use it.
			yAxisFunc.ticks(app.options.yAxis.totalTicks);
		}		

		// Typically multiline charts aren't vertical, but we'll use the same methods 
		// Just in case

		let xMin, xMax;

		if (typeof(app.options.xAxis.maxValue) == "number"){
			xMax = parseFloat(app.options.xAxis.maxValue)
		} else {
			const temp = [];
			app.options.xAxis.dataAttribute.forEach(att => {
				temp.push(d3.max(data, d => d[att]))
			});
			xMax = d3.max(temp);
		}

		// Same as above, except max = min

		if (typeof(app.options.xAxis.minValue) == "number"){
			xMin = parseFloat(app.options.xAxis.minValue)
		} else {
			const temp = [];
			app.options.xAxis.dataAttribute.forEach(att => {
				temp.push(d3.min(data, d => d[att]))
			});
			xMin = d3.min(temp);
		}

		const xScale = d3.scaleLinear()
			.domain([xMin, xMax])
			.range([0, innerWidth]);

		const xAxisFunc = d3.axisBottom(xScale);
		
		if (app.options.xAxis.axisFormatter){
			// If the user has defined a yAxis formatter, then use it.
			xAxisFunc.tickFormat(app.options.xAxis.axisFormatter);
		}		

		if (app.options.xAxis.totalTicks){
			// If the user has defined a yAxis formatter, then use it.
			xAxisFunc.ticks(app.options.xAxis.totalTicks);
		}	

		// ----------------------------------
		// APPEND AXES
		// ----------------------------------

		if (app.options.yAxis.showAxis == true){
				const yAxis = svg
					.append('g')
					.attr('class', 'y axis')
					.attr('transform', `translate(${margin.left}, ${margin.top})`)
					.call(yAxisFunc);
		}

		if (app.options.xAxis.showAxis == true){
			const xAxis = svg
				.append('g')
				.attr('class', 'x axis')
				.attr('transform', `translate(${margin.left}, ${margin.top + innerHeight})`)
				.call(xAxisFunc);
		}

		// For each specified y attribute passed in 
		app.options.yAxis.dataAttributes.forEach((y, idx) => {
			const 	lineColor = app.options.lineColors[idx],
					lineWeight = app.options.lineWeights[idx];

			const line = d3.line()
			    .x(d => xScale(d[x]))
			    .y(d => yScale(d[y]));

			// If a curve function is specified, then use it.
			if (app.options.curve) line.curve(app.options.curve);
			
			chartInner.append("path")
				.datum(data)
				.attr("class", `line line--${y}`)
				.attr("d", line)
				.attr('stroke', lineColor)
				.attr('stroke-width', lineWeight)
				.attr('fill', 'transparent')
				.attr('stroke-linecap', 'round');
			
			if (app.options.highlightLastPoint[idx]){
				// If a final-point highlight is requested, then add a circle and label
			

				function getHighlightLabel(y){
					if (y.toUpperCase().indexOf('BLACK') > -1 ) return "Black"
					return "White"
				}

				const 	lastYValue = data[data.length - 1][y],
						lastXValue = data[data.length - 1][x],
						highlightCircleRadius = 8;

				chartInner.append("circle")
					.attr('r', highlightCircleRadius)
					.attr('cx', xScale(lastXValue))
					.attr('cy', yScale(lastYValue))
					.style('stroke', 'black')
					.style('stroke-width', 2)
					.style('fill', 'transparent');


				chartInner.append("text")
					.classed('chart-label', true)
					.text(`${getHighlightLabel(y)}: ${app.options.yAxis.axisFormatter(lastYValue)}`)
					.attr('x', xScale(lastXValue))
					.attr('y', yScale(lastYValue))
					.attr('text-anchor', 'end')
					.attr('dy', '-1.2em')
					.attr('transform', `translate(${highlightCircleRadius},0)`)
					.style('font-weight', 'bold')
			}

		});			
	}
}

module.exports = MultilineChart;
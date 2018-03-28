import * as d3 from 'd3';

module.exports = function addAxes(app, svg, yScale, xScale){
	if (app.options.yAxis.showAxis){
		// Define the y axis and add a tick formatter if a format string is define in the options.
		const yAxis = d3.axisLeft(yScale);

		// If the user has defined a format function
		if (app.options.yAxis.axisFormatter) yAxis.tickFormat(app.options.yAxis.axisFormatter)

		// If the user has defined the desired # ticks ...
		if (app.options.yAxis.totalTicks) yAxis.ticks(app.options.yAxis.totalTicks);

	   svg.append('g')
			.attr("class", "y axis")
			.attr(`transform`,`translate(${app.options.innerMargins.left},${app.options.innerMargins.top})`)
			.call(yAxis);
        
		// Maybe we don't want all those lines on the axis
        if (app.options.yAxis.removeAxisDomain) app.container.select('.y.axis').selectAll('.domain').remove();

        // Maybe we don't want all those lines on the axis
        if (app.options.yAxis.removeAxisTicks){
        	app.container.select('.y.axis').selectAll('.tick line').remove();
        	app.container.select('.y.axis').selectAll('.tick text').attr('dx', '.7em');
        }

	}
	
	if (app.options.xAxis.showAxis){
		// Create an x axis if the option requires it

		// Define the x axis 
		const xAxis = d3.axisBottom(xScale);

		// ... add a tick formatter if a format function is supplied in the options.
		if (app.options.xAxis.axisFormatter) xAxis.tickFormat(app.options.xAxis.axisFormatter);

		// If the user has defined the desired # ticks ...
		if (app.options.xAxis.totalTicks) xAxis.ticks(app.options.xAxis.totalTicks);	

		// Now, append the axis elements to the SVG
	   svg.append('g')
			.attr("class", "x axis")
			.attr(`transform`,`translate(${ app.options.innerMargins.left },${ app.options.innerMargins.top + app.innerHeight })`)
			.call(xAxis);

		// Maybe we don't want all those lines on the axis
        if (app.options.xAxis.removeAxisDomain) app.container.select('.x.axis').selectAll('.domain').remove();
        
		// Maybe we don't want all those lines on the axis
        if (app.options.xAxis.removeAxisTicks){
        	app.container.select('.x.axis').selectAll('.tick line').remove();
        	app.container.select('.x.axis').selectAll('.tick text').attr('dy', '.3em');
        }

	}
}
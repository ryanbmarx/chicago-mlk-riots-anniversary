import * as d3 from 'd3';

module.exports = function addMeta(app, svg){

	// Takes the barchart app (with options) and the whole-chart svg variable and adds metadata

	if (app.meta){
		// Add the <g> for the labeling, and hang some base styles on it.
		// Only text attr/style that differs from this needs to be applied.
		const labels = svg.append('g')
			.classed('chart-labels', true)
			.style('font-family','Arial, sans-serif')
			.style('font-size','13px')
			.style('font-weight','bold')
			.style('margin','0 0 0 0')
			.style('line-height', '1.3em')
			.attr('text-anchor', 'middle')
			.attr('dy', '1em');

		if (app.meta.headline){
			labels.append('text')
				.classed('chart-labels__headline', true)
				.text(`${app.meta.headline}`)
				.style('font-size','19px')
				.attr('x', 0)
				.attr('y', 0)
				.attr('text-anchor', 'start');
		}
		if (app.meta.xAxisLabel){
			labels.append('text')
				.classed('chart-labels__xAxisLabel', true)
				.text(`${app.meta.xAxisLabel}`)
				.attr('x', margin.left + (innerWidth / 2))
				.attr('y', height)
				.attr('dy', '-.3em');
				
		}
		if (app.meta.yAxisLabel){
			labels.append('text')
				.classed('chart-labels__yAxisLabel', true)
				.text(`${app.meta.yAxisLabel}`)
				.attr('x', 0)
				.attr('y', margin.top + (innerHeight / 2))
				.attr('transform', `rotate(-90, 0, ${margin.top + (innerHeight / 2)})`)
				.attr('dy', '1em');
		}

		if (app.meta.sources){
			container.append('p')
				.classed('chart-labels__source', true)
				.style('font-weight','normal')
				.text(`${app.meta.sources}`);
		}

		if(app.meta.credit){
			container.append('p')
				.classed('chart-labels__credit', true)
				.text(`${app.meta.credit}`)
				.style('font-family','Arial, sans-serif')
				.style('font-size','13px')
				.style('margin','7px 0 0 0')
				.style('line-height', '1.3em');
		}
	}
}
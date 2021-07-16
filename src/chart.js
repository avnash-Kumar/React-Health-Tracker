import * as d3 from 'd3';
import React, { useRef, useEffect } from 'react';

function Chart({ width, height, data, color }) {
  const ref = useRef();

  useEffect(() => {
    const svg = d3
      .select(ref.current)
      .attr('width', width)
      .attr('height', height)
      .style('border', '1px solid #ddd');
  }, []);

  useEffect(() => {
    draw();
  }, [data]);

  const draw = () => {
    const svg = d3.select(ref.current);
    var selection = svg.selectAll('rect').data(data);

    var xScale = d3
      .scaleTime()
      .domain([new Date('2014-12-01'), new Date('2015-12-01')])
      .range([0, 350]);
    var xAxis = d3.axisBottom(xScale).tickFormat(d3.timeFormat('%b'));
    svg.append('g').call(xAxis);

    var rScale = d3
      .scaleTime()
      .domain([new Date('2014-12-01'), new Date('2015-12-01')])
      .range([0, 350]);
    var rAxis = d3.axisRight(rScale).tickFormat(d3.timeFormat('%b'));
    svg.append('g').call(rAxis);

    var yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data)])
      .range([0, height - 100]);

    selection
      .transition()
      .duration(300)
      .attr('height', d => yScale(d))
      .attr('y', d => height - yScale(d));

    selection
      .enter()
      .append('rect')
      .attr('x', (d, i) => i * 45)
      .attr('y', d => height)
      .attr('width', 40)
      .attr('height', 0)
      .attr('fill', color)
      .transition()
      .duration(300)
      .attr('height', d => yScale(d))
      .attr('y', d => height - yScale(d));
    // .attr('x', d => xScale(d));

    selection
      .exit()
      .transition()
      .duration(300)
      .attr('y', d => height)
      .attr('height', 0)
      .remove();
  };

  return (
    <div className="chart">
      <svg ref={ref} />
    </div>
  );
}

export default Chart;

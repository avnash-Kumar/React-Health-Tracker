import * as d3 from 'd3';
import React, { useRef, useEffect } from 'react';

function Chart({ width, height, data, color, goal, title, unit }) {
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
    var x = d3.scaleTime().range([0, 400]);

    var xScale = d3
      .scaleTime()
      .domain([new Date('2014-12-01'), new Date('2015-12-01')])
      .range([0, 450]);
    var xAxis = d3.axisTop(xScale).tickFormat(d3.timeFormat('%b'));
    svg
      .append('g')
      .attr('x', (d, i) => i)
      .attr('transform', 'translate(0,' + 200 + ')')
      .call(xAxis);

    var line = svg
      .append('line')
      .attr('x1', 0)
      .attr('x2', width / 1.2)
      .attr('y1', goal)
      .attr('y2', goal)
      .attr('stroke-width', 2)
      .attr('stroke', color)
      .attr('stroke-dasharray', '9,8');

    var myGoal = svg
      .append('text')
      .attr('y', goal) //magic number here
      .attr('x', function() {
        return width / 1.1;
      })
      .attr('text-anchor', 'middle')
      .attr('class', 'myLabel') //easy to style with CSS
      .attr('fill', color)
      .attr('font-weight', 'bold')
      .text(`Goal ${goal}`);

    var minGoal = svg
      .append('text')
      .attr('y', height - 5) //magic number here
      .attr('x', function() {
        return width / 1.1;
      })
      .attr('text-anchor', 'middle')
      .attr('class', 'myLabel') //easy to style with CSS
      .attr('fill', '#D5D5D5')
      .attr('font-weight', 'bold')
      .text(`0 ${unit}`);

    // gridlines in x axis function
    function make_x_gridlines() {
      return d3.axisBottom(x).ticks(12);
    }
    // add the Y gridline

    svg
      .append('g')
      .attr('class', 'grid')
      .attr('transform', 'translate(0,' + height + ')')
      .call(
        make_x_gridlines()
          .tickSize(-height)
          .tickFormat('')
      );

    svg
      .append('text')
      .attr('transform', 'translate(100,0)')
      .attr('x', -90)
      .attr('y', 50)
      .attr('font-size', '18px')
      .attr('font-weight', 'bold')
      .attr('fill', color)
      .text(title);

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
      .attr('width', 35)
      .attr('height', 0)
      .attr('fill', color)
      // .attr("transform", "translate(35,0)")
      .transition(200)
      .duration(300)
      .attr('height', d => yScale(d))
      .attr('y', d => 180 - yScale(d));
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

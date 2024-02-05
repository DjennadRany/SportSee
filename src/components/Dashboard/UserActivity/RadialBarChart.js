// RadialBarChart.js
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const RadialBarChart = ({ radialBarChartData, width = 500, height = 500, barColor = 'steelblue' }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!radialBarChartData || radialBarChartData.length === 0) {
      return;
    }

    const radius = Math.min(width, height) / 2 - 10;

    // Supprimez le contenu existant du SVG
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const maxValue = Math.max(...radialBarChartData.map(data => data.value));



    // Créer l'échelle radiale
    const rScale = d3.scaleLinear()
      .domain([0, maxValue])
      .range([0, radius]);

    // Créer les barres radiales
    svg.selectAll('.radial-bar')
      .data(radialBarChartData)
      .enter().append('rect')
      .attr('class', 'radial-bar')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', (d) => rScale(d.value))
      .attr('height', 15)
      .attr('transform', (d, i) => `rotate(${(i * 360) / radialBarChartData.length})`)
      .attr('fill', barColor)
      .attr('fill-opacity', 0.6);

  }, [radialBarChartData, width, height, barColor]);

  return (
    <svg ref={svgRef}></svg>
  );
};

export default RadialBarChart;

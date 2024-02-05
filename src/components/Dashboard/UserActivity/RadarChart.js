// RadarChart.js
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const RadarChart = ({ radarChartData }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!radarChartData || radarChartData.length === 0) {
      return;
    }

    const width = 500;
    const height = 500;
    const radius = Math.min(width, height) / 2 - 10;

    // Supprimez le contenu existant du SVG
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const maxValue = Math.max(...radarChartData.map(data => data.value));

    const angleSlice = (Math.PI * 2) / radarChartData.length;

    // Créer l'échelle radiale
    const rScale = d3.scaleLinear()
      .domain([0, maxValue])
      .range([0, radius]);

    // Créer les lignes radar
    const radarLine = d3.lineRadial()
      .angle((d, i) => i * angleSlice)
      .radius(d => rScale(d.value));

    // Dessiner le polygone radar
    svg
      .datum(radarChartData)
      .append('path')
      .attr('class', 'radar-chart')
      .attr('d', radarLine)
      .attr('fill', 'steelblue')
      .attr('fill-opacity', 0.6);

    // Dessiner les axes radars
    const radarGrid = svg.append('g').attr('class', 'radar-grid');

    radarGrid.selectAll('.radar-grid-line')
      .data(radarChartData)
      .enter().append('line')
      .attr('class', 'radar-grid-line')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', (d, i) => rScale(maxValue) * Math.cos(angleSlice * i - Math.PI / 2))
      .attr('y2', (d, i) => rScale(maxValue) * Math.sin(angleSlice * i - Math.PI / 2))
      .attr('stroke', 'gray')
      .attr('stroke-width', 1)
      .attr('fill', 'none');

    // Ajouter les étiquettes radar
    radarGrid.selectAll('.radar-label')
      .data(radarChartData)
      .enter().append('text')
      .attr('class', 'radar-label')
      .attr('x', (d, i) => rScale(maxValue + 10) * Math.cos(angleSlice * i - Math.PI / 2))
      .attr('y', (d, i) => rScale(maxValue + 10) * Math.sin(angleSlice * i - Math.PI / 2))
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .text(d => d.label);

  }, [radarChartData]);

  return (
    <svg ref={svgRef}></svg>
  );
};

export default RadarChart;

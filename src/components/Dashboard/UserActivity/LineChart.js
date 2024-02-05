// LineChart.js
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const LineChart = ({ lineChartData }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!lineChartData || lineChartData.length === 0) {
      return;
    }

    // Configuration du graphique
    const width = 500;
    const height = 300;

    // Supprimez le contenu existant du SVG
    d3.select(svgRef.current).selectAll('*').remove();

    // Création de l'échelle pour l'axe des X
    const xScale = d3.scaleBand()
      .domain(lineChartData.map(item => item.date))
      .range([0, width])
      .padding(0.1);

    // Création de l'échelle pour l'axe des Y
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(lineChartData, item => item.value)])
      .range([height, 0]);

    // Création de l'axe des X
    const xAxis = d3.axisBottom(xScale);

    // Création de l'axe des Y
    const yAxis = d3.axisLeft(yScale);

    // Création de la ligne
    const line = d3.line()
      .x(item => xScale(item.date) + xScale.bandwidth() / 2)
      .y(item => yScale(item.value));

    // Création du SVG
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    // Ajout de l'axe des X
    svg.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(xAxis);

    // Ajout de l'axe des Y
    svg.append('g')
      .call(yAxis);

    // Ajout de la ligne
    svg.append('path')
      .datum(lineChartData)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 2)
      .attr('d', line);

  }, [lineChartData]);

  return (
    <svg ref={svgRef}></svg>
  );
};

export default LineChart;

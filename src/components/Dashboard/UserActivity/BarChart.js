// BarChart.js
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const BarChart = ({ barChartData }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!barChartData || barChartData.length === 0) {
      return;
    }

    // Configuration du graphique
    const width = 500;
    const height = 300;

    // Supprimez le contenu existant du SVG
    d3.select(svgRef.current).selectAll('*').remove();

    // Création de l'échelle pour l'axe des X
    const xScale = d3.scaleBand()
      .domain(barChartData.map(item => item.category))
      .range([0, width])
      .padding(0.1);

    // Création de l'échelle pour l'axe des Y
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(barChartData, item => item.value)])
      .range([height, 0]);

    // Création de l'axe des X
    const xAxis = d3.axisBottom(xScale);

    // Création de l'axe des Y
    const yAxis = d3.axisLeft(yScale);

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

    // Ajout des barres
    svg.selectAll('rect')
      .data(barChartData)
      .enter()
      .append('rect')
      .attr('x', item => xScale(item.category))
      .attr('y', item => yScale(item.value))
      .attr('width', xScale.bandwidth())
      .attr('height', item => height - yScale(item.value))
      .attr('fill', 'steelblue');

  }, [barChartData]);

  return (
    <svg ref={svgRef}></svg>
  );
};

export default BarChart;

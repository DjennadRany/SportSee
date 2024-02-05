// ActivityGraph.js
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const ActivityGraph = ({ activityData }) => {
  const svgRef = useRef();

  useEffect(() => {
    console.log('ActivityData in ActivityGraph:', activityData);

    if (!activityData || activityData.length === 0) {
      console.log('No activity data provided.');
      return;
    }

    const width = 500;
    const height = 300;

    d3.select(svgRef.current).selectAll('*').remove();

    const xScale = d3.scaleBand()
      .domain(activityData.map(item => item.day))  // Utiliser la propriété correcte pour la date
      .range([0, width])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(activityData, item => item.calories)])  // Utiliser la propriété correcte pour l'activité
      .range([height, 0]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    svg.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(xAxis);

    svg.append('g')
      .call(yAxis);

    svg.selectAll('rect')
      .data(activityData)
      .enter()
      .append('rect')
      .attr('x', item => xScale(item.day))
      .attr('y', item => yScale(item.calories))
      .attr('width', xScale.bandwidth())
      .attr('height', item => height - yScale(item.calories))
      .attr('fill', 'steelblue');
  }, [activityData]);

  return <svg ref={svgRef}></svg>;
};

export default ActivityGraph;

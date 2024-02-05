import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const GroupedBarChart = ({ data }) => {
  const chartRef = useRef();

  useEffect(() => {
    if (!data || data.length === 0) return;

    const margin = { top: 20, right: 40, bottom: 40, left: 40 };
    const width = 835 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const svg = d3.select(chartRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const transformedData = data.map((d, index) => ({ ...d, sessionNumber: index + 1 }));

    const xScale = d3.scaleBand()
      .domain(transformedData.map(d => d.sessionNumber.toString()))
      .range([0, width])
      .padding(0.1);

    const yScaleKg = d3.scaleLinear()
      .domain([0, d3.max(transformedData, d => d.kilogram)])
      .range([height, 0]);

    const yScaleCalories = d3.scaleLinear()
      .domain([0, d3.max(transformedData, d => d.calories)])
      .range([height, 0]);

    const xAxis = d3.axisBottom(xScale).tickSizeOuter(0);
    const yAxisRight = d3.axisRight(yScaleKg).tickSizeInner(-width).tickSizeOuter(0).tickPadding(10);
    const yAxisLeft = d3.axisLeft(yScaleCalories).tickSizeOuter(0).tickPadding(10);

    svg.append('line')
      .attr('x1', 0)
      .attr('x2', width)
      .attr('y1', height)
      .attr('y2', height)
      .style('stroke', 'lightgray');

    svg.append('line')
      .attr('x1', 0)
      .attr('x2', width)
      .attr('y1', 0)
      .attr('y2', 0)
      .style('stroke', 'lightgray');

    svg.append('g')
      .attr('transform', `translate(${width}, 0)`)
      .call(yAxisRight)
      .style('color', 'black')
      .style('stroke-width', '0.5');

    svg.append('g')
      .call(yAxisLeft)
      .style('color', 'black')
      .style('stroke-width', '0.5');

    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(xAxis)
      .selectAll('text')
      .style('text-anchor', 'middle')
      .style('fill', 'gray');

    const barWidth = 7;
    const spaceBetweenGraphs = 20; // Ajuster l'espacement

    // Groupe pour les barres de kilogrammes
    const kgGroup = svg.append('g').attr('class', 'kgGroup');

    kgGroup.selectAll('.barKg')
      .data(transformedData)
      .enter().append('rect')
      .attr('class', 'barKg')
      .attr('x', d => xScale(d.sessionNumber.toString()) - barWidth / 2)
      .attr('width', barWidth)
      .attr('y', d => yScaleKg(d.kilogram))
      .attr('height', d => height - yScaleKg(d.kilogram))
      .style('fill', 'black')
      .attr('rx', 3)
      .attr('ry', 0) // Bas plat
      .on('mouseover', handleMouseOver)
      .on('mouseout', handleMouseOut);

    // Groupe pour les barres de calories
    const caloriesGroup = svg.append('g').attr('class', 'caloriesGroup');

    caloriesGroup.selectAll('.barCalories')
      .data(transformedData)
      .enter().append('rect')
      .attr('class', 'barCalories')
      .attr('x', d => xScale(d.sessionNumber.toString()) - barWidth / 2 + spaceBetweenGraphs)
      .attr('width', barWidth)
      .attr('y', d => yScaleCalories(d.calories))
      .attr('height', d => height - yScaleCalories(d.calories))
      .style('fill', 'red')
      .attr('rx', 3)
      .attr('ry', 0) // Bas plat
      .on('mouseover', handleMouseOver)
      .on('mouseout', handleMouseOut);

    // Fondu gris pour englober le graphique, les calories, les kilogrammes et le carré rouge
    const overlayRect = svg.append('rect')
      .attr('class', 'overlayRect')
      .attr('width', width + spaceBetweenGraphs)
      .attr('height', height)
      .style('fill', 'transparent')
      .style('opacity', 0)
      .on('mouseover', handleMouseOver)
      .on('mouseout', handleMouseOut);

      function handleMouseOver(d) {
        if (!d || !d.sessionNumber) return; // Ajoutez cette vérification pour éviter les erreurs avec un objet de données non défini
      
        // Afficher l'overlay gris avec une légère opacité
        overlayRect.style('opacity', 0.1);
      
        // Afficher le carré rouge interactif
        svg.append('rect')
          .attr('class', 'tooltipRect')
          .attr('x', xScale(d.sessionNumber.toString()) - barWidth / 2)
          .attr('width', barWidth + spaceBetweenGraphs)
          .attr('y', 0)
          .attr('height', height)
          .style('fill', 'red')
          .style('opacity', 0.3);
      
        // Afficher les valeurs de kilogrammes et de calories en dessous
        svg.append('text')
          .attr('class', 'tooltipText')
          .attr('x', xScale(d.sessionNumber.toString()) + barWidth / 2 + spaceBetweenGraphs / 2)
          .attr('y', height + 15)
          .text(`Kg: ${d.kilogram}, Calories: ${d.calories}`)
          .style('text-anchor', 'middle')
          .style('fill', 'white');
      }
      

    function handleMouseOut() {
      // Cacher l'overlay gris
      overlayRect.style('opacity', 0);

      // Supprimer le carré rouge et le texte
      svg.selectAll('.tooltipRect, .tooltipText').remove();
    }
  }, [data]);

  return <svg ref={chartRef}></svg>;
};

export default GroupedBarChart;

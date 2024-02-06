import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const GroupedBarChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!data || data.length === 0) return;

    // Déclaration des constantes pour les marges et les dimensions du graphique
    const margin = { top: 20, right: 40, bottom: 40, left: 40 };
    const width = 835 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    // Sélection de l'élément SVG et ajout d'un groupe pour le graphique
    const svg = d3.select(chartRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Transformation des données pour inclure le numéro de session
    const transformedData = data.map((d, index) => ({ ...d, sessionNumber: index + 1 }));

    // Échelle pour l'axe x (numéro de session)
    const xScale = d3.scaleBand()
      .domain(transformedData.map(d => d.sessionNumber.toString()))
      .range([0, width])
      .padding(0.1);

    // Calcul de la plage de valeurs pour le domaine de l'axe y des kilogrammes
    const minDomainKg = 20; // Démarre à 20 kilogrammes
   
    const maxKilogram = d3.max(transformedData, d => d.kilogram);
    const upperLimit = maxKilogram + 20;
    console.log('Plage de valeurs pour le domaine des kilogrammes :', minDomainKg, '-', upperLimit);

    // Échelle pour l'axe y des kilogrammes
    const yScaleKg = d3.scaleLinear()
      .domain([minDomainKg, upperLimit])
      .range([height, 20]);

    // Définition de l'échelle logarithmique pour l'axe y des calories
    const yScaleCalories = d3.scaleLog()
      .domain([1, d3.max(transformedData, d => d.calories)])
      .range([height, 0]);

    // Définition des axes x et y
    const xAxis = d3.axisBottom(xScale).tickSizeOuter(0);
    const yAxisRight = d3.axisRight(yScaleKg)
      .tickSizeInner(-width)
      .tickSizeOuter(0)
      .tickPadding(10)
      .tickValues(d3.range(minDomainKg, upperLimit + 1, 30)); // Utilisation de d3.range pour générer les valeurs tous les 30

    // Ajout des axes au graphique
    svg.append('g')
      .attr('transform', `translate(${width}, 0)`)
      .call(yAxisRight)
      .style('color', '#9f9f9f')
      .style('stroke-width', '0.5');

    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(xAxis)
      .selectAll('text')
      .style('text-anchor', 'middle')
      .style('fill', '#9f9f9f');

    // Définition des dimensions des barres et de l'espace entre les groupes
    const barWidth = 7;
    const spaceBetweenGraphs = 20;

    // Groupe pour les barres de kilogrammes
    const kgGroup = svg.append('g').attr('class', 'kgGroup').attr('transform', 'translate(40, 0)');
    kgGroup.selectAll('.barKg')
      .data(transformedData)
      .enter().append('rect')
      .attr('class', 'barKg')
      .attr('x', d => xScale(d.sessionNumber.toString()) - barWidth / 2)
      .attr('width', barWidth)
      .attr('y', d => yScaleKg(d.kilogram))
      .attr('height', d => height - yScaleKg(d.kilogram))
      .style('fill', 'black')
      .attr('rx', 3) // Coin arrondi en haut à gauche et à droite
      .attr('ry', function(d, i) { return i === 0 ? 3 : 0; }) // Coin arrondi seulement en haut
      .on('mouseover', handleMouseOver)
      .on('mouseout', handleMouseOut);

    // Groupe pour les barres de calories
    const caloriesGroup = svg.append('g').attr('class', 'caloriesGroup').attr('transform', 'translate(35, 0)');
    caloriesGroup.selectAll('.barCalories')
      .data(transformedData)
      .enter().append('rect')
      .attr('class', 'barCalories')
      .attr('x', d => xScale(d.sessionNumber.toString()) - barWidth / 2 + spaceBetweenGraphs)
      .attr('width', barWidth)
      .attr('y', d => yScaleCalories(d.calories))
      .attr('height', d => height - yScaleCalories(d.calories))
      .style('fill', 'red')
      .attr('rx', 3) // Coin arrondi en haut à gauche et à droite
      .attr('ry', function(d, i) { return i === 0 ? 3 : 0; }) // Coin arrondi seulement en haut
      .on('mouseover', handleMouseOver)
      .on('mouseout', handleMouseOut);

    // Fonction de gestion de l'événement mouseover
// Fonction de gestion de l'événement mouseover
function handleMouseOver(d) {
  if (!d || typeof d.sessionNumber === 'undefined') return;

  const svg = d3.select(chartRef.current);

  svg.append('rect')
    .attr('class', 'overlayRect')
    .attr('x', 0)
    .attr('width', width)
    .attr('y', 0)
    .attr('height', height)
    .style('fill', 'darkgray')
    .style('opacity', 0.1);

  svg.append('rect')
    .attr('class', 'tooltipRect')
    .attr('x', xScale(d.sessionNumber.toString()) - barWidth / 2)
    .attr('width', barWidth + spaceBetweenGraphs)
    .attr('y', 0)
    .attr('height', height)
    .style('fill', 'red')
    .style('opacity', 0.3);

  svg.append('text')
    .attr('class', 'tooltipText')
    .attr('x', xScale(d.sessionNumber.toString()) + barWidth / 2 + spaceBetweenGraphs / 2)
    .attr('y', height + 15)
    .text(`Kg: ${d.kilogram}, Calories: ${d.calories}`)
    .style('text-anchor', 'middle')
    .style('fill', 'white');
}

function handleMouseOut() {
  d3.selectAll('.overlayRect, .tooltipRect, .tooltipText').remove();
}

    
  }, [data]);

  return <svg ref={chartRef}></svg>;
};

export default GroupedBarChart;

import React, { useEffect, useRef, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import isEqual from 'lodash/isEqual';
import './GroupedBarChart.css';

const GroupedBarChart = ({ data }) => {
  const prevData = useRef([]);
  const [yAxisDomain, setYAxisDomain] = useState([]);

  // Supprimez le useState et useEffect pour chartWidth puisque nous allons utiliser une largeur fixe

  useEffect(() => {
    if (!data || data.length === 0 || isEqual(prevData.current, data)) return;

    prevData.current = data;
    const maxKilogram = Math.max(...data.map(item => item.kilogram));
    const newYAxisDomain = [0, Math.ceil(maxKilogram / 10) * 10];
    setYAxisDomain(newYAxisDomain);
  }, [data]);

  return (
    <div className="charts-containerGroup">
      <div className='blockleg'>
    <h2 className="chart-title">Activité quotidienne</h2>
    <div className="legend">
      <span className="legend-item">
        <span className="legend-color-box" style={{ backgroundColor: 'black' }}></span>
        Poids (kg)
      </span>
      <span className="legend-item">
        <span className="legend-color-box" style={{ backgroundColor: 'red' }}></span>
        Calories brûlées (kCal)
      </span>
    </div>
    </div>
    <div className="recharts-wrapper" style={{ width: '100%', height: '300px' }}>
      <BarChart
        width={1024} // Définissez la largeur fixe ici
        height={300}
        data={data}
        margin={{ top: 20, right: 30, bottom: 20, left: 30 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="sessionNumber" interval={0} />
        <YAxis yAxisId="left" orientation="right" domain={yAxisDomain} />
        <YAxis yAxisId="right" orientation="left" hide />
        <Tooltip 
          contentStyle={{
            margin: '0px',
            padding: '10px',
            backgroundColor: 'rgb(255, 0, 0)',
            whiteSpace: 'nowrap',
            color: 'white'
          }}
          itemStyle={{
            display: 'block',
            paddingTop: '4px',
            paddingBottom: '4px',
            color: 'white'
          }}
        />
        <Bar dataKey="kilogram" fill="black" yAxisId="left" barSize={7} radius={[3, 3, 0, 0]} />
        <Bar dataKey="calories" fill="red" yAxisId="right" barSize={7} radius={[3, 3, 0, 0]} />
      </BarChart>
    </div>
    </div>
  );
};

export default GroupedBarChart;
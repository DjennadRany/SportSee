import React, { useEffect, useRef, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import isEqual from 'lodash/isEqual';

const GroupedBarChart = ({ data, averageSessions }) => {
  const prevData = useRef([]);
  const [yAxisDomain, setYAxisDomain] = useState();

  useEffect(() => {
    if (!data || data.length === 0 || isEqual(prevData.current, data)) return;

    prevData.current = data;
    // Trouver la valeur maximale de kilogrammes
    const maxKilogram = Math.max(...data.map(item => item.kilogram));
    // Trouver la valeur maximale de calories


    // Calculer l'échelle de l'axe des ordonnées pour les kilogrammes
    const newYAxisDomain = [20, Math.ceil(maxKilogram / 20) * 20 + 10];

    // Tronquer les valeurs de calories si elles dépassent le maximum de kilogrammes
    const caloriesAdjusted = data.map(item => ({
      ...item,
      calories: item.calories > maxKilogram ? maxKilogram : item.calories 
    }));

    // Mettre à jour l'état avec la nouvelle échelle des ordonnées et les données ajustées pour les calories
    setYAxisDomain(newYAxisDomain);
    prevData.current = caloriesAdjusted ;
    
  }, [data]);

  return (
    <div className="recharts-wrapper" style={{ position: 'relative', cursor: 'default', width: '835px', height: '300px' }}>
     
      <BarChart
        width={735}
        height={300}
        data={data}
        margin={{ top: 20, right: 40, bottom: 40, left: 40 }}
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
  );
};

export default GroupedBarChart;

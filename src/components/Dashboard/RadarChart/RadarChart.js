import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import './RadarChart.css';



const RadarChartComponent = ({ data, kindMapping }) => {
  if (!Array.isArray(data)) {
    console.error('RadarChartComponent expects data to be an array.', data);
    return null; // ou retourner un élément de fallback si nécessaire
  }

  const transformedData = data.map(item => ({
    ...item,
    kind: kindMapping[item.kind.toString()]
  }));

  return (
    <div style={{ width: '350px', background: '#4b4b4b', height: '300px', borderRadius: '5px' }}>
<RadarChart cx="50%" cy="50%" outerRadius="70%" width={350} height={300} data={transformedData}>
  <PolarGrid />
  <PolarAngleAxis dataKey="kind" />
  <PolarRadiusAxis angle={30} domain={[0, 'dataMax']} tick={false} />
  <Radar name="Performance" dataKey="value" stroke="#FF0101" fill="#FF0101" fillOpacity={0.7} />
</RadarChart>
    </div>
  );
};

export default RadarChartComponent;
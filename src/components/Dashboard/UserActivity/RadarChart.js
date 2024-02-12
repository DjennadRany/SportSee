import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

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
    <div style={{ width: '500px', background: '#4b4b4b', height: '300px', borderRadius: '12px' }}>
      <RadarChart cx={250} cy={150} outerRadius={100} width={500} height={300} data={transformedData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="kind" />
        <PolarRadiusAxis angle={30} domain={[0, 'dataMax']} />
        <Radar name="Performance" dataKey="value" stroke="red" fill="red" fillOpacity={0.6} />
      </RadarChart>
    </div>
  );
};

export default RadarChartComponent;
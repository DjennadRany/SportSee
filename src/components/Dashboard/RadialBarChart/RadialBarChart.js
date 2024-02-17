import React from 'react';
import { RadialBarChart, RadialBar, PolarAngleAxis } from 'recharts';
import './RadialBarChart.css'; 

const RadialBarChartComponent = ({ percentage }) => {
  const data = [{ name: 'Score', value: percentage, fill: '#ff0000' }];

  return (
    <div className="radial-bar-chart-container scroreBloc">
      <h2 className="radial-chart-title">Score</h2> {/* Titre ajouté */}
      <RadialBarChart
        width={300}
        height={300}
        innerRadius={105}
        outerRadius={140}
        barSize={10}
        data={data}
        startAngle={90}
        endAngle={450}
        cx="50%"
        cy="50%"
      >
        <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
        <RadialBar
          background
          dataKey="value"
          cornerRadius={50}
          fill="#ff0000"
          label={{
            position: 'insideStart',
            content: ({ viewBox }) => {
              const { cx, cy } = viewBox;
              return (
                <g className="radial-bar-chart-label">
                  <text className="percentage" x={cx} y={cy - 10} textAnchor="middle" dominantBaseline="central">
                    {`${Math.round(percentage)}%`}
                  </text>
                  <text className="objective" x={cx} y={cy + 20} textAnchor="middle" dominantBaseline="central">
                    de votre objectif
                  </text>
                </g>
              );
            }
          }}
        />
      </RadialBarChart>
    </div>
  );
};

export default RadialBarChartComponent;
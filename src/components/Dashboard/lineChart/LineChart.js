import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,

} from 'recharts';
import { useUserContext } from '../../../context/UserContext'; 
import './LineChart.css'; // Assurez-vous que le chemin est correct

// Composant personnalisé pour le Tooltip
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${payload[0].value} min`}</p>
      </div>
    );
  }

  return null;
};

const daysMap = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

const LineChartComponent = () => {
  const { userData } = useUserContext();
  const { averageSessions } = userData;

  if (!averageSessions || averageSessions.length === 0) {
    return <div>Aucune donnée disponible</div>;
  }

  const formattedData = [
    { day: '', sessionLength: 0 }, // Donnée fictive pour l'espacement avant "L"
    ...averageSessions.map(session => ({
      day: daysMap[session.day - 1],
      sessionLength: session.sessionLength
    })),
    { day: '', sessionLength: 0 }, // Donnée fictive pour l'espacement après "D"
  ];

  // Trouvez la session d'aujourd'hui pour le ReferenceDot
  const todaySession = formattedData[new Date().getDay()];
  const referenceLinePosition = todaySession.day; // Add this line


  const handleMouseMove = (e) => {
    if (e.isTooltipActive) {
      const wrapper = document.querySelector('.line-chart-wrapper');
      const tooltipPosition = e.activeCoordinate.x;
      const wrapperWidth = wrapper.offsetWidth;
      const percentage = (tooltipPosition / wrapperWidth) * 100;
      wrapper.style.background = `linear-gradient(to right, #FF0000 ${percentage}%, #E60000 ${percentage}%)`;
    }
  };

  const handleMouseLeave = () => {
    const wrapper = document.querySelector('.line-chart-wrapper');
    wrapper.style.background = '#FF0000'; // Couleur initiale
  };


  return (
    <div className="line-chart-wrapper">
      <h2 className="line-chart-title">Durée moyenne des sessions</h2>
      <ResponsiveContainer width={400} height={300}>
      <AreaChart
    data={formattedData}
    margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
    padding={{ left: 0, right: 0 }}
    onMouseMove={handleMouseMove}
    onMouseLeave={handleMouseLeave}>
         <defs>
  <linearGradient id="colorSession" x1="0" y1="0" x2="0" y2="1">
    <stop offset="5%" stopColor="#FFFFFF" stopOpacity={0.8}/>
    <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0}/>
  </linearGradient>
</defs>
        <XAxis dataKey="day" stroke="#FFFFFF" tickLine={false} axisLine={false}   padding={{ left: -50, right: -50 }}/>
        <YAxis hide={true} domain={['dataMin - 0', 'dataMax + 20']} />
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'red', strokeWidth: 3 }} />
        <ReferenceLine x={todaySession.day} stroke="red" ifOverflow="extendDomain" />
        <ReferenceLine x={referenceLinePosition} stroke="transparent" ifOverflow="extendDomain" />
          <Area type="monotone" dataKey="sessionLength" stroke="#FFFFFF" fillOpacity={1} fill="url(#colorSession)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartComponent;
import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine
} from 'recharts';
import { useUserContext } from '../../../context/UserContext.js'; 

// Composant personnalisé pour le Tooltip
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip" style={{ backgroundColor: '#FFFFFF', padding: '5px', border: '1px solid #cccccc', textAlign: 'center' }}>
        <p className="label">{`${payload[0].value} min`}</p>
      </div>
    );
  }

  return null;
};

const LineChartComponent = () => {
  const { userData } = useUserContext(); // Utilisez le hook pour accéder aux données du contexte
  const { averageSessions } = userData; // Destructurez pour obtenir averageSessions de userData

  // Vérifiez si averageSessions est défini et a des données
  if (!averageSessions || averageSessions.length === 0) {
    return <div>Aucune donnée disponible</div>;
  }

  // Formatage des données pour le graphique
  const formattedData = averageSessions.map(session => ({
    day: `J${session.day}`, // Assurez-vous que cela correspond à ce que vous attendez pour l'axe X
    sessionLength: session.sessionLength // Ou le nom de la clé que vous utilisez pour la longueur de la session
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={formattedData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <defs>
          <linearGradient id="colorSession" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#FF0000" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#FF0000" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <XAxis dataKey="day" />
        <YAxis hide={true} domain={['dataMin - 10', 'dataMax + 10']} />
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'red', strokeWidth: 2 }} />
        <ReferenceLine x="J5" stroke="red" label="Aujourd'hui" />
        <Area type="monotone" dataKey="sessionLength" stroke="#FF0000" fillOpacity={1} fill="url(#colorSession)" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default LineChartComponent;

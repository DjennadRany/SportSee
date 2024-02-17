import React, { useEffect } from 'react';
import { useUserContext } from '../../context/UserContext.js';
import { useParams } from 'react-router-dom';
import RadarChartComponent from '../../components/Dashboard/RadarChart/RadarChart.js';
import GroupedBarChart from '../../components/Dashboard/GroupedBarChart/GroupedBarChart.js';
import LineChartComponent from '../../components/Dashboard/lineChart/LineChart.js';
import RadialBarChartComponent from '../../components/Dashboard/RadialBarChart/RadialBarChart.js';
import { ResponsiveContainer } from 'recharts';
import NutritionFacts from '../../components/Dashboard/NutritionFacts/NutritionFacts.js';
import ProfilChart from '../../components/Dashboard/profilChart/profilChart.js'; // Ajoutez cette ligne pour importer ProfileChart

import './UserActivity.css'; // Assurez-vous que le chemin d'importation est correct

const UserActivity = () => {
  const { id } = useParams();
  const { fetchUserData, userData, loading } = useUserContext();

  useEffect(() => {
    fetchUserData(id);
  }, [fetchUserData, id]);

  // Ajoutez cette vérification pour vous assurer que userData et userData.activity sont définis
  if (loading || !userData || !userData.activity) {
    return <div>Loading user activity...</div>;
  }

  const transformedData = userData.activity.map(session => ({
    day: session.day,
    sessionLength: session.calories
  }));

  const goal = 10000; // Exemple d'objectif fixe
  const currentValue = userData.activity.reduce((acc, session) => acc + session.calories, 0);
  const percentage = (currentValue / goal) * 100;

  return (
    <div className="user-activity-container">
<ProfilChart userData={userData} loading={loading} />
      <div className="charts-container">
        <div className="main-charts">
          <GroupedBarChart data={userData.activity} averageSessions={userData.averageSessions} />
          <div className="blockcomptree">
            <LineChartComponent data={transformedData} />
            {userData.performance && userData.performance.data && (
              <RadarChartComponent data={userData.performance.data} kindMapping={userData.performance.kind} />
            )}
            <ResponsiveContainer width="100%" height={400}>
              <RadialBarChartComponent percentage={percentage} />
            </ResponsiveContainer>
          </div>
        </div>
        <div className="side-charts">
          <NutritionFacts />
        </div>
      </div>
    </div>
  );
};

export default UserActivity;
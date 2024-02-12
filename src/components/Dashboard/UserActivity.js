import React, { useEffect } from 'react';
import { useUserContext } from '../../context/UserContext';
import { useParams } from 'react-router-dom';
import RadarChartComponent from './UserActivity/RadarChart';
import GroupedBarChart from './UserActivity/GroupedBarChart.js';
import LineChartComponent from './UserActivity/LineChart';

const UserActivity = () => {
  const { id } = useParams();
  const { fetchUserData, userData, loading } = useUserContext(); // Utilisez directement l'état de chargement de UserContext
  const transformedData = userData.activity.map(session => ({
    day: session.day,
    sessionLength: session.calories
  }));

  useEffect(() => {
    fetchUserData(id);
  }, [fetchUserData, id]);
  console.log('userData:', userData.activity);
  return (
    <div>
      <h2>User Activity</h2>
      {loading ? (
        <div>Loading user activity...</div>
      ) : (
        <>
          <div>
            <h3>Grouped Bar Chart</h3>
            {userData.activity ? (
              <GroupedBarChart data={userData.activity} averageSessions={userData.averageSessions} />
            ) : (
              <div>No activity data available.</div>
            )}
          </div>
          
          <div>
            <h3>Radar Chart</h3>
            {userData.performance && userData.performance.data && Array.isArray(userData.performance.data) ? (
              <RadarChartComponent data={userData.performance.data} kindMapping={userData.performance.kind} />
            ) : (
              <div>No performance data available.</div>
            )}
          </div>
          <div>
            <h3>Line Chart</h3>
            {transformedData && transformedData.length > 0 ? (
              <LineChartComponent data={transformedData} />
            ) : (
              <div>No line chart data available.</div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default UserActivity;
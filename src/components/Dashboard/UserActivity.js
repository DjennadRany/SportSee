// UserActivity.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GroupedBarChart from './UserActivity/GroupedBarChart.js';

const UserActivity = () => {
  const [activityData, setActivityData] = useState([]);

  useEffect(() => {
    // Appel API pour récupérer les données d'activité
    axios.get('http://localhost:3000/user/12/activity')
      .then(response => {
        console.log('Activity Data:', response.data.data.sessions);
        setActivityData(response.data.data.sessions);
      })
      .catch(error => {
        console.error('Error fetching user activity:', error);
      });
  }, []);

  return (
    <div>
      <h2>User Activity</h2>
      {activityData.length > 0 ? (
        <GroupedBarChart data={activityData} />
      ) : (
        <div>Loading user activity...</div>
      )}
    </div>
  );
};

export default UserActivity;

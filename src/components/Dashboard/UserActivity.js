import React, { useEffect, useState } from 'react';
import { useUserContext } from '../../context/UserContext';
import { useParams } from 'react-router-dom';
import GroupedBarChart from './UserActivity/GroupedBarChart.js';

const UserActivity = () => {
  const { id } = useParams();
  const { fetchUserData, userData } = useUserContext();
  const [activityData, setActivityData] = useState([]);

  useEffect(() => {
    fetchUserData(id);
  }, [fetchUserData, id]);

  useEffect(() => {
    setActivityData(userData.activity);
  }, [userData.activity]);

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

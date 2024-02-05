import React, { useEffect, useState } from 'react';
import { fetchData } from '../services/apiService';

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Appel à l'API pour récupérer les données
    fetchData('user/12')
      .then((data) => setUserData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  const { id, data } = userData;

  if (!data) {
    return <div>Loading...</div>;
  }
   
  const { userInfos, todayScore, keyData } = data;
  
  return (
    <div>
      <h1>User Profile</h1>
      <p>User ID: {id}</p>
      {userInfos ? (
        <>
          <p>Name: {userInfos.firstName} {userInfos.lastName}</p>
          <p>Age: {userInfos.age}</p>
        </>
      ) : (
        <p>User information not available</p>
      )}
      <p>Today's Score: {todayScore}</p>
  
      <h2>Key Data</h2>
      {keyData ? (
        <ul>
          <li>Calorie Count: {keyData.calorieCount}</li>
          <li>Protein Count: {keyData.proteinCount}</li>
          <li>Carbohydrate Count: {keyData.carbohydrateCount}</li>
          <li>Lipid Count: {keyData.lipidCount}</li>
        </ul>
      ) : (
        <p>Key data not available</p>
      )}
    </div>
  );
};

export default ProfilePage;

// UserKeyData.js
import React from 'react';

const UserKeyData = ({ keyData }) => {
  const { calorieCount, proteinCount, carbohydrateCount, lipidCount } = keyData;

  return (
    <div>
      <p>Calorie Count: {calorieCount}</p>
      <p>Protein Count: {proteinCount}</p>
      <p>Carbohydrate Count: {carbohydrateCount}</p>
      <p>Lipid Count: {lipidCount}</p>
    </div>
  );
};

export default UserKeyData;

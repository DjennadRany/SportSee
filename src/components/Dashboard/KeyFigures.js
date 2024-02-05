// KeyFigures.js
import React from 'react';
import { useUserContext } from '../../context/UserContext';

const KeyFigures = () => {
  // Utilisez le crochet personnalisé pour accéder aux données utilisateur
  const { keyData } = useUserContext();

  return (
    <div>
      <h2>Key Figures</h2>
      {keyData ? (
        <>
          <p>Calories: {keyData.calorie}</p>
          <p>Macronutrient: {keyData.macronutrient}</p>
          {/* Ajoutez d'autres éléments en fonction de votre structure de données */}
        </>
      ) : (
        <div>Loading key figures...</div>
      )}
    </div>
  );
};

export default KeyFigures;

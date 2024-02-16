import React from 'react';
import { useUserContext } from '../../../context/UserContext';
import iconCalories from '../../../assets/iconNut/calories-iconfire.png';
import iconProtein from '../../../assets/iconNut/protein-iconprot.png';
import iconCarbs from '../../../assets/iconNut/carbs-iconglu.png';
import iconFat from '../../../assets/iconNut/fat-iconlip.png';
import './NutritionFacts.css';

const NutritionFact = ({ icon, amount, label }) => (
<div className="nutrition-fact">
  <div className="icon-container">
    <img src={icon} alt={label} className="nutrition-icon" />
  </div>
  <div className="nutrition-info">
    <span className="nutrition-amount">{amount}</span>
    <span className="nutrition-label">{label}</span>
  </div>
</div>
);

const NutritionFacts = () => {
  const { userData, loading } = useUserContext();

  // Vérification si les données sont en cours de chargement ou si les données nutritionnelles ne sont pas disponibles
  if (loading || !userData || !userData.keyData) {
    return <div>Loading...</div>;
  }

  // Accès aux données nutritionnelles
  const { calorieCount, proteinCount, carbohydrateCount, lipidCount } = userData.keyData;

  return (
    <div className="nutrition-facts-container">
    <NutritionFact icon={iconCalories} amount={`${calorieCount}kCal`} label="Calories" />
<NutritionFact icon={iconProtein} amount={`${proteinCount}g`} label="Proteines" />
<NutritionFact icon={iconCarbs} amount={`${carbohydrateCount}g`} label="Glucides" />
<NutritionFact icon={iconFat} amount={`${lipidCount}g`} label="Lipides" />
    </div>
  );
};

export default NutritionFacts;
import React from 'react';
import './profilChart.css';
import { useUserContext } from '../../../context/UserContext'; // Ajustez le chemin selon votre structure de dossiers

const ProfileChart = () => {
  const { userData, loading } = useUserContext();

  // Vérification si les données sont en cours de chargement
  if (loading) {
    return <div>Loading...</div>;
  }

  // Vérification si les données de l'utilisateur sont disponibles
  if (!userData || !userData.user) {
    return <div>Données non disponibles.</div>;
  }

  // Accès aux données de l'utilisateur
  const { firstName } = userData.user;


  return (
    <div className="profile-chart-container">
    <h2>Bonjour, <span>{firstName}</span></h2>
    <p>Félicitations ! Vous avez explosé vos objectifs hier 👏</p>
  
  </div>
  );
};

export default ProfileChart;
import React from 'react';
import { Link } from 'react-router-dom';
import './HorizontalNav.css'; // Assurez-vous que le fichier CSS est correctement importé
import logo from '../../../assets/logo.png'; // Adjust the path according to the actual location

const HorizontalNav = () => {
  return (
    <nav className="horizontal-nav">
 <img src={logo} alt="Logo" />
      <Link className="nav-link" to="/user/12/">Accueil</Link>
      <Link className="nav-link" to="/user/12/">Profil</Link>
      <Link className="nav-link" to="/user/12/">Réglage</Link>
      <Link className="nav-link" to="/user/18/">Communauté</Link>
    </nav>
  );
};

export default HorizontalNav;
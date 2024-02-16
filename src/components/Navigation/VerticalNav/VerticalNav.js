import React from 'react';
import { Link } from 'react-router-dom';
import iconYoga from '../../../assets/iconyoga.png';
import iconVelo from '../../../assets/iconvelo.png';
import iconNatation from '../../../assets/iconnage.png';
import iconMuscu from '../../../assets/iconmuscu.png';
import './VerticalNav.css';

const VerticalNav = () => {
  return (
    <aside className="vertical-nav">
   
      <Link to="/user/12/" className="nav-item">
        <img src={iconYoga} alt="Yoga" />
      </Link>
      <Link to="/user/12/" className="nav-item">
        <img src={iconVelo} alt="Vélo" />
      </Link>
      <Link to="/user/12/" className="nav-item">
        <img src={iconNatation} alt="Natation" />
      </Link>
      <Link to="/user/18/" className="nav-item">
        <img src={iconMuscu} alt="Musculation" />
      </Link>
      {/* Ajoutez d'autres liens si nécessaire */}
      <div className="nav-footer">
        <span>Copiryght 2022 SportSee</span>
      </div>
    </aside>
  );
};

export default VerticalNav;
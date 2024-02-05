import React from 'react';
import { Link } from 'react-router-dom';

const HorizontalNav = () => {
  return (
    <nav>
      <Link to="/user-profile">User Profile</Link>
      <Link to="/user-activity">User Activity</Link>
      <Link to="/key-figures">Key Figures</Link>
    </nav>
  );
};

export default HorizontalNav;

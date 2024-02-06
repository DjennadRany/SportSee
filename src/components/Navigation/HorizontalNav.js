import React from 'react';
import { Link } from 'react-router-dom';

const HorizontalNav = () => {
  return (
    <nav>
      <Link to="/user/12/activity">User Activity</Link>
      <Link to="/user/12/key-figures">Key Figures</Link>
    </nav>
  );
};

export default HorizontalNav;

import React from 'react';
import { Link } from 'react-router-dom';

const VerticalNav = () => {
  return (
    <aside>
   
      <Link to="/user-activity">Activity</Link>
      <Link to="/key-figures">Key Figures</Link>
    </aside>
  );
};

export default VerticalNav;

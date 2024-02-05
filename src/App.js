// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserContextProvider } from './context/UserContext';
import HorizontalNav from './components/Navigation/HorizontalNav';
import VerticalNav from './components/Navigation/VerticalNav';
import UserProfile from './components/Dashboard/UserProfile.js';
import UserActivity from './components/Dashboard/UserActivity.js';
import KeyFigures from './components/Dashboard/KeyFigures.js';
import axios from 'axios';

const App = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Faites l'appel API ici et mettez à jour le state
    const userId = 12; // Remplacez par l'ID utilisateur approprié

    // Exemple avec axios
    axios.get(`http://localhost:3000/user/${userId}`)
      .then(response => {
        setUserData(response.data.data); // Modification ici pour extraire data
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []); 

  return (
    <Router>
      {/* Passer les propriétés attendues à UserContextProvider */}
      <UserContextProvider
        userInfos={userData && userData.userInfos}
        keyData={userData && userData.keyData}
      >
        <div>
          <HorizontalNav />
          <VerticalNav />

          <Routes>
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/user-activity" element={<UserActivity />} />
            <Route path="/key-figures" element={<KeyFigures />} />
          </Routes>
        </div>
      </UserContextProvider>
    </Router>
  );
};

export default App;

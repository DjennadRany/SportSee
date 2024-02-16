import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Import Navigate
import { UserContextProvider } from './context/UserContext';
import HorizontalNav from './components/Navigation/HorizontalNav/HorizontalNav';
import VerticalNav from './components/Navigation/VerticalNav/VerticalNav';
import UserActivity from './tamplet/userActivity/UserActivity';
import NotFound from './tamplet/NotFound';
import './App.css'; 


const App = () => {

  return (
    <Router>
      <div>
        <HorizontalNav />
        <div className="blockApp">
        <VerticalNav />

        <Routes>
          <Route path="/" element={<Navigate replace to={`/user/12/`} />} />
          <Route path="/user/:id/" element={
            <UserContextProvider>
              <UserActivity />
            </UserContextProvider>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
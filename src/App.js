import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserContextProvider } from './context/UserContext';
import HorizontalNav from './components/Navigation/HorizontalNav';
import VerticalNav from './components/Navigation/VerticalNav';
import UserActivity from './components/Dashboard/UserActivity';
import KeyFigures from './components/Dashboard/KeyFigures';
import NotFound from './components/NotFound';

const App = () => {
  return (
    <Router>
      <UserContextProvider>
        <div>
          <HorizontalNav />
          <VerticalNav />

          <Routes>
            <Route path="/user/:id/activity" element={<UserActivity />} />
            <Route path="/user/:id/key-figures" element={<KeyFigures />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </UserContextProvider>
    </Router>
  );
};

export default App;

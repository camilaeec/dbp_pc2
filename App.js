import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './page/Navbar';
import Register from './page/Register';
import Login from './page/Login';
import AnimeList from './page/AnimeList';
import Favorites from './page/Favorites';
import History from './page/History';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div>hghghg</div>
      <div className="min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route
              path="/animes"
              element={isAuthenticated ? <AnimeList /> : <Navigate to="/login" />}
            />
            <Route
              path="/favorites"
              element={isAuthenticated ? <Favorites /> : <Navigate to="/login" />}
            />
            <Route
              path="/history"
              element={isAuthenticated ? <History /> : <Navigate to="/login" />}
            />
            <Route path="/" element={<Navigate to="/animes" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ isAuthenticated, onLogout }) {
  return (
    <nav className="bg-blue-600 text-white">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">SparkyRoll</Link>
        <div className="space-x-4">
          {isAuthenticated ? (
            <>
              <Link to="/animes" className="hover:text-blue-200">Animes</Link>
              <Link to="/favorites" className="hover:text-blue-200">Favoritos</Link>
              <Link to="/history" className="hover:text-blue-200">Historial</Link>
              <button onClick={onLogout} className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded">
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-200">Iniciar sesión</Link>
              <Link to="/register" className="hover:text-blue-200">Registrarse</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      if (response.status === 200) {
        onLogin();
        navigate('/animes');
      }
    } catch (error) {
      console.error('Error de inicio de sesión:', error);
      alert('Error de inicio de sesión. Por favor, intenta de nuevo.');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block mb-1">Correo electrónico</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded text-gray-900"
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1">Contraseña</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded text-gray-900"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Iniciar Sesión
        </button>
      </form>
      <p className="mt-4 text-center">
        ¿No tienes una cuenta?{' '}
        <button onClick={() => navigate('/register')} className="text-blue-500 hover:underline">
          Regístrate aquí
        </button>
      </p>
    </div>
  );
}

export default Login;
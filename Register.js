import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    try {
      const response = await axios.post('http://3.90.3.179:8000/api/auth/register', { email, password });
      if (response.status === 200) {
        navigate('/login');
      }
    } catch (error) {
      console.error('Error de registro:', error);
      alert('Error en el registro. Por favor, intenta de nuevo.');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Registro</h2>
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
        <div>
          <label htmlFor="confirmPassword" className="block mb-1">Confirmar Contraseña</label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded text-gray-900"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Registrarse
        </button>
      </form>
      <p className="mt-4 text-center">
        ¿Ya tienes una cuenta?{' '}
        <button onClick={() => navigate('/login')} className="text-blue-500 hover:underline">
          Inicia sesión aquí
        </button>
      </p>
    </div>
  );
}

export default Register;
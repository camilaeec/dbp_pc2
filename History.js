import React, { useState, useEffect } from 'react';
import axios from 'axios';

function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await axios.get('http://3.90.3.179:8000/api/user/history');
      setHistory(response.data);
    } catch (error) {
      console.error('Error al obtener el historial:', error);
    }
  };

  const removeFromHistory = async (historyId) => {
    try {
      await axios.delete('http://3.90.3.179:8000/api/user/history', { data: { historyId } });
      setHistory(history.filter(item => item.id !== historyId));
    } catch (error) {
      console.error('Error al eliminar del historial:', error);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Historial de Visualización</h1>
      {history.length === 0 ? (
        <p>Aún no has visto ningún anime.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {history.map((item) => (
            <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                <p className="text-sm mb-4">Visto el: {new Date(item.watchedAt).toLocaleDateString()}</p>
                <button
                  onClick={() => removeFromHistory(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Eliminar del Historial
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default History;
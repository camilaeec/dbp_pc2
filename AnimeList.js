import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AnimeList() {
  const [animes, setAnimes] = useState([]);

  useEffect(() => {
    fetchAnimes();
  }, []);

  const fetchAnimes = async () => {
    try {
      const response = await axios.get('http://3.90.3.179:8000/api/anime/list');
      setAnimes(response.data);
    } catch (error) {
      console.error('Error al obtener la lista de animes:', error);
    }
  };

  const addToFavorites = async (animeId) => {
    try {
      await axios.post('/api/user/favorites', { animeId });
      alert('¡Añadido a favoritos!');
    } catch (error) {
      console.error('Error al añadir a favoritos:', error);
    }
  };

  const addToHistory = async (animeId) => {
    try {
      await axios.post('/api/user/history', { animeId });
      alert('¡Añadido al historial!');
    } catch (error) {
      console.error('Error al añadir al historial:', error);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Lista de Animes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {animes.map((anime) => (
          <div key={anime.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <img src={anime.image} alt={anime.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{anime.title}</h2>
              <p className="text-sm mb-4">{anime.description}</p>
              <div className="flex justify-between">
                <button
                  onClick={() => addToFavorites(anime.id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Añadir a Favoritos
                </button>
                <button
                  onClick={() => addToHistory(anime.id)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  Marcar como Visto
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AnimeList;
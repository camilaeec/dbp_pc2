import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const response = await axios.get('http://3.90.3.179:8000/api/user/favorites');
      setFavorites(response.data);
    } catch (error) {
      console.error('Error al obtener favoritos:', error);
    }
  };

  const removeFromFavorites = async (animeId) => {
    try {
      await axios.delete('/api/user/favorites', { data: { animeId } });
      setFavorites(favorites.filter(anime => anime.id !== animeId));
    } catch (error) {
      console.error('Error al eliminar de favoritos:', error);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Mis Favoritos</h1>
      {favorites.length === 0 ? (
        <p>Aún no has añadido ningún favorito.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((anime) => (
            <div key={anime.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <img src={anime.image} alt={anime.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{anime.title}</h2>
                <p className="text-sm mb-4">{anime.description}</p>
                <button
                  onClick={() => removeFromFavorites(anime.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Eliminar de Favoritos
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
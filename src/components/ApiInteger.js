import React, { useState, useEffect } from 'react';

function JokeComponent() {
  const [localJokes, setLocalJokes] = useState([]);
  const [renderJoke, setRenderJoke] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchJokes();
  }, []);

  const fetchJokes = async () => {
    try {
      setLoading(true);
      
      // Requête vers l'API locale
      const localResponse = await fetch('http://localhost:3000/api/v1/jokes/random');
      const localJson = await localResponse.json();
      setLocalJokes(localJson);

      // Requête vers l'API sur Render.com
      const renderResponse = await fetch('https://carambar-api-dhjw.onrender.com/api/v1/jokes/random');
      if (!renderResponse.ok) {
        throw new Error(`HTTP error! status: ${renderResponse.status}`);
      }
      const renderData = await renderResponse.json();
      setRenderJoke(renderData);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error}</div>;
  if (!renderJoke && localJokes.length === 0) return <div>Aucune blague trouvée.</div>;

  return (
    <div>
      <h2>Blague de Render.com</h2>
      {renderJoke && (
        <div>
          <h3>Blague #{renderJoke.id}</h3>
          <p><strong>Setup:</strong> {renderJoke.setup}</p>
          <p><strong>Punchline:</strong> {renderJoke.punchline}</p>
          <p><small>Créé le: {new Date(renderJoke.createdAt).toLocaleString()}</small></p>
          <p><small>Mis à jour le: {new Date(renderJoke.updatedAt).toLocaleString()}</small></p>
        </div>
      )}

      <h2>Blagues Locales</h2>
      {localJokes.map(joke => (
        <div key={joke.id}>
          <h3>Blague #{joke.id}</h3>
          <p><strong>Setup:</strong> {joke.setup}</p>
          <p><strong>Punchline:</strong> {joke.punchline}</p>
          <p><small>Créé le: {new Date(joke.createdAt).toLocaleString()}</small></p>
          <p><small>Mis à jour le: {new Date(joke.updatedAt).toLocaleString()}</small></p>
        </div>
      ))}

      <button onClick={fetchJokes} className='joke-button'>Nouvelles blagues</button>
    </div>
  );
}

export default JokeComponent;

import React, { useState, useEffect } from 'react';


function JokeComponent() {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchJoke();
  }, []);

  const fetchJoke = async () => {
    try {
      const response = await fetch('https://carambar-api-dhjw.onrender.com');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setJoke(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error}</div>;
  if (!joke) return <div>Aucune blague trouvée.</div>;

  return (
    <div>
      <h2>Blague #{joke.id}</h2>
      <p><strong>Setup:</strong> {joke.setup}</p>
      <p><strong>Punchline:</strong> {joke.punchline}</p>
      <p><small>Créé le: {new Date(joke.createdAt).toLocaleString()}</small></p>
      <p><small>Mis à jour le: {new Date(joke.updatedAt).toLocaleString()}</small></p>
      <button onClick={fetchJoke} className='joke-button'>Nouvelle blague</button>
    </div>
  );
}

export default JokeComponent;

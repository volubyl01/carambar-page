import React, { useState, useEffect } from "react";

function ApiInteger() {
	const [renderJoke, setRenderJoke] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetchJoke();
	}, []);

	const fetchJoke = async () => {
		try {
		  setLoading(true);
		  setError(null);
	  
		  // Requête vers l'API sur Render.com ou en local
		  const API_URL = process.env.REACT_APP_API_URL || "https://carambar-api-dhjw.onrender.com";
		  const response = await fetch(`${API_URL}/api/v1/jokes/random`);
	  
		  if (!response.ok) {
			const errorText = await response.text();
			console.error('Réponse API:', errorText);
			throw new Error(`HTTP error! status: ${response.status}`);
		  }
	  
		  const renderData = await response.json();
		  setRenderJoke(renderData);
		} catch (e) {
		  console.error('Erreur lors de la requête:', e);
		  setError(e.message);
		} finally {
		  setLoading(false);
		}
	  };
	  

	if (loading) return <div>Chargement...</div>;
	if (error) return <div>Erreur : {error}</div>;
	if (!renderJoke) return <div>Aucune blague trouvée.</div>;

	return (
		<div>
			<div className="la-blague-numero">
				<h3>Blague n°{renderJoke.id}</h3>
			
				<p>{renderJoke.setup}</p>
				<p>{renderJoke.punchline}</p>

				<p className="dates">
					<small>
						Créé le: {new Date(renderJoke.createdAt).toLocaleString()}
					</small>
				
					<small>
						Mis à jour le: {new Date(renderJoke.updatedAt).toLocaleString()}
					</small>
				</p>
			</div>
			<button onClick={fetchJoke} className="joke-button">
				blague suivante
			</button>
		</div>
	);
}

export default ApiInteger;
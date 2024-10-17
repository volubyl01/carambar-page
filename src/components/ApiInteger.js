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

			// Requête vers l'API sur Render.com
			const API_URL = process.env.REACT_APP_API_URL || "https://carambar-api-dhjw.onrender.com";
			const renderResponse = await fetch(`${API_URL}/api/v1/jokes/random`);
			if (!renderResponse.ok) {
				throw new Error(`HTTP error! status: ${renderResponse.status}`);
			}
			const responseText = await renderResponse.text();
			try {
				const renderData = JSON.parse(responseText);
				setRenderJoke(renderData);
			} catch (parseError) {
				console.error("Erreur de parsing JSON:", responseText);
				throw new Error("Réponse invalide du serveur");
			}
		} catch (e) {
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
			<h2>Blague de Render.com</h2>
			<div>
				<h3>Blague #{renderJoke.id}</h3>
				<p>
					<strong>Setup:</strong> {renderJoke.setup}
				</p>
				<p>
					<strong>Punchline:</strong> {renderJoke.punchline}
				</p>
				<p>
					<small>
						Créé le: {new Date(renderJoke.createdAt).toLocaleString()}
					</small>
				</p>
				<p>
					<small>
						Mis à jour le: {new Date(renderJoke.updatedAt).toLocaleString()}
					</small>
				</p>
			</div>
			<button onClick={fetchJoke} className="joke-button">
				Nouvelle blague
			</button>
		</div>
	);
}

export default ApiInteger;

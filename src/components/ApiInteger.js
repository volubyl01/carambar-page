import React, { useState, useEffect } from "react";
import RippleButton from "./RippleButton";
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";

// Définir l'URL de l'API en fonction de l'environnement
const API_URL =
	process.env.NODE_ENV === "development"
		? "http://localhost:3000/api/v1/jokes"
		: process.env.REACT_APP_API_URL ||
		  "https://carambar-api-dhjw.onrender.com/api/v1/jokes";

console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("REACT_APP_API_URL:", process.env.REACT_APP_API_URL);

function ApiInteger() {
	const [renderJoke, setRenderJoke] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [showPunchline, setShowPunchline] = useState(false);

	useEffect(() => {
		fetchJoke();
	}, []);

	// pour formater la date
	const formatDate = (dateString) => {
		if (!dateString) return "Date inconnue";
		try {
			const date = parseISO(dateString);
			if (isNaN(date.getTime())) {
				throw new Error("Invalid date");
			}
			return format(date, "dd MMMM yyyy 'à' HH:mm:ss", { locale: fr });
		} catch (error) {
			console.error(
				"Erreur de formatage de la date:",
				error,
				"pour la chaîne:",
				dateString
			);
			return "Date invalide";
		}
	};

	const fetchJoke = async () => {
		try {
			setLoading(true);
			setError(null);
			setShowPunchline(false);

			console.log("Fetching joke from:", API_URL);
			const response = await fetch(`${API_URL}/random`);

			if (!response.ok) {
				const errorText = await response.text();
				console.error("API Response:", errorText);
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const renderData = await response.json();
			console.log("Date brute createdAt:", renderData.createdAt);
			console.log("Date brute updatedAt:", renderData.updatedAt);
			setRenderJoke(renderData);
		} catch (e) {
			console.error("Error fetching joke:", e);
			setError(e.message);
		} finally {
			setLoading(false);
		}
	};

	const togglePunchline = () => {
		setShowPunchline(!showPunchline);
	};

	if (loading) return <div>Chargement...</div>;
	if (error) return <div>Erreur : {error}</div>;
	if (!renderJoke) return <div>Aucune blague trouvée !</div>;

	return (
		<div>
			<div className="la-blague-numero">
				<h2>Blague n°{renderJoke.id}</h2>
				<p>{renderJoke.setup}</p>

				<RippleButton onClick={togglePunchline} className="punchline-button">
					{showPunchline ? "Cacher la solution" : "Voir la solution !"}
				</RippleButton>
				{showPunchline && <p>{renderJoke.punchline}</p>}

				<p className="dates">
					<small>Créé le: {formatDate(renderJoke.createdAt)} <br/>
					Mis à jour le: {formatDate(renderJoke.updatedAt)}</small>
				</p>
			</div>

			<button onClick={fetchJoke} className="joke-button">
				Blague suivante
			</button>
		</div>
	);
}
console.log("API_URL being used:", API_URL);

export default ApiInteger;

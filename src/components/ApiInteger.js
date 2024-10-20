import React, { useState, useEffect } from "react";
import RippleButton from "./RippleButton";

// Définir l'URL de l'API en fonction de l'environnement
const API_URL = process.env.REACT_APP_API_URL || "https://carambar-api-dhjw.onrender.com/api/v1/jokes";

function ApiInteger() {
    const [renderJoke, setRenderJoke] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showPunchline, setShowPunchline] = useState(false);

    useEffect(() => {
        fetchJoke();
    }, []);

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
    if (!renderJoke) return <div>Aucune blague trouvée.</div>;

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
                    <small>
                        Créé le: {new Date(renderJoke.createdAt).toLocaleString()}
                    </small>

                    <small>
                        Mis à jour le: {new Date(renderJoke.updatedAt).toLocaleString()}
                    </small>
                </p>
            </div>
            
            <button onClick={fetchJoke} className="joke-button">Blague suivante</button>
        </div>
    );
}

export default ApiInteger;

// import logo from './logo.svg';
import banner from "./images/banner-carambar.png";
import "./App.css";
import React from "react";
import ApiInteger from "./components/ApiInteger";

function App() {
	return (
		<div className="Body">

			<header className="App-header">
				<img src={banner} className="App-logo" alt="banner" />
			</header>
			<div className="joke-button">
				<h1>Blague aléatoire</h1>
				<ApiInteger />
			</div>
		</div>
	);
}

export default App;

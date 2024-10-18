// import logo from './logo.svg';
import banner from "./images/banner-carambar.png";
import footer from "./images/banner-carambar.png";
import "./App.css";
import React from "react";
import ApiInteger from "./components/ApiInteger";

function App() {
	return (
		<div className="App">
		<div className="App-content">
		  <header className="App-header">
		  <img src={banner} className="App-logo" alt="banner" />
		  <h1>Les Blagues Carambar</h1>
		  </header>
		  <main className="joke-section">
			<ApiInteger />
		  </main>
		</div>
		<footer className="App-footer">
			<div className="contact">
		  <p>Contact</p>
		  </div>
		</footer>
	  </div>
	  );
	}

export default App;

import React from "react";
import banner from "./images/banner-carambar.png";
import "./App.css";
import ApiInteger from "./components/ApiInteger";

// composant header
function Header() {
  return (
    <header className="App-header">
      <img src={banner} className="App-logo" alt="banner" />
      <h1>Les blagues Carambar</h1>
    </header>
  );
}

// composant Footer
function Footer() {
  return (
    <footer className="App-footer">
      <p>Contact</p>
    </footer>
  );
}

function App() {
  return (
    <div className="App">
      <Header />
      <main className="joke-section">
        <ApiInteger />
      </main>
      <Footer />
    </div>
  );
}

export default App;


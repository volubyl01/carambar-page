import React, { useState } from 'react';
import banner from "./images/logo-carambar.png";
import "./App.css";
import ApiInteger from "./components/ApiInteger";
import ContactForm from "./components/ContactForm"; 

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
	const [showContactForm, setShowContactForm] = useState(false);

	const toggleContactForm = () => {
	  setShowContactForm(!showContactForm);
	};
  return (
    <footer className="App-footer">
	  <button onClick={toggleContactForm} className="button-form">
        {showContactForm ? "Fermer" : "Recevoir les liens des repos"}
      </button>
	  {showContactForm && <ContactForm />}
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


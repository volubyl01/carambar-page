// import logo from './logo.svg';
import banner from './images/banner-carambar.png';
import './App.css';
import React from 'react';
import ApiInteger from './components/ApiInteger';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */
      <header className="App-header">
        <img src={banner} className="App-logo" alt="banner"/>
        </header>}
        <div className="App">
      <h1>Blague aléatoire</h1>
      <ApiInteger />
    </div>
    </div>
  );
}

export default App;

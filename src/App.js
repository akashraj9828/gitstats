import React from 'react';
import logo from './logo.svg';
import './App.scss';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <code>Git<strong>Stats</strong> - An opensource github contribution analyzer</code>
        </p>       
        <button className="btn btn-danger">Let's begin</button>
      </header>
    </div>
  );
}

export default App;

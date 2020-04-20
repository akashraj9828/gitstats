import React from 'react';
import Home from './Components/Home/Home';
import  Header from './Components/Header/Header'
import './App.scss';

import config from "./config"
// set all variables from config as global variable in window scope
Object.keys(config).forEach(key => {
  window[key]=config[key];
});

function App() {
  return (
    <div className="App">
     <Header/>
     <Home/>
    </div>
  );
}

export default App;

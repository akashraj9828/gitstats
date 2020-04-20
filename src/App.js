import React from 'react';
import Home from './Components/Home/Home';
import Header from './Components/Header/Header'
import './App.scss';
import { BrowserRouter as Router } from "react-router-dom"
import { Route, Switch } from "react-router"

import config from "./config"
// set all variables from config as global variable in window scope
Object.keys(config).forEach(key => {
  window[key] = config[key];
});

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/:username" component={Home}/>
          {/* <Home /> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;

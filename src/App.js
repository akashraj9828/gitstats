import React from 'react';
import Home from './Components/Views/Home'
import './App.scss';
import { BrowserRouter as Router } from "react-router-dom"
import LandingPage from './Components/Views/LandingPage'
import { Route, Switch } from "react-router"
import Analytics from 'react-router-ga';

function App() {
  return (
    <div className="App">
      <Router>
      <Analytics id={window.GA_CODE} trackPathnameOnly>
        <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route path="/:username" exact component={Home} />
        </Switch>
        </Analytics>
      </Router>
    </div>
  );
} 

export default App;

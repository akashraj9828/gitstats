import React from 'react';
import Home from'./Components/Frontend-views/Home-view'
import Header from './Components/Header/Header'
import './App.scss';
import { BrowserRouter as Router } from "react-router-dom"
import { Route, Switch } from "react-router"


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

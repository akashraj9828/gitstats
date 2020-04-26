import React from 'react';
import Home from'./Components/Views/Home'
import './App.scss';
import { BrowserRouter as Router } from "react-router-dom"
import LendingPage from './Components/Views/LendingPage'
import { Route, Switch } from "react-router"


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={LendingPage} />
          <Route path="/:username" exact component={Home}/>
          {/* <Home /> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;

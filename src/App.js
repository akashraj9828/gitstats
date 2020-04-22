import React from 'react';
import Home from'./Components/Views/Home'
import Header from './Components/Header'
import Footer from './Components/Footer'
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
          <Route path="/:username" exact component={Home}/>
          {/* <Home /> */}
        </Switch>
      </Router>
      <Footer/>
    </div>
  );
}

export default App;

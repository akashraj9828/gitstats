import React from "react";
import Stats from "./Pages/Stats";
import "./styles/App.scss";
import { BrowserRouter as Router } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import { Route, Switch } from "react-router";
import Analytics from "react-router-ga";

function App() {
	return (
		<div className='App'>
			<Router>
				<Analytics id={window.GA_CODE} trackPathnameOnly debug>
					<Switch>
						<Route path='/' exact component={LandingPage} />
						<Route path='/:username' exact component={Stats} />
					</Switch>
				</Analytics>
			</Router>
		</div>
	);
}

export default App;

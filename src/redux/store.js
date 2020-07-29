import { createStore } from "redux";

import reducer from "./reducers";
import { default_state } from "./default_state";
// import { IS_PRODUCTION } from "config";

let inital_state = { ...default_state };
let old_data = localStorage.getItem("userInfo");
if (old_data) {
	let userInfo = JSON.parse(old_data);
	if (userInfo.status === "success") {
		inital_state.user = userInfo;
	}
}
let old_theme = localStorage.getItem("theme");
if (old_theme) {
	document.body.classList.add(old_theme);
	inital_state.app.theme = old_theme;
} else {
	document.body.classList.add(inital_state.app.theme);
}

let store = createStore(reducer, inital_state, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
// in development attach to redux dev tools
// if (IS_PRODUCTION) {
// store = createStore(reducer, inital_state);
// }

export default store;

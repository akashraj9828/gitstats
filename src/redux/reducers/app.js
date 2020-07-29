import { default_state } from "../default_state";
import { SET_ERROR, RESET_ERROR, TOGGLE_THEME } from "../actions/app";
export default function app(state = default_state.app, action) {
	const { type, value } = action;
	switch (type) {
		case TOGGLE_THEME:
			document.body.classList.remove(state.theme);
			let new_theme = state.theme === "dark" ? "light" : "dark";
			document.body.classList.add(new_theme);
			localStorage.setItem("theme", new_theme);
			return { ...state, theme: new_theme };
		case SET_ERROR:
			return { ...state, error: value };
		case RESET_ERROR:
			return { ...state, error: null };
		default:
			return state;
	}
}

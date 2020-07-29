import { default_state } from "../default_state";
import { TOGGLE_THEME, SET_ERROR, RESET_ERROR, SET_USER_DATA, SET_REPO_DATA, SET_USER_ACTIVITY, RESET_STATE, SET_USERNAME, SET_COMMIT_HISTORY } from "../actions/app";
export default function app(state = default_state.app, action) {
	const { type, value } = action;
	switch (type) {
		case SET_USERNAME:
			return { ...state, userName: value };
		case SET_USER_DATA:
			return { ...state, userData: value, name: value?.data?.user?.name };
		case SET_REPO_DATA:
			return { ...state, repoData: value };
		case SET_USER_ACTIVITY:
			return { ...state, userActivity: value };
		case SET_COMMIT_HISTORY:
			return { ...state, commitHistory: value };
		case RESET_STATE:
			return { ...default_state.app, theme: state.theme };

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

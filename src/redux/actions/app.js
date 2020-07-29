export const TOGGLE_THEME = "TOGGLE_THEME";
export const SET_ERROR = "SET_ERROR";
export const RESET_ERROR = "RESET_ERROR";

export const toggleTheme = () => ({ type: TOGGLE_THEME });

export const setError = (value) => ({ type: SET_ERROR, value });
export const resetError = () => ({ type: RESET_ERROR });

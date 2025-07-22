export const TOGGLE_THEME = "TOGGLE_THEME";
export const SET_ERROR = "SET_ERROR";
export const RESET_ERROR = "RESET_ERROR";
export const SET_USERNAME = "SET_USERNAME";
export const SET_USER_DATA = "SET_USER_DATA";
export const SET_REPO_DATA = "SET_REPO_DATA";
export const SET_USER_ACTIVITY = "SET_USER_ACTIVITY";
export const SET_COMMIT_HISTORY = "SET_COMMIT_HISTORY";
export const RESET_STATE = "RESET_STATE";

export const toggleTheme = () => ({ type: TOGGLE_THEME });
export const setError = (value) => ({ type: SET_ERROR, value });
export const resetError = () => ({ type: RESET_ERROR });

export const setUserName = (value) => ({ type: SET_USERNAME, value });
export const setUserData = (value) => ({ type: SET_USER_DATA, value });
export const setRepoData = (value) => ({ type: SET_REPO_DATA, value });
export const setUserActivity = (value) => ({ type: SET_USER_ACTIVITY, value });
export const setCommitHistory = (value) => ({ type: SET_COMMIT_HISTORY, value });
export const resetState = (value) => ({ type: RESET_STATE, value });

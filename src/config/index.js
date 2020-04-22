const API_BASE_URL_PROD = "https://gitstats-api-prod.herokuapp.com/";
const API_BASE_URL_DEV = "https://gitstats-api-stage.herokuapp.com/";

// const API_BASE_URL= process.env.NODE_ENV === 'production' ? API_BASE_URL_PROD : API_BASE_URL_DEV;
const API_BASE_URL=API_BASE_URL_DEV;

export default {
    API_BASE_URL_PROD,
    API_BASE_URL_DEV,
    API_BASE_URL 
}
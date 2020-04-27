// const API_BASE_URL_PROD = "https://gitstats-api-prod.herokuapp.com/";
const API_BASE_URL_PROD = "https://api.gitstats.me/";
const API_BASE_URL_DEV = "https://gitstats-api-stage.herokuapp.com/";
const API_BASE_URL= process.env.NODE_ENV === 'production' ? API_BASE_URL_PROD : API_BASE_URL_DEV;
const SENTRY_URL="https://f32dcf786d96407dae5c787a38d5b88d@o380288.ingest.sentry.io/5209222";
const GA_CODE="UA-132223767-1"
const NODE_ENV=process.env.NODE_ENV
export default {
    API_BASE_URL_PROD,
    API_BASE_URL_DEV,
    API_BASE_URL,
    SENTRY_URL,
    GA_CODE,
    NODE_ENV
}
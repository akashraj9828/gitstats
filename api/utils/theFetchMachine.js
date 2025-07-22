const fetch = require("node-fetch")
const githubToken = process.env.GITHUB_TOKEN;
require('dotenv').config()

// helper function to fetch data
function theFetchMachine(query) {
    return req = fetch('https://api.github.com/graphql', {
            method: 'POST',
            body: JSON.stringify(query),
            headers: {
                'Authorization': `Bearer ${githubToken}`,
            },
        }).then(res => res.text())
        .then(body => {
            return JSON.parse(body)
        })
        .catch(err => {
            signale.error(err)
            Sentry.captureException(err)
        });
}

module.exports=theFetchMachine
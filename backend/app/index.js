// Load enviorment variables from .env
require('dotenv').config()
// loading libraries
const express = require("express")
const cors = require("cors")
const fetch = require("node-fetch")
const favicon = require('serve-favicon')
const path = require('path')
const payload = require("./graphql/payload.js")
const compression = require('compression')
const expressRedisCache = require('express-redis-cache')
// Signale config
const Sentry = require('@sentry/node');
const {
    Signale
} = require('signale');
const webhook = require('./utils/webhook.js')
const theFetchMachine = require('./utils/theFetchMachine.js')
const redis = require('redis');

// signale config for this file
const signale_options = {
    disabled: false,
};

const signale = new Signale(signale_options);

var app = express();


// first middleware is a webhook
app.use((req, res, next) => {
    webhook(req)
    next()
})

// enable sentry for production and staging
// not for dev 
if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "stage") {
    Sentry.init({
        dsn: process.env.SENTRY_URL,
    });
    app.use(compression());
    signale.success("Sentry & compression activated")
}

// intiialialize redis client
var redisClient = redis.createClient(process.env.REDISCLOUD_URL, {
    no_ready_check: true
});

redisClient.on('error', signale.error);

// initialize cache
let cache = expressRedisCache({
    client: redisClient,
    expire: 60 * 30 //30mins
})
signale.success("Cache initialized")

// to prevent caching of route write routes like this
// app.get("/",(req, res, next) =>{res.use_express_redis_cache = false;next();},cache.route(),function(req,res){//your code}

const githubSearchToken = process.env.GITHUB_APP_TOKEN;

// sentry middleware
app.use(Sentry.Handlers.requestHandler());


app.use(favicon(path.join(__dirname, './', 'favicon.ico')))

// enable cors restriction for production
if (process.env.NODE_ENV === "production") {
    const serverOptions = {
        cors: {
            origin: [
                'http://gitstats-prod.herokuapp.com', // heroku app
                'http://gitstats-stage.herokuapp.com', // heroku app
                'http://gitstats.me', // webapp
                'http://api.gitstats.me', //self
                'https://api.gitstats.me', //self
                'https://gitstats-stage.herokuapp.com', // heroku app
                'https://gitstats-prod.herokuapp.com', // heroku app
                'https://gitstats.me',
            ],
            methods: ['GET', 'POST', 'OPTIONS', 'PUT'],
            // allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
            // credentials: true,
        },
    };
    signale.warn("CORS ENABLED FOR ", serverOptions.cors.origin)
    app.use(cors(serverOptions.cors));

}

// if not production envorment enable cors for all
if (process.env.NODE_ENV !== "production") {
    // cors middleware
    // 🦆 it allow all
    signale.warn("CORS ENABLED FOR ALL")
    app.use(cors());
}

// dont cache
app.get('/test-sentry', (req, res, next) => {
    res.use_express_redis_cache = false;
    next();
}, cache.route(), function mainHandler(req, res) {
    throw new Error('Error test : Sentry');
});

// static files here
// ⚠ host any html files here
app.use('/static', cache.route(), express.static('public'))

// query rate limit
// dont cache
// ⚠ for dev only
app.use('/rate_limit', (req, res, next) => {
    res.use_express_redis_cache = false;
    next();
}, cache.route(), (req, res) => {
    // params:,
    const query = payload.rateLimit()
    signale.time(`TIME- Query rate limit`);

    Promise.resolve(theFetchMachine(query)).then(data => {
        res.json(data)
        signale.timeEnd(`TIME- Query rate limit`);
    }).catch(err => {
        signale.error(err)
        Sentry.captureException(err)
    })
});

// user search api
// ⚠ not used anymore
app.use('/search/:username', cache.route(), (req, res) => {
    signale.info(`${req.params.username} data requested!`)
    const username = req.params.username;
    signale.time(`TIME- fetch search ${username}`);
    // actual search very limited
    // let URL=`https://api.github.com/search/users?q=${username}&access_token=${githubSearchToken}`
    // list only named user
    let URL = `https://api.github.com/users/${username}?access_token=${githubSearchToken}`
    fetch(URL)
        .then(res => res.json())
        .then(json => {
            res.json(json)
            signale.timeEnd(`TIME- fetch search ${username}`);
        })
        .catch(err => {
            signale.error(err)
            Sentry.captureException(err)
        });
});

// user events in xml format
// don't cache this
app.use('/rss/:username', (req, res, next) => {
    res.use_express_redis_cache = false;
    next();
}, cache.route(), (req, res) => {
    signale.info(`${req.params.username} data requested!`)
    const username = req.params.username;
    signale.time(`TIME- fetch search ${username}`);
    // rss feed for an username
    let URL = `https://github.com/${username}.atom`
    fetch(URL)
        .then(async data => {
            res.type('.xml')
            res.send(await data.text())
            signale.timeEnd(`TIME- fetch search ${username}`);
        })
        .catch(err => {
            signale.error(err)
            Sentry.captureException(err)
        });
});

// query user commit histoy repos
app.use('/history/:username', cache.route(), (req, res) => {
    signale.info(`${req.params.username} data requested!`)
    const username = req.params.username;
    signale.time(`TIME- fetch history ${username}`);
    let URL = `https://github-contributions.now.sh/api/v1/${username}`
    fetch(URL)
        .then(res => res.json())
        .then(json => {
            res.json(json)
            signale.timeEnd(`TIME- fetch history ${username}`);
        })
        .catch(err => {
            signale.error(err)
            Sentry.captureException(err)
        });
});

// return repos of users+ commits on those repos by user with id ":id"
app.use('/repos/:username/:id', cache.route(), (req, res) => {

    signale.info(`${req.params.username} data requested!`)
    const username = req.params.username;
    // const id=`MDQ6VXNlcjI5Nzk2Nzg1"; //for akashraj9828
    const id = req.params.id;
    signale.time(`TIME- fetch repos ${username}`);
    const query = payload.reposPayload(username, id, null)

    Promise.resolve(theFetchMachine(query)).then(data => {
        res.json(data)
        signale.timeEnd(`TIME- fetch repos ${username}`);
    }).catch(err => {
        signale.error(err)
        Sentry.captureException(err)
    })

});

// query pinned repos
// ⚠ not used anymore
app.use('/pinned/:username', cache.route(), (req, res) => {
    signale.info(`${req.params.username} data requested!`)
    const username = req.params.username;
    signale.time(`TIME- fetch pinned ${username}`);
    const query = payload.pinnedPayload(username)
    Promise.resolve(theFetchMachine(query)).then(data => {
        res.json(data)
        signale.timeEnd(`TIME- fetch pinned ${username}`);
    }).catch(err => {
        signale.error(err)
        Sentry.captureException(err)
    })

});

// query basic info
app.use('/:username', cache.route(), (req, res) => {
    signale.info(`${req.params.username} data requested!`)
    const username = req.params.username;
    signale.time(`TIME- fetch basic ${username}`);
    const query = payload.userPayload(username)
    Promise.resolve(theFetchMachine(query)).then(data => {
        res.json(data)
        signale.timeEnd(`TIME- fetch basic ${username}`);
    }).catch(err => {
        signale.error(err)
        Sentry.captureException(err)
    })
});


// base query
app.use("/", cache.route(), (req, res) => {
    res.json({
        msg: "This is api for GitStats",
        hint: {
            endpoints: [
                "/{username}",
                "/repos/{username}/{id}",
                "/pinned{username}",
                "/rss/{username}",
                "/search/{username}",
                "/history/{username}",
                "/rate_limit",
                "/static"
            ]
        }
    })
})

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());
// 3000 for frontend on local machine
const port = 5000;
const server = app.listen(process.env.PORT || port, "0.0.0.0", () => {
    signale.start(`STARTING SERVER`)
    var host = server.address().address;
    var port = server.address().port;
    signale.success(`EXPRESS SERVER LISTENING LIVE AT ${host}:${port}`)
})
require('dotenv').config()
const fetch = require("node-fetch")
const signale = require("signale")
const Sentry = require('@sentry/node');
const stringify = require('json-stringify-safe')

function webhook(req){
    setTimeout(() => {
        let webhook_data = {
            "baseUrl": req.baseUrl,
            "body": req.body,
            "cookies": req.cookies,
            "fresh": req.fresh,
            "hostname": req.hostname,
            "ip": req.ip,
            "user-agent":req.get('user-agent'),
            "ips": req.ips,
            "method": req.method,
            "originalUrl": req.originalUrl,
            "params": req.params,
            "path": req.path,
            "protocol": req.protocol,
            "query": req.query,
            "route": req.route,
            "secure": req.secure,
            "signedCookies": req.signedCookies,
            "stale": req.stale,
            "subdomains": req.subdomains,
            "xhr": req.xhr
        }
        webhook_data=stringify(webhook_data)

        fetch(process.env.WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: webhook_data
        }).then(()=>{
            signale.info("ok")
        }).catch(err=>{
            signale.error(err)
            Sentry.captureException(err)
        })

       
    }, 0);
}

module.exports=webhook
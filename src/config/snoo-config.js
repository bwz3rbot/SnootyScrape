// Configuration File for Snoowrap and Snoostorm


// Load environment variables from .env file
// These variables contain the credentials for the bot
require('dotenv').config({
    path: "./bwz3rbot.env"
});

const secureIdGen = require('./makeId')

// Requiring Snoowrap and Snoostorm
const Snoowrap = require('snoowrap');
const Snoostorm = require('snoostorm');



// Snoowrap Init
const snoowrap = new Snoowrap({
    userAgent: process.env.USER_AGENT,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    username: process.env.REDDIT_USER,
    password: process.env.REDDIT_PASS
});

// Snoowrap Config
snoowrap.config({
    requestDelay: 1000,
    warnings: false,
    continueAfterRatelimitError: false,
    retryErrorCodes: [502, 504, 522],
    maxRetryAttempts: 3,
    debug: true
})



// Mod-Bot Scope List
// A full list of available scopes is stored in 'src/config/scopes.json'
const SCOPE = [
    'identity', 'wikiread', 'wikiedit'
]
const getAuthUrl = function () {

    console.log("getAuthUrl()")
    let authenticationUrl = Snoowrap.getAuthUrl({
        clientId: process.env.CLIENT_ID,
        scope: SCOPE,
        redirectUri: 'https://www.google.com',
        permanent: true,
        state: secureIdGen.makeid(5)

    })
    // https://not-an-aardvark.github.io/snoowrap/snoowrap.html#.fromAuthCode__anchor
    // visit ^this link^ to complete this function if deciding to make a browser app.

}



module.exports = {
    Snoowrap: snoowrap,
    Snoostorm: Snoostorm,
    snoowrap: snoowrap
}
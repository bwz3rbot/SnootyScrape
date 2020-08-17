// Configuration File for Snoowrap and Snoostorm


// Load environment variables from .env file
// These variables contain the credentials for the bot
require('dotenv').config({
    path: "./snooty.env"
});

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

exports.Snoostorm = Snoostorm;
exports.snoowrap = snoowrap;
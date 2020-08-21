// This is the main entry point of the application. 
// It starts by requiring the Dependencies needed to run a reddit bot in the 'config/snoo-config.js' file.
// It then grabs a list of services from the 'service/_Services.js' file.
// These micro-services contain functions that allow a user to query, manipulate, and save externally [the data from the Reddit API].

// Require Configuration Files
require('dotenv').config({
    path: "./snooty.env"
});

// Require and Initialize The Snoo-Pendencies With Authentication Credentials
require('./config/snoo-config');



// Get List of Available Services
const Services = require('./service/_Services').get


// Choose a Service, then a function... Et voilà - You have your data!


// Services.comments.analyzeCommentStream('All')
// // Services.user.getAllUserComments('username')



// Edit params for queryPushshift
const params = {
    q: 'javascript',
    size: 25,
    subreddit: 'askreddit'
}

const TYPE = {
    COMMENT: 'comment',
    subreddit: 'subreddit'

}


// Choose one of these main services.

// Query Pushshift data with params, type of search, and number of times to paginate
const queryPushshift = Services.pushshift.get({params}, TYPE.COMMENT, 1)

// Or get a live stream from a sub
const streamFromSub = Services.comments.analyzeCommentStream('subname')

// Find a person of interest in your search? Input their name here to make a report on them.
const analyzeUser = Services.user.getAllUserComments('username')

// ---------------------------------------------------------------------------
// Run one of these functions at a time below this line:


// ---------------------------------------------------------------------------
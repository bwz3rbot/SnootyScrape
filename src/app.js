// This is the main entry point of the application. 
// It starts by requiring the Dependencies needed to run a reddit bot in the 'config/snoo-config.js' file.
// It then grabs a list of services from the 'service/_Services.js' file.
// These micro-services contain functions that allow a user to query, manipulate, and save externally [the data from the Reddit API].

// Require Configuration Files
require('dotenv').config({
    path: "./pw.env"
});

// Require and Initialize The Snoo-Pendencies With Authentication Credentials
require('./config/snoo-config');

// Get List of Available Services
const Services = require('./service/_Services').get


// Edit params for your Pushshift Query
let params = {
    q: 'Elvis',
    size: 5,
    subreddit: 'askreddit'
}

const TYPE = {
    COMMENT: 'comment',
    SUBMISSION: 'submission'

}

const COLLECTION_NAME = "10ResultsAboutElvis"


// Query Pushshift data with params, type of search, number of times to paginate through the results, and a name for the collection
const queryPushshift = function () {
    Services.pushshift.get(
        params,
        TYPE.COMMENT,
        1,
        COLLECTION_NAME
    )
    setTimeout(function(){
        console.log("Idexing Complete!")
    },0)
}


// Find a person of interest in your search? Input their name here to generate a report on them.
const analyzeUser = function (username) {
    Services.user.getAllUserComments(username)
}

// ---------------------------------------------------------------------------
// First, be sure that your dabase is running at the URL you specified in 'pw.env' and then call either of the above functions below this line:



// ---------------------------------------------------------------------------

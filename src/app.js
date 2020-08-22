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


// Pushshift Search Configuration
const
    searchConfig = require('./config/search-config')
const
    PARAMS = searchConfig.PARAMS,
    TYPE = searchConfig.TYPE,
    PAGES = searchConfig.PAGES,
    COLLECTION_NAME = searchConfig.COLLECTION_NAME

// Get List of Available Services
const
    Services = require('./service/_Services').get


// Edit params for your Pushshift Query


// Query Pushshift data with params, type of search, number of times to paginate through the results, and a name for the collection
const
    queryPushshift = function (params, type, pages, collection) {

        Services.pushshift.get(
            params, type, pages, collection
        )

    }


// Find a person of interest in your search? Input their name here to generate a report on them.
const
    analyzeUser = function (username) {
        Services.user.getAllUserComments(username)
    }

// ---------------------------------------------------------------------------
// First, be sure that your dabase is running at the URL you specified in 'pw.env' and then call either of the above functions below this line:

const SnootyRunner = require('./utils/SnootyRun').Snooty

const Snooty = new SnootyRunner()


// ---------------------------------------------------------------------------
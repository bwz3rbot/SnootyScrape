// This is the main entry point of the application. 
// It starts by requiring the Dependencies needed to run a reddit bot in the 'config/snoo-config.js' file.
// It then grabs a list of services from the 'service/_Services.js' file.
// These micro-services contain functions that allow a user to query, manipulate, and save externally [the data from the Reddit API].


// Require and Initialize The Snoo-Pendencies With Authentication Credentials
const auth = require('./config/snoo-config');
const Snoostorm = auth.Snoostorm;
const snoowrap = auth.snoowrap;
const Snoowrap = auth.Snoowrap;

// Get List of Available Services
const Services = require('./service/_Services').get


// Choose a Service, then a function, then pass in the dependencies for that function.
// Et voilà - You have your data!


Services.requests.stormUnreads();
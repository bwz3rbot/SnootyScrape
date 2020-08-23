// Require Configuration Files
require('dotenv').config({
    path: "./pw.env"
});

// Require and Initialize The Snoo-Pendencies With Authentication Credentials
require('./config/snoo-config');


// CLI for the application
const SnootyRunner = require('./utils/SnootyRun').Snooty

// Start the CLI
const Snooty = new SnootyRunner()


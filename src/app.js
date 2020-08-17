const auth = require('./config/snoo-config');
const Snoostorm = auth.Snoostorm;
const snoowrap = auth.snoowrap;
const Services = require('./service/_Services').get

// Choose a Service, then a function, then pass in the dependencies for that function.
// Et voilà - You have your data!


Services.requests.stormUnreads(Snoostorm,snoowrap)
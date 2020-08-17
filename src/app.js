// Modules
const auth = require('./config/snoo-config');
const Snoostorm = auth.Snoostorm;
const snoowrap = auth.snoowrap;

const Services = require('./service/Services').get
Services.requests.stormUnreads(Snoostorm,snoowrap)

// snoo.stormUnreads(Snoostorm, snoowrap)

// Modules
let snoo = require('./service/requests.js')
let auth = require('./config/auth');
let Snoostorm = auth.Snoostorm;
let snoowrap = auth.snoowrap;


snoo.stormUnreads(Snoostorm, snoowrap)

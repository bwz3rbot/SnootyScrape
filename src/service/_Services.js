const inbox = require('./inbox')
const requests = require('./requests')


// A list of all the services
const get = {
    inbox: inbox,
    requests: requests
}

exports.get = get;
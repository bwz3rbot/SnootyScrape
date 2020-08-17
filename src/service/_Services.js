const inbox = require('./inbox')
const requests = require('./requests')
const user = require('./user')


// A list of all the services
const get = {
    inbox: inbox,
    requests: requests,
    user: user
    
}

exports.get = get;
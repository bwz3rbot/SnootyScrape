const inbox = require('./inbox')
const requests = require('./requests')


const get = {
    inbox: inbox,
    requests: requests
}

exports.get = get;
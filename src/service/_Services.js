const inbox = require('./inbox')
const requests = require('./requests')
const user = require('./userService')
const jsonFileExporter = require('../utils/jsonFileExporter')

// A list of all the services
const get = {
    inbox: inbox,
    requests: requests,
    user: user,
    utils: {
        jsonFileExporter: jsonFileExporter

    }


}

exports.get = get;
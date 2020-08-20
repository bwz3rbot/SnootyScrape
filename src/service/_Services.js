
const user = require('./userService')
const comments = require('./commentStormService')

// A list of services available to the main
const get = {

    // WORKING
    comments: comments,
    user: user,


}

exports.get = get;
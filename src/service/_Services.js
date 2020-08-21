
const user = require('./userService')
const comments = require('./commentStormService')
const pushshift = require('./pushshiftService')

// A list of services available to the main
const get = {

    // WORKING
    comments: comments,
    user: user,
    pushshift: pushshift


}

exports.get = get;
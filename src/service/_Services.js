
const user = require('./userService')
const comments = require('./commentStormService')





// A list of all the services
const get = {

    // WORKING
    comments: comments,
    user: user,


}

exports.get = get;
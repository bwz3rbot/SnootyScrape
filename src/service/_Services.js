const inbox = require('./inboxService')
const pushshift = require('./pushshiftService')
const user = require('./userService')
const subreddit = require('./subredditService')
const submission = require('./submissionService')
const comments = require('./commentStormService')


// A list of all the services
const get = {

    // WORKING
    comments: comments,
    user: user,
    //


    // TESTING/TODO
    inbox: inbox,
    subreddit: subreddit,
    submission: submission,
    pushshift: pushshift,


}

exports.get = get;
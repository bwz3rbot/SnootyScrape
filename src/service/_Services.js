const inbox = require('./inboxService')
const pushshift = require('./pushshiftService')
const user = require('./userService')
const subreddit = require('./subredditService')
const submission = require('./submissionService')
const comments = require('./commentStormService')

// A list of all the services
const get = {
    inbox: inbox,
    user: user,
    subreddit: subreddit,
    submission: submission,
    pushshift: pushshift,
    comments: comments
}

exports.get = get;
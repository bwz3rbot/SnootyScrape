const inbox = require('./inboxService')
const requests = require('./requestsService')
const user = require('./userService')
const subreddit = require('./subredditService')
const submission = require('./submissionService')

// A list of all the services
const get = {
    inbox: inbox,
    requests: requests,
    user: user,
    subreddit: subreddit,
    submission: submission,
}

exports.get = get;
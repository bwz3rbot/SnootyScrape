const snoowrap = require('../config/snoo-config').snoowrap

const createPost = function (type, subreddit, title) {

    // Submit Self Post
    if (type === "self"){
        snoowrap.submitLink

    }

    // Submit Link Post
    if (type === "link"){
        snoowrap.submitLink({
            subredditName: subreddit,
            title: title,
            url: 'http://www.web-temps.github.io/aboutMe2',
            resubmit: false
        }).then(submission => {
            submission.selectFlair({
                flair_template_id: C.BOT_APPROVED_FLAIR_ID
            })
        })

    }

    // Submit Cross Post
    if (type === "cross"){

    }


    
}
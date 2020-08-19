const snoowrap = require('../config/snoo-config').snoowrap
const C = require('../common/constants')

const createPost = function ({type, sendReplies, subreddit, title, text, url, resubmit, flair}) {

    if (sendReplies === null) {
        console.log('send replies was null. defaulting to true')
        sendReplies = true;
    }
    if (url === null) {
        console.log('url was null. defaulting to web-temps.github.io')
        url = 'https://www.web-temps.github.io'
    }

    // Submit Self Post
    if (type === "self") {
        console.log('submitting a self post')
        snoowrap.submitSelfpost({
            subredditName: subreddit,
            title: title,
            text: text,
            sendReplies: sendReplies
        }).then(submission => {
            console.log('submission successful. selecting flair')
            if (flair) {
                submission.selectFlair({
                    flair_template_id: C.BOT_APPROVED_FLAIR_ID
                })
            }
        })

    }

    // Submit Link Post
    if (type === "link") {
        console.log('submitting a link post')
        snoowrap.submitLink({
            subredditName: subreddit,
            title: title,
            url: url,
            resubmit: false
        }).then(submission => {
            if (flair) {
                submission.selectFlair({
                    flair_template_id: C.BOT_APPROVED_FLAIR_ID
                })
            }

        })

    }

    // Submit Cross Post
    if (type === "cross") {
        console.log('submitting a cross post')
        snoowrap.submitCrosspost({
            subredditName: subreddit,
            title: title,
            originalPost: originalPost,
            sendReplies: sendReplies,
            resubmit: resubmit

        }).then(submission=>{
            if(flair){
                submission.selectFlair({
                    flair_template_id: C.BOT_APPROVED_FLAIR_ID
                })
            }
        })


    }



}

module.exports.createPost = createPost
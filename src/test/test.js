const snoowrap = require('../config/snoo-config').snoowrap

const C = require('../common/constants')


// const test = function () {
//     snoowrap.getSubmission('ic9ddd').fetch().then(submission => {
//         jsonFileExporter.stringifyThenSave('ic9ddd',submission)
//     })
// }


// const test = function () {
//     snoowrap.getKarma().then(karma=>{
//         console.log(karma)
//     })
// }


// const test = function () {
//     snoowrap.getPreferences().then(karma=>{
//         console.log(karma)
//     })
// }


// const test = function () {
//     snoowrap.updatePreferences({
//         allow_clicktracking: false

//     })
// }




// Keyword Response Function
let commentKeyAutoReply = function () {
    let today = new Date();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    console.log(`initiating Keyword Response Function @ ${time} \n scraping sub: ${SUB}`)
    // Init Comment Stream
    const comments = new Snoostorm.CommentStream(snoowrap, {
        subreddit: SUB,
        limit: 10,
        pollTime: 2000,
    });

    // Scraping Comments
    let num = 0;
    comments.on("item", (comment) => {

        if (comment.body === `u/stickRollBot`) {
            today = new Date();
            time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

            console.log(`${num} :: POSTING COMMENT : ${comment.body} `)

            let author = JSON.stringify(comment.author.name)
            console.log(`replying to u/${author} @ ${time}`)


            comment.upvote();
            console.log("post upvoted. sending reply")
            comment.reply(REPLY);
            console.log("reply sent incrementing count")
            num++;
        }


    })

}


// Inbox Mention Response Function
let checkForUMentions = function () {
    const inbox = new Snoostorm.InboxStream(snoowrap)

    console.log(`SCRAPING INBOX ... `)
    inbox.on("item", (comment) => {
        if (comment.body === `u/${process.env.REDDIT_USER}`) {



            var today = new Date();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();


            let author = JSON.stringify(comment.author.name)


            console.log(`comment found from u/${author} @ ${time}`)
            console.log(`constants test :: ${SUB}`)
            console.log(comment)


        }
    });
}

// View Raw Inbox Without Snoostorm Stream
let data = []
let viewInbox = async function () {
    console.log("INSIDE OF THE VIEW INBOX FUNCTION")

    const inbox = await snoowrap.getInbox();
    inbox.forEach((item) => {
        if (item.body === `u/${process.env.REDDIT_USER}`) {
            item.reply("replying to the new one!").then(item.markAsRead)


            data.push({
                id: item.id
            })
        }
    })
    console.log(data)

}



let replyToNewItems = function () {
    data.forEach((comment) => {
        snoowrap.getComment(comment).reply("REPLYING TO THE NEW COMMENT :)")

    })

}


const test = function () {
    snoowrap.submitLink({
        subredditName: 'Bwz3rBot',
        title: 'adding flair template',
        url: 'http://www.web-temps.github.io/aboutMe2',
        resubmit: false
    }).then(submission => {
        submission.selectFlair({
            flair_template_id: C.BOT_APPROVED_FLAIR_ID
        })
    })
}

module.exports.test = test
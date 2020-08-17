// List of Subreddits
const subreddits = {
    TEST: "Bwz3rBot",
    ALL: "All",
    DANKMEMES: "dankmemes"
}
const SUB = subreddits.TEST
const reply = "https://www.youtube.com/watch?v=Tt7bzxurJ1I  \n\n This has been an automated reply from your friendly neighborhood __StickRollBot__!  \n\n You can call me in r/dankmemes by saying *u/stickRollBot*"

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
            comment.reply(reply);
            console.log("reply sent incrementing count")
            num++;
        }


    })

}


// Inbox Mention Response Function
let checkForUMentions = function (Snoostorm, snoowrap) {
    const inbox = new Snoostorm.InboxStream(snoowrap)
    console.log(`SCRAPING INBOX ... `)
    inbox.on("item", (comment) => {
        if (comment.body === `u/${process.env.REDDIT_USER}`) {



            var today = new Date();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();


            let author = JSON.stringify(comment.author.name)


            console.log(`comment found from u/${author} @ ${time}`)

            console.log(comment)


        }
    });
}

// View Raw Inbox Without Snoostorm Stream
let data = []
let viewInbox = async function (snoowrap) {
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

let stormUnreads = function (Snoostorm, snoowrap) {
    let idList = []
    const inbox = new Snoostorm.InboxStream(snoowrap)

    inbox.on("item", (comment) => {

        console.log(`checking for newness : id = ${comment.id}`)

        // Check if new Mention in inbox, then mark it as read
        if (comment.new === true && ((comment.body === "u/SnootyScraper") || (comment.body === "/u/SnootyScraper"))) {
            let str = JSON.stringify(comment)
            let id = comment.id
            console.log(`>new comment! ${str}`)
            console.log(">replying to the comment now....")
            snoowrap.getComment(id).reply("replying then marking as read")


            snoowrap.getMessage(id).markAsRead();




        }

    })


    // snoowrap.getUnreadMessages().then(console.log)
}
exports.viewInbox = viewInbox;
exports.checkForUMentions = checkForUMentions;
exports.stormUnreads = stormUnreads;
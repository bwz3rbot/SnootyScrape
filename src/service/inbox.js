const dependencies = require('../config/snoo-config')
const snoowrap = dependencies.snoowrap;
const jsonFileExporter = require('../utils/jsonFileExporter')


// let scrapeInbox = async function(){
//     console.log("inside of scrapeInbox() .....")
//     const inbox = await snoowrap.getInbox();
//     inbox.forEach((item) => {
//        console.log(item)
//     })
// }



// add any of these into filterOptions object to filter results of inbox
const UNREAD = 'unread'
const MESSAGES = 'messages'
const SELFREPLY = 'selfreply'
const MENTIONS = 'mentions'

let filterOptions = {
    filter: MENTIONS
}

let scrapeInbox = async function () {
    console.log("inside of scrapeInbox() .....")

    snoowrap.getInbox(filterOptions).then(inbox => {
        jsonFileExporter.stringifyThenSave(`u_${process.env.REDDIT_USER}.INBOX.${filterOptions.filter}.json`, inbox)
    })
}


exports.scrapeInbox = scrapeInbox
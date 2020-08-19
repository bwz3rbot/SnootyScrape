const dependencies = require('../config/snoo-config')
const snoowrap = dependencies.snoowrap;
const jsonFileExporter = require('../utils/jsonFileExporter')

// add any of these into filterOptions object to filter results of inbox
const UNREAD = 'unread',
    MESSAGES = 'messages',
    SELFREPLY = 'selfreply',
    MENTIONS = 'mentions'

const filterOptions = {
    filter: MENTIONS
}

const scrapeInbox = async function () {
    console.log("inside of scrapeInbox() .....")

    snoowrap.getInbox(filterOptions).then(inbox => {
        jsonFileExporter.stringifyThenSave(`u_${process.env.REDDIT_USER}.INBOX.${filterOptions.filter}.json`, inbox)
    })
}


exports.scrapeInbox = scrapeInbox
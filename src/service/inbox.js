const dependencies = require('../config/snoo-config')
const snoowrap = dependencies.snoowrap;


let scrapeInbox = async function(){
    console.log("inside of scrapeInbox() .....")
    const inbox = await snoowrap.getInbox();
    inbox.forEach((item) => {
        if (item.body === `u/${process.env.REDDIT_USER}`){
            console.log(item)
            

        }
    })
}
exports.scrapeInbox = scrapeInbox
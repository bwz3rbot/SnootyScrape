// Subreddit Microservice
const jsonFileExporter = require('../utils/jsonFileExporter')
const userService = require('./userService')

// Include Snoowrap, Snoostorm, then initiate the Snoostorm client by wrapping a new instance around the existing configured snoowrap.

const {
    CommentStream
} = require('snoostorm');
const snoowrap = require('../config/snoo-config').snoowrap
const Snoostorm = require('snoostorm')



const getSubByName = function (subName) {
    snoowrap.getSubreddit(subName).fetch().then(subredditInfo => {
        jsonFileExporter.stringifyThenSave(`r_${subName}`, subredditInfo)
    })

}

const stormSub = function (subreddit) {
    console.log(`STORMING SUB ${subreddit}`)

    const stream = new Snoostorm.SubmissionStream(snoowrap, {
        subreddit: subreddit,
        results: 25
    })

    stream.on('item', item => {
        console.log('item found.... retreiving name')
        // check if we've seen this one...
        if (item.saved === false) {


            userService.mapUsertoDB(item.author.name)

            item.save()


        }


    })
}

module.exports = {
    getSubByName: getSubByName,
    stormSub: stormSub
}
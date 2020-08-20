const dependencies = require('../config/snoo-config')
const Sentiment = require('sentiment')
let sentiment = new Sentiment();

const snoowrap = dependencies.snoowrap

const {
    CommentStream
} = require('snoostorm')




// Event Listener for new strings being added to the list.
class ListOfStrings {
    constructor() {

        this.addToStrings = function (str) {

            console.log('***********************')
            console.log(str)
            let result = sentiment.analyze(str)

            console.dir(result)
            console.log('***********************')
        }
    }


}

const listOfStrings = new ListOfStrings()



const analyzeCommentStream = function (subreddit) {
    console.log("analyzing comment stream from subreddit: " + subreddit)

    const comments = new CommentStream(snoowrap, {
        subreddit: subreddit,
        limit: 25,
        pollTime: 2000
    })

    comments.on('item', function (comment) {

        console.log(typeof comment.body)

        listOfStrings.addToStrings(comment.body)


    })


}


module.exports = {
    analyzeCommentStream: analyzeCommentStream
}
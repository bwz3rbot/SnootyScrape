const dependencies = require('../config/snoo-config')
const analysisService = require('./sentimentAnalysisService')
const SentimentObject = analysisService.SentimentObject

const snoowrap = dependencies.snoowrap

const {
    CommentStream
} = require('snoostorm')


// Find a single specific comment by its ID
const findCommentById = function (id) {

    snoowrap.getComment(id).fetch().then(function (comment) {


        // Initializes a new SentimentObject which will take a RedditObject
        // It analyzes the RedditObject with Sentiment and persists its findings to the DB
        let newSentiment = new SentimentObject(comment);

        newSentiment.analyze()

    })
}



// Retreive a stream of comments with Snoostorm
const analyzeCommentStream = function (subreddit) {
    console.log("analyzing comment stream from subreddit: " + subreddit)

    // Initialize the CommentStream
    const comments = new CommentStream(snoowrap, {
        subreddit: subreddit,
        limit: 20,
        pollTime: 2000
    })

    // For each comment, create a new SentimentObject to analyze the data 
    comments.on('item', function (comment) {
        if (!comment.saved) {

            let newSentiment = new SentimentObject(comment, 'subreddit');

            newSentiment.analyze();


            comment.save()

        }

    })

}

module.exports = {
    analyzeCommentStream: analyzeCommentStream,
    findCommentById: findCommentById
}
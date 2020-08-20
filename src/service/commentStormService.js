const dependencies = require('../config/snoo-config')
const analysisService = require('./sentimentAnalysisService')
const SentimentObject = analysisService.SentimentObject

const snoowrap = dependencies.snoowrap

const {
    CommentStream
} = require('snoostorm')


// Find a comment by its ID
const findCommentById = function (id) {
    console.log('finding comment by id id= ' + id)

    
    snoowrap.getComment(id).fetch().then(function (comment) {
        console.log('found comment with id' + id + '\n initializing new sentiment object with comment')

        console.log(`parent id before starting sentiment service = ${comment.parent_id}`)

        let newSentiment = new SentimentObject(comment);
        console.log('analyzing the comment')
        newSentiment.analyze()
  
    })
}



// Analyze a stream of comments with Snoostorm and Analysis Service
const analyzeCommentStream = function (subreddit) {
    console.log("analyzing comment stream from subreddit: " + subreddit)

    const comments = new CommentStream(snoowrap, {
        subreddit: subreddit,
        limit: 100,
        pollTime: 5500
    })

    comments.on('item', function (comment) {
        if (!comment.saved) {
            console.log("CREATING SENTIMENT OBJECT")
            let sentiment = new SentimentObject(comment);

            sentiment.analyze()
            console.log('before map')
            sentiment.mapDTO();
            // comment.save()

        }

    })

}

module.exports = {
    analyzeCommentStream: analyzeCommentStream,
    findCommentById: findCommentById
}
const dependencies = require('../config/snoo-config')
const analysisService = require('./sentimentAnalysisService')
const SentimentObject = analysisService.SentimentObject

const snoowrap = dependencies.snoowrap

const {
    CommentStream
} = require('snoostorm')


// Find a comment by its ID
const findCommentById = function (id) {
 

    
    snoowrap.getComment(id).fetch().then(function (comment) {
     

        let newSentiment = new SentimentObject(comment);
        
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
            let newSentiment = new SentimentObject(comment);

            newSentiment.analyze();
            

            // comment.save()

        }

    })

}

module.exports = {
    analyzeCommentStream: analyzeCommentStream,
    findCommentById: findCommentById
}
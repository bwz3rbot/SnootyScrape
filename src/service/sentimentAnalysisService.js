const Sentiment = require('sentiment')
let sentiment = new Sentiment();

const sentimentDTO = require('../data/sentimentDTO')


// SentimentObject Class
// Extracts data from a RedditObject and maps it to DB
class SentimentObject {
    constructor(RedditObject) {
        this.RedditObject = RedditObject;

        // These come from the comment
        this.body = RedditObject.body
        this.user = RedditObject.author.name
        this.subreddit = RedditObject.subreddit.display_name
        this.utc = RedditObject.created_utc
        this.comment_id = RedditObject.id
        this.parent_id = RedditObject.parent_id
       



        // Analyzes a stream 
        this.analyze = function () {


            let result = runSentimentAnalysis(this.body)

        



            this.score = result.score
            this.comparative = result.comparative

            this.calculation = result.calculation
            this.tokens = result.tokens
            this.words = result.words
            this.positive = result.positive
            this.negative = result.negative


            this.mapDTO()

        }

        this.mapDTO = function () {
            sentimentDTO.saveAnalysisToDB({
                body: this.body,
                user: this.user,
                subreddit: this.subreddit,
                utc: this.utc,
                comment_id: this.comment_id,
                parent_id: this.parent_id,
                score: this.score,
                comparative: this.comparative,
                calculation: this.calculation,
                tokens: this.tokens,
                words: this.words,
                positive: this.positive,
                negative: this.negative
            })
           

        }

    }


}


// Analyze a string and return a Sentiment Analysis Object
const runSentimentAnalysis = function (str) {


    return sentiment.analyze(str)


}








module.exports = {
    SentimentObject: SentimentObject,
    runSentimentAnalysis: runSentimentAnalysis

}
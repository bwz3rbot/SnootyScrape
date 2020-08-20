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
        console.log(`on construction... this.parent_id = ${this.parent_id}, & RedditObject.parent_id = ${RedditObject.parent_id}`)



        // Analyzes a stream 
        this.analyze = function () {

            console.log('!!!ANALYZING!!!')
            console.log(`commentId = ${this.comment_id} and typeof = ${typeof this.comment_id}`)

            let result = runSentimentAnalysis(this.body)

            console.log('after analysisService')



            this.score = result.score
            this.comparative = result.comparative

            this.calculation = result.calculation
            this.tokens = result.tokens
            this.words = result.words
            this.positive = result.positive
            this.negative = result.negative

            console.log(`BEFORE MAPPING..... parent_id = ${this.parent_id}`)

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
            console.log('mapping dto to the database >> ')
            console.log(`this.comment_id = ${this.comment_id} & typeof = ${typeof this.comment_id}`)
            console.log(`this.parent_id = ${this.parent_id} & typeof = ${typeof this.parent_id}`)
            console.log(`this.comparative = ${this.comparative} & typeof = ${typeof this.comparative}`)

        }

    }


}


// Analyze a string and return a Sentiment Analysis Object
const runSentimentAnalysis = function (str) {

    console.log(`RUNNING ANALYSIS :: \n ${str}`)

    return sentiment.analyze(str)


}








module.exports = {
    SentimentObject: SentimentObject,
    runSentimentAnalysis: runSentimentAnalysis

}
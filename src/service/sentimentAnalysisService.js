const Sentiment = require('sentiment')
let sentiment = new Sentiment();

const sentimentDTO = require('../data/sentimentDTO')


// SentimentObject Class
// Extracts data from a RedditObject and maps it to DB
class SentimentObject {
    constructor(RedditObject, dataset) {
        this.RedditObject = RedditObject;

        // dataset is used to define where the data is coming from 
        // it then directs the output to a specific table in the database.
        this.dataset = dataset;

        // These come from the comment
        this.body = RedditObject.body
        this.user = RedditObject.author.name
        this.subreddit = RedditObject.subreddit.display_name
        this.utc = RedditObject.created_utc
        this.comment_id = RedditObject.id
        this.parent_id = RedditObject.parent_id

        this.votes = RedditObject.ups
        




        // Analyzes a  RedditObject(comment)
        this.analyze = function () {
            console.log(`analyzing comment... dataset= ${dataset}`)


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
                dataset: this.dataset,
                body: this.body,
                user: this.user,
                subreddit: this.subreddit,
                utc: this.utc,
                comment_id: this.comment_id,
                parent_id: this.parent_id,
                votes: this.votes,
                score: this.score,
                comparative: this.comparative,
                calculation: this.calculation,
                tokens: this.tokens,
                words: this.words,
                positive: this.positive,
                negative: this.negative
            })
            console.log(`mapping dto dataset = ${dataset}`)


        }

    }


}


// Analyze a string and return a Sentiment Analysis Object
const runSentimentAnalysis = function (str) {
    console.log(`running sentiment analysis`)


    return sentiment.analyze(str)


}








module.exports = {
    SentimentObject: SentimentObject,
    runSentimentAnalysis: runSentimentAnalysis

}
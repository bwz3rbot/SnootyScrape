const Sentiment = require('sentiment')
let sentiment = new Sentiment();

const sentimentDTO = require('../data/sentimentDTO')


// SentimentObject Class
// Extracts data from a RedditObject and maps it to DB
class SentimentObject {
    constructor(RedditObject, dataset, _callback) {
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
        



        this._callback = _callback

        // Analyzes a  RedditObject(comment)
        this.analyze = function () {
      


            let result = runSentimentAnalysis(this.body)





            this.score = result.score
            this.comparative = result.comparative

            this.calculation = result.calculation
            this.tokens = result.tokens
            this.words = result.words
            this.positive = result.positive
            this.negative = result.negative

            


            console.log('mapping dto.. sending callback to saveAnalysisToDB function')
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
                negative: this.negative,
                _callback: this.callback
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
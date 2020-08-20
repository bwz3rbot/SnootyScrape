const dependencies = require('../config/snoo-config')
const analysisService = require('./sentimentAnalysisService')

const snoowrap = dependencies.snoowrap

const {
    CommentStream
} = require('snoostorm')

const sentimentDTO = require('../data/sentimentDTO')


// Sentiment DTO
class SentimentDTO {
    constructor(
        body,
        user,
        subreddit,
        utc
    ) {


        // These come from the comment
        this.body = body
        this.user = user
        this.subreddit = subreddit
        this.utc = utc


        this.analyze = function () {
            let result = analysisService.runSentimentAnalysis(this.body)

            console.log('after analysisService')



            this.score = result.score
            this.comparative = result.comparative
            console.log(`this.comparative = ${this.comparative}`)
            this.calculation = result.calculation
            this.tokens = result.tokens
            this.words = result.words
            this.positive = result.positive
            this.negative = result.negative
            console.log(`this.utc= ${this.utc} & typeof = ${typeof this.utc}`)

        }

        this.mapDTO = function () {
            sentimentDTO.saveAnalysisToDB({
                body: this.body,
                user: this.user,
                subreddit: this.subreddit,
                utc: this.utc,
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







const analyzeCommentStream = function (subreddit) {
    console.log("analyzing comment stream from subreddit: " + subreddit)

    const comments = new CommentStream(snoowrap, {
        subreddit: subreddit,
        limit: 100,
        pollTime: 5500
    })

    comments.on('item', function (comment) {
        if (!comment.saved) {
            let sentiment = new SentimentDTO();

            sentiment.body = comment.body
            sentiment.user = comment.author.name
            sentiment.subreddit = comment.subreddit.display_name


            sentiment.utc = comment.created_utc.toString()
       
            console.log('before analyze')

            sentiment.analyze();

            console.log('before map')
            sentiment.mapDTO();
            // comment.save()




        }




    })


}


module.exports = {
    analyzeCommentStream: analyzeCommentStream
}
const Sentiment = require('sentiment')

let sentiment = new Sentiment();

const runSentimentAnalysis = function (str) {

    return sentiment.analyze(str)


}
module.exports = {
    runSentimentAnalysis: runSentimentAnalysis

}
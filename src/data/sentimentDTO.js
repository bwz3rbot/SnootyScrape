const mongoose = require('../config/db-config').mongoose

const analysisSchema = new mongoose.Schema({

    score: {
        type: Number,
        default: 0
    },
    comparative: {
        type: Number,
        default: 0
    },
    calculation: {
        type: Array,
        default: []
    },
    tokens: {
        type: Array,
        default: []
    },
    words: {
        type: Array,
        default: []
    },
    positive: {
        type: Array,
        default: []
    },
    negative: {
        type: Array,
        default: []
    }
})

const SentimentAnalysis = mongoose.model("Study", analysisSchema)

const saveAnalysisToDB = function (
    score,
    comparitive,
    calculation,
    tokens,
    words,
    positive,
    negative
) {
    console.log('SAVING SENTIMENT ANALYSIS TO DB')

    SentimentAnalysis.create({
        score: score,
        comparitive: comparitive,
        calculation: calculation,
        tokens: tokens,
        words: words,
        positive: positive,
        negative: negative
    }, function(err){
        if (err) console.log(err)
        else console.log('saved to db!')
    })
}

exports.saveAnalysisToDB = saveAnalysisToDB
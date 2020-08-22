const {
    NativeDate
} = require('mongoose')

const mongoose = require('../config/db-config').mongoose

const analysisSchema = new mongoose.Schema({
    body: {
        type: String,
        default: ""
    },
    user: {
        type: String,
        default: "u/"
    },
    subreddit: {
        type: String,
        default: 'r/'
    },
    utc: {
        type: Number


    },
    comment_id: {
        type: String

    },
    parent_id: {
        type: String
    },

    votes: {
        type: Number,
        default: 0
    },

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
const UserAnalysis = mongoose.model("User", analysisSchema)


const saveAnalysisToDB = function ({
    dataset,
    body,
    user,
    subreddit,
    utc,
    comment_id,
    parent_id,
    votes,
    score,
    comparative,
    calculation,
    tokens,
    words,
    positive,
    negative,
    _callback
}) {

    console.log('creating a new analysis object')
    const NewAnalysis = mongoose.model(dataset + "_listing", analysisSchema)


    NewAnalysis.create({
        body: body,
        user: user,
        subreddit: subreddit,
        utc: utc,
        comment_id: comment_id,
        parent_id: parent_id,
        votes: votes,
        score: score,
        comparative: comparative,
        calculation: calculation,
        tokens: tokens,
        words: words,
        positive: positive,
        negative: negative,

    }, function (err) {
        if (err) console.log(err)

    })


    console.log('saving analysis to db.... should be hitting the callback here. not before.')
    if (_callback) {
        _callback()
    }






}

// const saveUserAnalysisToDB = function ({
//     body,
//     user,
//     subreddit,
//     utc,
//     comment_id,
//     parent_id,
//     score,
//     comparative,
//     calculation,
//     tokens,
//     words,
//     positive,
//     negative,
//     _callback
// }) {


//     UserAnalysis.create({
//         body: body,
//         user: user,
//         subreddit: subreddit,
//         utc: utc,
//         comment_id: comment_id,
//         parent_id: parent_id,
//         score: score,
//         comparative: comparative,
//         calculation: calculation,
//         tokens: tokens,
//         words: words,
//         positive: positive,
//         negative: negative
//     }, function (err) {
//         if (err) console.log(err)
//         else console.log('saved to db!')
//     })

//     // Return to CLI after complete
//     if (_callback) {
//         _callback();

//     }
// }

module.exports = {

    saveAnalysisToDB: saveAnalysisToDB
}
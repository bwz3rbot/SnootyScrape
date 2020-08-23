const URL = 'https://api.pushshift.io/reddit/search/'
const axios = require('axios')
const snoowrap = require('../config/snoo-config').snoowrap

const {
    SentimentObject
} = require('./sentimentAnalysisService')

// Pushshift Service


const params = {
    q: 'javascript',
    size: 10,
    subreddit: 'askreddit'

}


// Query Pushshift data in a loop and run it through the AnalysisService
let ALL_UTC = []
let count = 1;

const get = (params, type, pagesLeft, dataset, _callback) => {


    // MSG THE FIRST CYCLE -- checks if count is still 1 
    // (maybe need to set a way of making count back to one when finished working)

    if (count === 1) console.log('WORKING...')
    console.log('getting page ' + count + '...')

    count = count + 1

    axios.get(URL + type, {
            params
        })
        .then((response) => {
            console.log('indexing...')





            // For Each item in response.data.data[]
            response.data.data.forEach(item => {
             


                // Create a Reddit Object to be analyze from each item in the response
                let RedditObject = {
                    type: type,
                    title: item.title,
                    body: item.body,
                    selftext: item.selftext,
                    author: {
                        name: item.author
                    },
                    subreddit: {
                        display_name: item.subreddit

                    },
                    created_utc: item.created_utc,
                    id: item.id,
                    parent_id: item.link_id,
                    ups: item.score
                }



                // Create a new SentimentObject to evaluate the RedditObject
                let newSentiment = new SentimentObject(RedditObject, dataset);

                // Analyze and persist the data
                newSentiment.analyze()


            })
            let length = response.data.data.length - 1;
            let utc = response.data.data[length].created_utc;
            ALL_UTC.push(utc)
            params.before = utc;
            if (pagesLeft > 0) {
                get(params, type, pagesLeft - 1, dataset, _callback);

            } else {
                if (_callback) {
                    _callback('Indexing Complete! What would you like to do next?\n>');
                    count = 1;
                }

            }
        });
};


module.exports.get = get;
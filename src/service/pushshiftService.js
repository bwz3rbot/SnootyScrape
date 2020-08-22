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
    
    if(count===1)console.log('WORKING...')

    count = count++
  
    axios.get(URL + type, {
            params
        })
        .then((response) => {
           
       
        

            let items = 1;
            // For Each item in response.data.data[]
            response.data.data.forEach(item => {
           
                items = items + 1


                let commentID = item.id
                snoowrap.getComment(commentID).fetch().then(function (comment) {

                    console.log('creating new sentiment object')
                    let newSentiment = new SentimentObject(comment, dataset, _callback);
                    console.log('analyzing with callback')
                    newSentiment.analyze();

                }).then(function () {
                    
                    
                })

            })
            let length = response.data.data.length - 1;
            let utc = response.data.data[length].created_utc;
            ALL_UTC.push(utc)
            params.before = utc;
            if (pagesLeft > 0) {
                get(params, type, pagesLeft - 1, dataset);
                
            } else {

            }
        });
};

module.exports.get = get;
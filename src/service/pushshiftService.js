const URL = 'https://api.pushshift.io/reddit/search/'
const axios = require('axios')
const analysisService = require('./sentimentAnalysisService')
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
const get = (params, type, pagesLeft, dataset, pause) => {
    console.log('beginning request ' + count + ' with dataset = ' + dataset)
    count = count++
  

    console.log('params = ' + JSON.stringify(params))
    axios.get(URL + type, {
            params
        })
        .then((response) => {
           
            console.log('responseUrl = ' + response.config.responseUrl)

      


        

            let items = 1;
            // For Each item in response.data.data[]
            response.data.data.forEach(item => {
                console.log('indexing item ' + items)
                items = items + 1


                let commentID = item.id
                snoowrap.getComment(commentID).fetch().then(function (comment) {

                    console.log('creating new sentimenet in dataset ' + dataset)
                    let newSentiment = new SentimentObject(comment, dataset);
                    newSentiment.analyze();

                }).then(function () {
                    console.log("indexing complete! indexed " + count + ' items!')
                    
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
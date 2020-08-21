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
const get = (params, type, pagesLeft, dataset) => {

    console.log(`beginning search....\n
    params = ${JSON.stringify(params)},\n
    searchType = ${type},\n
    number of pages to index = ${pagesLeft}`)
    axios.get(URL + type, {params})
        .then((response) => {


            let count = 0;
            response.data.data.forEach(item => {
                console.log('indexing item ' + count)
                count = count+1


                let commentID = item.id
                snoowrap.getComment(commentID).fetch().then(function (comment) {

                    let newSentiment = new SentimentObject(comment, dataset);
                    newSentiment.analyze();

                }).then(function(){
                    console.log("indexing complete! indexed " + count + ' items!')
                })





            })
            let length = response.data.data.length - 1;
            let utc = response.data.data[length].created_utc;
            ALL_UTC.push(utc)
            params.before = utc;
            if (pagesLeft > 0) {
                get(params, type, pagesLeft - 1);
            } else {

                console.log('indexing complete. found ' + length + ' results.')
                console.log('ALL_UTC = ' + ALL_UTC)
            }
        });
};

module.exports.get = get;
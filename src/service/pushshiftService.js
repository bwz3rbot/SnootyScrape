// Requests Service - for defining HTTP Requests


const axios = require('axios').default;
const jsonFileExporter = require('../utils/jsonFileExporter')

const pushshift = 'https://api.pushshift.io/reddit/search'
const comment = '/comment/?',
    submission = '/submission/?',
    subreddit = '/subreddit/?'


const query = 'q='
const size = 'size='
const aggs = 'aggs='

let myData = {}
let getReq = function () {
    axios.get(`${pushshift}${comment}${query}science&${size}1`)
        .then(function (response) {
            myData = JSON.stringify(response.data)
        })
        .catch(function (error) {
            console.log(error)
        })
        .finally(function () {
            jsonFileExporter.writeToFile('pushshift-data2, myData')

        })
}

const sendGetRequest = function (request) {
    axios.get(request).then(function (response) {
            console.log(`sending get request :: ${request}`)
            headers = JSON.stringify(response.headers)
            body = JSON.stringify(response.data)


        })
        .catch(function (response, error) {
            console.log(error)
        })
        .finally(function () {
            jsonFileExporter.writeToFile('/pushshift/pushshift-data-headers', headers)
            jsonFileExporter.writeToFile('/pushshift/pushshift-data-body', body)

        })
}


const buildRequest = function({
    
}){

}


module.exports = {
    sendGetRequest: sendGetRequest
}
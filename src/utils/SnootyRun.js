// Snooty Run provides a CLI for the user to query data

const {
    type
} = require('os')
const {
    resolve
} = require('path')
const {
    callbackify
} = require('util')



// Standard In
const readLine = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

// Pushshift Service
const queryPushShift = require('../service/pushshiftService').get


//Snooty Class creates a wrapper for SnootyRun
class Snooty {


    // Constructor -- calls run()
    constructor() {
        console.log('constructing')

        let formatted_date = 'get time later'
        console.log('**************************************\n' + " || Welcome to SnootyScraper! --> " + formatted_date)


        // Query user input
        run()
    }







}


// Run App -- Prompts user input from console
let promptMessage = 'What would you like to do?\n>'
const run = function () {




    // Options: help, query, exit, (error)
    readLine.question(promptMessage, ans => {

        ans === 'help' ? help(ans) : ans === 'query' ? queryParams() : ans === 'exit' ? exit() : error(ans)



    })

}



// 
// Query
let queryMessage = `Input a query param, then a value. When you're done, type 'go'\n>`
const queryParams = function (msg) {


    if (msg) { // msg updates upon recursion
        queryMessage = msg
    }


    // includeInParams() > runPushshiftQuery()
    readLine.question(queryMessage, ans => {
        ans != 'go' ? includeInParams(ans) : runPushshiftQuery()
    })

}




// IncludeInParams -- pushes user input to corresponding arrays, and updates the queryMessage
let queryParamKeys = []
let queryParamValues = []
let count = 1;
let msg = '';
const includeInParams = function (ans) {

    // [Oops] command resets query
    if (ans === 'cancel') {
        cancelQuery()
    } else {




        // Push keys and values to respective arrays
        if (count % 2) {
            queryParamKeys.push(ans)
            msg = `enter a value:\n>`
        } else {
            queryParamValues.push(ans)
            msg = `enter another key or type go to get search results\n>`
        }



        // Alternate between push() > key/value upon each iteration
        count = count + 1

        // Get the next key or value
        queryParams(msg)
    }

}




// Pushshift Service access
let queryParamsList = {}
let outputName;
let paginateAmnt;
let typeOfSearch;
let isPaused = false;
const runPushshiftQuery = function () {




    // Map query params from seperate arrays to singular object
    queryParamsList = mapKeyValuesToObject(queryParamKeys, queryParamValues)



    // Query STDIN for outputName, paginateAmnt, and typeOfSearch

    let typeOfSearchPrompt = 'type of search:\n>'
    let paginatePrompt = 'pagination amount:\n>'
    let outputNamePrompt = 'db output name:\n>'

    // Set Type Of Search
    readLine.question(typeOfSearchPrompt, (ans) => {
        typeOfSearch = ans

        // Set Pagination Amnt
        readLine.question(paginatePrompt, (ans) => {
            paginateAmnt = ans

            // Set Output Name
            readLine.question(outputNamePrompt, (ans) => {
                outputName = ans

                // Send Query
                completeQuery()
              
            })



        })



    })

    // Prompt user for another command
    returnToPrompt();



}

// Waits for promptSearchOptions() to complete then executes
const completeQuery = function () {
    isPaused = true;

    if (isPaused) {
        setTimeout(function () {
            // THEN Send request to Pushshift with params and options
            queryPushShift(queryParamsList, typeOfSearch, paginateAmnt, outputName)
            
            queryMessage = `Input a query param, then a value. When you're done, type 'go'\n>`
            // 
        }, 100)
    }



}



const returnToPrompt = function () {

    if (isPaused) {
        setTimeout(function () {
            run()
            isPaused = false;
        }, 100)
    }

}


// Called from queryParams>includeInParams when user types 'cancel'
const cancelQuery = function () {
    console.log('canceling')
    clearObjects()
    queryMessage = `Search cancelled. What would you like to do now?\n>`

    run();
}

// Clear Objects -- refreshes all temporary objects used to create a new search
const clearObjects = function () {
    console.log('clearing objects')
    queryParamKeys = []
    queryParamValues = []
    queryParamsList = new Array
    count = 1;

}


// Map Key Values to Object
const mapKeyValuesToObject = function (keys, values) {
    isPaused = true


    let result = {}
    for (i = 0; i < keys.length; i++) {
        result[keys[i]] = values[i];
    }

    isPaused = false

    return result;

}




// Help -- Displays list of commands
const help = function () {
    console.log(

        `\**********_SnootyHelp_**********
    \nThanks for choosing SnootyScraper!
    \nHere is a list of options you can choose from:
    \nhelp - displays this menu
    \nquery - query pushshift data
    \nexit - exits the program\n`)

    run()

}


// Exit App
const exit = function () {

    console.log('Thanks for choosing SnootyScraper! Goobye!')
    process.exit()

}



// Handle Errors
const error = function (input) {
    console.log("'" + input + "' is not a valid input! please try again!\n")
    run();
}




module.exports = {
    Snooty: Snooty,
    run: run
}
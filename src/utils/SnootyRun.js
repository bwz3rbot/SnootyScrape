// Snooty Run provides a CLI for the user to query data

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
// Set Query Params
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
const runPushshiftQuery = function () {


    // Map query params from seperate arrays to singular object
    queryParamsList = mapKeyValuesToObject(queryParamKeys, queryParamValues)
    console.log('after mapping key values to objects ...\nqueryParamsList = ')
    console.dir(queryParamsList)
    if (queryParamsList.size === null || queryParamsList.size === undefined) {
        console.log('queryParamsList was null.. setting to 25')
        console.dir(queryParamsList)

        queryParamsList.size = 25

        console.dir(queryParamsList)
    }



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

                // Send Get Request to pushshift, then (when ready) callback returnToPrompt
                completeQuery()

            })


        })

    })

}




// helps the returnToPrompt callback decide when to run
let totalNumberItems
class Ready {

    // Total Number of Items
    setTotalNumberItems() {
        console.log('setting total number of items...')

        console.log('queryParamsList.size = ' + queryParamsList.size)
        console.log('paginateAmnt = ' + paginateAmnt)


        // Multiply queryParams[size] * paginationAmnt to get total number of items to be indexed
        totalNumberItems =
            parseInt(queryParamsList.size) * (parseInt(paginateAmnt) + 1)
        console.log('total number of items to be indexed: ' + totalNumberItems)
    }

    checkIfReady() {
        checkIfReady(totalNumberItems)
    }

}

let checkIfReady = function (totalNumberItems) {
    return returnToPrompt(totalNumberItems)
}


// Helps the Ready class know when to return true
let itemCount = totalNumberItems;
let countDownItems = function (totalNumberItems) {
    console.log('CHECKING IF READY!\n COUNT = ' + totalNumberItems)



    if (itemCount < 0) {
        // Decrement count each pass
        console.log('ON ITEM: ' + itemCount)
        itemCount = itemCount - 1
    }

    if (itemCount === 0) {
        console.log('!LAST ITEM!')


    }
}
// Callback (ran from within sentimentDTO)
const returnToPrompt = function (totalNumberItems) {

    // Checks the ready class for if the size of remaining search is = 0
    if (countDownItems(totalNumberItems)) {
        run()
    }


}


// Sends complete request to pushshift
const completeQuery = function () {

    // THEN Send request to Pushshift with params and options
    Ready.prototype.setTotalNumberItems();
    queryPushShift(queryParamsList, typeOfSearch, paginateAmnt, outputName, ()=> {
        //THEN
        run()
    })

    queryMessage = `Input a query param, then a value. When you're done, type 'go'\n>`

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



    let result = {}
    for (i = 0; i < keys.length; i++) {
        result[keys[i]] = values[i];
    }


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
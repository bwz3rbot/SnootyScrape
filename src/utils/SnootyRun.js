// Snooty Run provides a CLI for the user to query data

// Standard In
const readLine = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

// Pushshift Query Service
const queryPushShift = require('../service/pushshiftService').get

// User Query Service
const userService = require('../service/userService')

//Snooty Class creates a wrapper for SnootyRun
class Snooty {

    // Constructor -- calls run()
    constructor() {


        let current_datetime = new Date()
        console.log(current_datetime)
        console.log("Welcome to SnootyScraper")



        // Query user input
        run()
    }

}


/////////////RUN APP\\\\\\\\\\\\\\\\\
// Run App -- Prompts user input from console
let promptMessage = 'What would you like to do?\n > '
const run = function (newMessage) {

    if (newMessage) {
        promptMessage = newMessage
    }




    // Options: help, query, exit, (error)
    readLine.question(promptMessage, ans => {

        ans === 'help' ? help(ans) : ans === 'query' ? queryParams() : ans === 'user' ? user() : ans === 'exit' ? exit() : ans === 'cat' ? leCatMe() : error(ans)



    })

}
//////////////////////////



//
//// 1.
////// Set Query Params
let initialQueryMsg = `Input first a query param, then a value.
\nWhen you're done, type '/go or /cancel to return to the main menu.'\nkey: > `
let queryMessage = initialQueryMsg;
const queryParams = function (msg) {


    if (msg) { // msg updates upon recursion
        queryMessage = msg
    }


    // includeInParams() > runPushshiftQuery()
    readLine.question(queryMessage, ans => {
        ans != '/go' ? includeInParams(ans) : runPushshiftQuery()
    })



    ////// Call includeInParams() until user types '/go'
}


//
//// 1.a
////// IncludeInParams
let queryParamKeys = []
let queryParamValues = []
let count = 1;
let msg = '';
const includeInParams = function (ans) {

    // [Oops] command resets query
    if (ans === '/cancel') {
        cancelQuery()
    } else {




        // Push keys and values to respective arrays
        if (count % 2) {
            queryParamKeys.push(ans)
            msg = `value: > `
        } else {
            queryParamValues.push(ans)
            msg = `key: > `
        }



        // Alternate between push() > key/value upon each iteration
        count = count + 1

        // Get the next key or value with the correct message
        queryParams(msg)
    }

}

//
//// 2.
//////// Run Pushshift Query
let queryParamsList = {}
let outputName;
let paginateAmnt;
let typeOfSearch;
const runPushshiftQuery = function () {



    // Map query params from seperate arrays to singular object
    queryParamsList = mapKeyValuesToObject(queryParamKeys, queryParamValues)
    if (queryParamsList.size === null || queryParamsList.size === undefined) {
        console.log('size param was null.. defaulting to to 25')
        queryParamsList.size = 25
    }

    console.dir(queryParamsList)


    // Query user for outputName, paginateAmnt, and typeOfSearch
    let typeOfSearchPrompt = 'type of search (comment OR submission):\n > '
    let paginatePrompt = 'pagination amount:\n > '
    let outputNamePrompt = 'db output name:\n > '
    let validationPrompt;
    let yield;
    let sizeParam;
    // Set Type Of Search
    readLine.question(typeOfSearchPrompt, (ans) => {
        if (ans === '' || ans === undefined || ans === null) {
            typeOfSearch = 'comment'
        } else {
            typeOfSearch = ans
        }


        // Set Pagination Amnt
        readLine.question('\t'+typeOfSearch+'\n'+paginatePrompt, (ans) => {
            if (ans === '' || ans === undefined || ans === null) {
                paginateAmnt = 0
            } else {
                paginateAmnt = ans
            }
            // Set Output Name
            readLine.question('\t'+paginateAmnt+'\n'+outputNamePrompt, (ans) => {

                if (ans === '' || ans === undefined || ans === null) {
                    outputName = queryParamsList.q
                    console.log('\t'+outputName)
                } else {
                    outputName = ans
                }


                queryParamsListToString = JSON.stringify(queryParamsList, '', 2)
                yield = 0;
                sizeParam = parseInt(queryParamsList.size)
                paginateNum = parseInt(paginateAmnt) + 1

                yield = (sizeParam) * (paginateNum)


                // Validate user input
                validationPrompt =
                    'query params: \n' + queryParamsListToString +
                    '\n | type of search:' + typeOfSearch +
                    '\n | paginate amount: ' + paginateAmnt +
                    '\n | output name: ' + outputName +
                    `\n your search could yeild up to ${yield} results.` +
                    'Is this correct?: \n' +
                    '\n(y/n) > '
                readLine.question(validationPrompt, (ans) => {

                    // if user types 'y' or 'yes', send get request
                    if (ans === 'y' || ans === 'yes' || (ans === '' || ans === undefined || ans === null)) {
                        completeQuery()

                        // if user types 'n' or 'no', cancel the query and reset values
                    } else if (ans === 'n') {
                        cancelQuery('Search Complete! What would you like to do now?\n > ')
                    }
                })
            })
        })
    })
}


//
//// 2.b
////// Complete Query
const completeQuery = function () {

    queryPushShift(queryParamsList, typeOfSearch, paginateAmnt, outputName, () => {
        // Upon completion of task loop, go back to run
        run()
    })

    queryMessage = initialQueryMsg

}



//
//// 1.b
////// Called from queryParams>includeInParams when user types '/cancel'
let newMessage;
const cancelQuery = function (msg) {
    console.log('canceling...')

    // Clears query params and count
    //(count: for alternating between pushing keys and values into arrays)
    clearObjects()
    if (msg) {
        newMessage = msg;
    }
    console.log('Search cancelled!')
    run('What would you like to do next?\n > ');
}

//
//// 1.c
////// Clear Objects -- refreshes all temporary objects used to create a new request
const clearObjects = function () {
    queryParamKeys = []
    queryParamValues = []
    queryParamsList = new Array
    count = 1;

}

//
//// 2.a
////// Map Key Values to Object
const mapKeyValuesToObject = function (keys, values) {



    let result = {}
    for (i = 0; i < keys.length; i++) {
        result[keys[i]] = values[i];
    }


    return result;

}



//
//// 3.
////// Get User History
const user = function () {

    readLine.question('Which user?\n > ', (ans) => {
        userService.getAllUserComments(ans, function () {
            // After complete, back to run()
            run();
        })

    })

}



// Help -- Displays list of commands
const help = function () {
    console.log(

        `\n ___________________Help___________________
        \nHere is a list of options you can choose from:
    \n - help - display a list of available options
    \n - query - form and send a pushshift request
    \n - user - generate report on a specific user
    \n - exit - exits the program\n`)

    newMsg = 'What would you like to do?\n > '
    run(newMsg)

}


// Exit App
const exit = function () {

    console.log('Thanks for choosing SnootyScraper! Goobye!')
    process.exit()

}



// Handle Errors
const error = function (input) {


    msg =
        "\n'" + input + "' is not a valid input! please try again! \n" +
        `or try typing 'help' for a list of commands\n>`



    run(msg);
}


let catMe = require('cat-me')
const leCatMe = function () {

    console.log(catMe())
    run();

}




module.exports = {
    Snooty: Snooty,
    run: run
}
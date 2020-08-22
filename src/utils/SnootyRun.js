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


        run()
    }







}


// Run App -- Prompts user for query... Calls queryParams()
let promptMessage = 'What would you like to do?\n>'
const run = function () {




    readLine.question(promptMessage, ans => {

        ans === 'help' ? help(ans) : ans === 'query' ? queryParams() : ans === 'exit' ? exit() : error(ans)



    })

}




// Query Params -- 
// (called when user says 'query') -> calls function includeInParams()
let queryMessage = `Input a query param, then a value. When you're done, type 'go'\n>`
const queryParams = function (msg) {

    // msg updates upon recursion
    if (msg) {
        queryMessage = msg
    }

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

    if (ans === 'cancel') {
        cancelQuery()
    } else {






        if (count % 2) {

            queryParamKeys.push(ans)
            msg = `enter a value:\n>`
        } else {

            queryParamValues.push(ans)
            msg = `enter another key or type go to get search results\n>`
        }



        count = count + 1

        queryParams(msg)
    }

}


// Pushshift Service access
let queryParamsList = {}
let outputName;
let paginate;
let typeOfSearch;
const runPushshiftQuery = function () {

    console.log('prompting user for outputname, paginations, and type of search:')
    typeOfSearch = 'type of search'

    
    readLine.question(typeOfSearch, (ans) => {
        typeOfSearch = ans

    })

    queryParamsList = mapKeyValuesToObject(queryParamKeys, queryParamValues)

    console.dir(queryParamsList)

    console.log('beginning search!')

    queryPushShift(queryParamsList, typeOfSearch, paginate, outputName)

    console.log('pushshift query complete!\n')


    queryMessage = `Input a query param, then a value. When you're done, type 'go'\n>`
    clearObjects();

    run()


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
    for (i = 0; i < keys.length; i++)
        result[keys[i]] = values[i];

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
// Snooty Runner. Prompts input and allows user to input commands to the terminal.
const readLine = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

const queryPushShift = require('../service/pushshiftService').get



class Snooty {


    constructor() {
        console.log("Welcome to SnootyScraper! -- " + Date.now() + '\n*************************************************************')

        this.run = run


    }





}

const run = function (func) {

    readLine.question('What would you like to do?\n', ans => {

        ans === 'help' ? help(ans) : ans === 'query' ? queryParams(ans) : ans === 'exit' ? exit() : error(ans)



    })

}

const error = function (input) {
    console.log("'" + input + "' is not a valid input! please try again!\n")
    run();
}


const queryParams = function () {

    readLine.question(`choose your query params when you're done, input go.\n>`, ans => {
        ans != 'go' ? includeInParams(ans) : runPushshiftQuery()
    })

}




let count = 1;
const includeInParams = function (ans) {


    if (count % 2) {
        queryParamKeys.push(ans)
    } else {
        queryParamValues.push(ans)
    }

    count = count + 1;
    queryParams()
}


const queryParamKeys = []
const queryParamValues = []

const runPushshiftQuery = function () {


    let queryParamsList = mapKeyValuesToObject(queryParamKeys, queryParamValues)
    console.dir(queryParamsList)


    // queryPushShift(queryParamsList, 'comment', 1, 'test')

    console.log('pushshift query complete!')

    run()


}

const mapKeyValuesToObject = function (keys, values) {
    let result = {}
    for (i = 0; i < keys.length; i++)
        result[keys[i]] = values[i];

    return result;

}



const help = function () {
    console.log(

        `**********_SnootyHelp_**********
    \nThanks for choosing SnootyScraper!
    \nHere is a list of options you can choose from:
    \nhelp - displays this menu
    \nquery - query pushshift data
    \nexit - exits the program`)

    run()

}

const exit = function () {

    console.log('Thanks for choosing SnootyScraper! Goobye!')
    process.exit()

}



module.exports = {
    Snooty: Snooty
}
const fs = require('fs')
const prepend = './secure/'
const writeToFile = function (filename, item) {

    console.log("writing to file...")
    if (typeof item === Object) {
        console.log("typeof item received === Object... stringifying item")
        item = JSON.stringify(item)
    }


    fs.writeFile(prepend + filename, item, (err) => {
        if (err) throw err;
        console.log("file saved")
    })
}

const stringifyThenSave = function (filename, item) {
    let str = JSON.stringify(item);
    fs.writeFile(prepend + filename, str, (err) => {
        if (err) throw err;
        console.log("file saved")
    })

}


module.exports = {
    writeToFile: writeToFile,
    stringifyThenSave: stringifyThenSave
}
const fs = require('fs')

const writeToFile = function (filename, item) {
    console.log("inside of write file function")
    console.log("typeof filename = " + typeof filename)
    console.log("typeof item = " + typeof item)

    fs.writeFile(filename, item, (err) => {
        if (err) throw err;
        console.log("file saved")
    } )
}


exports.writeToFile = writeToFile
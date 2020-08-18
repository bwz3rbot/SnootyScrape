const fs = require('fs')

const writeToFile = function (filename, item) {
    console.log("inside of write file function")
    console.log("typeof filename = " + typeof filename)
    console.log("typeof item = " + typeof item)

    const prepend = './secure/'
    fs.writeFile(prepend+filename, item, (err) => {
        if (err) throw err;
        console.log("file saved")
    } )
}


exports.writeToFile = writeToFile
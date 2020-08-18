const snoowrap = require('../config/snoo-config').snoowrap
const jsonExporter = require('../utils/jsonFileExporter')



let saveUserData = function (username) {

    return snoowrap.getUser(username).fetch().then(userInfo => {
        console.log("writing to file user data, " + userInfo)
        let userInf = JSON.stringify(userInfo)
        jsonExporter.writeToFile(`u_${username}.json`, userInf)
    })
}

let getUser = async function (username) {
    return snoowrap.getUser()
}

exports.getUser = getUser
exports.saveUserData = saveUserData
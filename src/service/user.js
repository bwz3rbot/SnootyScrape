const snoowrap = require('../config/snoo-config').snoowrap



// let getUser = async function (username) {

//     return snoowrap.getUser(username).fetch().then(userInfo => {
//         console.log("writing to file user data, "+ userInfo)
//         let userInf = JSON.stringify(userInfo)
//         jsonExporter.writeFile('userfile.json',userInf)
//     })
// }
let getUser = async function (username) {

    return await snoowrap.getUser(username).fetch()
}

exports.getUser = getUser
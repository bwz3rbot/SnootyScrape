// User Micorservice
// Can Get User
const snoowrap = require('../config/snoo-config').snoowrap
const jsonExporter = require('../utils/jsonFileExporter')
const {
    RedditUser
} = require('snoowrap')
const jsonFileExporter = require('../utils/jsonFileExporter')
const userDTO = require('../data/userDTO')



const saveUserData = function (username) {

    return snoowrap.getUser(username).fetch().then(userInfo => {
        console.log("writing to file user data, " + userInfo)
        let userInf = JSON.stringify(userInfo)
        jsonExporter.writeToFile(`u_${username}.json`, userInf)
    })
}

const getUser = function (username) {
    return snoowrap.getUser(username)
}

const getUserOverview = function (username) {
    snoowrap.getUser(username).fetch().then(user => {
        user.getOverview().then(overview => {
            console.log("user.getOverview returns overview with typeof = " + typeof overview)



            jsonExporter.writeToFile(`u_${username}-Overview.json`, JSON.stringify(overview))



        });

    })


}

const saveGildedContent = function (username) {
    return snoowrap.getUser(username).getGildedContent().then(content => {
        jsonFileExporter.stringifyThenSave(`u_${username}.gildedContent.json`, content)
    })
}



const mapUsertoDB = function (username) {
    
    snoowrap.getUser(username).fetch().then(user => {
        userDTO.saveUserToDB(user)
    
        // userDTO.saveUserToDB(user)
    })

}



module.exports = {
    saveUserData: saveUserData,
    getUser: getUser,
    getUserOverview: getUserOverview,
    saveGildedContent: saveGildedContent,
    mapUsertoDB: mapUsertoDB
}
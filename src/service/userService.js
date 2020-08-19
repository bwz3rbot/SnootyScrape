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
        jsonExporter.writeToFile(`u_${username}`, userInf)
    })
}

const getUser = function (username) {
    return snoowrap.getUser(username)
}

const getUserOverview = function (username) {
    snoowrap.getUser(username).fetch().then(user => {
        user.getOverview().then(overview => {
            console.log("user.getOverview returns overview with typeof = " + typeof overview)



            jsonExporter.writeToFile(`u_${username}-Overview`, JSON.stringify(overview))



        });

    })


}

const saveGildedContent = function (username) {
    return snoowrap.getUser(username).getGildedContent().then(content => {
        jsonFileExporter.stringifyThenSave(`u_${username}.gildedContent`, content)
    })
}

// const mapUsertoDB = function(username){
//     snoowrap.getUser(username).fetch().then(user => {
//         console.log(typeof user.name)
//     })
// }

const mapUsertoDB = function (username) {

    snoowrap.getUser(username).fetch().then(user => {


        userDTO.saveUserToDB(

            user.name,

            user.subreddit.display_name.previous_names,

            user.subreddit.display_name.public_description,

            user.subreddit.display_name.icon_img,

            user.pref_geopopular,

            user.coins,

            user.awardee_karma,

            user.awarder_karma,

            user.has_gold_subscription,

            user.gold_creddits,

            user.gold_expiration,

            user.is_gold,

            user.has_subscribed_to_premium,

            user.has_paypal_subscription,

            user.is_sponsor,


            user.subreddit.display_name.subscribers,

            user.num_friends,

            user.comment_karma,

            user.link_karma,

            user.total_karma,

            user.pref_nightmode,

            user.is_mod,

            user.over_18,

            user.hide_from_robots,

            user.created,

            user.id

        )
    })

}



module.exports = {
    saveUserData: saveUserData,
    getUser: getUser,
    getUserOverview: getUserOverview,
    saveGildedContent: saveGildedContent,
    mapUsertoDB: mapUsertoDB
}
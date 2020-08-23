// User Micorservice
// Gets information about a specific user and logs to 'users' collection of db

const snoowrap = require('../config/snoo-config').snoowrap
const userDTO = require('../data/userDTO')

const {
    SentimentObject
} = require('./sentimentAnalysisService')




// Returns a RedditObject(user)
const getUser = function (username) {
    return snoowrap.getUser(username)
}


// Generates a list of every comment a specific user has ever made and saves to 'users' collection
let totalLength;
let count;
let countMsg;
const getAllUserComments = function (username, _callback) {
    console.log('\nFetching all comments from u/' + username +
        '\nplease wait....\t(this could take a while) \n')
    getUser(username).getComments().fetchAll().then(function (comments) {

        totalLength = comments.length
        count = totalLength;

        if (count > 0){
            countMsg = 'indexing now...'
        } else {
            countMsg = 'returning to the main menu'
        }
        console.log(`found ${count} items. ${countMsg}` )
        

        if(count > 0){

        

        comments.forEach(comment => {
            let newSentiment = new SentimentObject(comment, 'u/' + username);
            newSentiment.analyze();
            comment.save();

            if (count === 1) {
                console.log('indexing complete!')
                _callback()

            } else {
               
                count = count - 1
            }




        })
    } else {
        _callback();

    }


    })
}


//TODO: make this function save a user to another collection when getAllUserComments() is called
const mapUsertoDB = function (username) {
    console.log("USER SERVICE -- MAPPING USER TO DB")

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
    getUser: getUser,
    getAllUserComments: getAllUserComments
}
const mongoose = require('../config/db-config').mongoose

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        default: "DEFAULT_USERNAME"
    },
    previous_names: {
        type: Array,
        default: []
    },
    public_description: {
        type: String,
        default: ""
    },
    icon_image: {
        type: String,
        default: ""
    },


    geoPopular: {
        type: String,
        default: ""
    },
    coins: {
        type: Number,
        default: 0
    },
    awardee_karma: {
        type: Number,
        default: 0
    },
    awarder_karma: {
        type: Number,
        default: 0
    },
    has_gold_subscription: {
        type: Boolean,
        default: false
    },
    gold_credits: {
        type: Number,
        default: 0
    },
    gold_expiration: {
        type: Number,
        default: 0
    },
    is_gold: {
        type: Boolean,
        default: false
    },

    is_sponsor: {
        type: Boolean,
        default: false
    },

    subscribers: {
        type: Number,
        default: 0
    },
    num_friends: {
        type: Number,
        default: 0
    },

    comment_karma: {
        type: Number,
        default: 0
    },
    link_karma: {
        type: Number,
        default: 0
    },
    total_karma: {
        type: Number,
        default: 0
    },


    prefer_nightmode: {
        type: Boolean,
        default: 0
    },
    is_mod: {
        type: Boolean,
        default: 0
    },
    over_18: {
        type: Boolean,
        default: 0
    },
    hide_from_robots: {
        type: Boolean,
        default: 0
    },
    created: {
        type: Date,
        default: Date.now
    },
    id: {
        type: String,
        default: ""
    }







})
const User = mongoose.model("Dataset", userSchema)

let saveUserToDB = function (
    name,
    previous_names,
    public_description,
    icon_image,
    geoPopular,
    coins,
    awardee_karma,
    awarder_karma,
    has_gold_subscription,
    gold_credits,
    gold_expiration,
    is_gold,
    is_sponsor,
    subscribers,
    num_friends,
    comment_karma,
    link_karma,
    total_karma,
    prefer_nightmode,
    is_mod,
    over_18,
    hide_from_robots,
    created,
    id) {



    User.create({
        name: name,
        previous_names: previous_names,
        public_description: public_description,
        icon_image: icon_image,
        geoPopular: geoPopular,
        coins: coins,
        awardee_karma: awardee_karma,
        awarder_karma:awarder_karma,
        has_gold_subscription:has_gold_subscription,
        

    }, function (err, obj) {
        if (err) {
            console.log(err);
        } else {
            console.log(`user created, ${obj}`)
        }
    })



}





module.exports.saveUserToDB = saveUserToDB;
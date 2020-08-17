const snoowrap = require('../config/snoo-config.js')



let getUser = function(snoowrap){
    snoowrap.getUser('Bwz3r').fetch().then(userInfo => {
    console.log(userInfo)
})
}

exports.getUser = getUser
const snoowrap = require('../config/snoo-config').snoowrap

const C = require('../common/constants')


// const test = function () {
//     snoowrap.getSubmission('ic9ddd').fetch().then(submission => {
//         jsonFileExporter.stringifyThenSave('ic9ddd',submission)
//     })
// }


// const test = function () {
//     snoowrap.getKarma().then(karma=>{
//         console.log(karma)
//     })
// }


// const test = function () {
//     snoowrap.getPreferences().then(karma=>{
//         console.log(karma)
//     })
// }


// const test = function () {
//     snoowrap.updatePreferences({
//         allow_clicktracking: false

//     })
// }

const test = function () {
    snoowrap.submitLink({
        subredditName: 'Bwz3rBot',
        title: 'adding flair template',
        url: 'http://www.web-temps.github.io/aboutMe2',
        resubmit: false
    }).then(submission => {
        submission.selectFlair({
            flair_template_id: C.BOT_APPROVED_FLAIR_ID
        })
    })
}

module.exports.test = test
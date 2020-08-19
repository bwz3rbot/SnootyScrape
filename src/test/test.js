const snoowrap = require('../config/snoo-config').snoowrap
const jsonFileExporter = require('../utils/jsonFileExporter')


const test = function () {
    snoowrap.getSubmission('ic9ddd').fetch().then(submission => {
        jsonFileExporter.stringifyThenSave('ic9ddd',submission)
    })
}

module.exports.test = test
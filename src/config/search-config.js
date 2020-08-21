// Edit params for queryPushshift
let PARAMS = {
    q: 'Elvis',
    size: 5,
    subreddit: 'askreddit'
}

const TYPE = {
    COMMENT: 'comment',
    SUBMISSION: 'submission'

}

const COLLECTION_NAME = "10ResultsAboutElvis"

const PAGES = 1;

module.exports = {
    PARAMS:PARAMS,
    TYPE:TYPE,
    COLLECTION_NAME:COLLECTION_NAME,
    PAGES:PAGES
}

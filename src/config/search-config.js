// Edit params for queryPushshift
const PARAMS = {
    q: 'javascript',
    size: 10,
    subreddit: 'askreddit'
}

const TYPE = {
    COMMENT: 'comment',
    SUBMISSION: 'submission'

}

// 0 = one page of results. 
// 1 = two pages(one pagination), 
// 2 = three pages of data returned(twice paginated)
// Update this value to get more results.
const PAGINATE = 0;

const DATASET_NAME = '';



module.exports = {
    PARAMS:PARAMS,
    TYPE:TYPE,
    PAGINATE:PAGINATE,
    DATASET_NAME:DATASET_NAME
}

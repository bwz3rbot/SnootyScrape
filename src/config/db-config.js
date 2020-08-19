// Mongoose DB Configuration

const mongoose = require('mongoose')
const url = process.env.DB_URL
console.log(`connection to url: ${url}`)

mongoose.connect(process.env.DB_URL, {

    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(console.log("connection success"))



module.exports.mongoose = mongoose
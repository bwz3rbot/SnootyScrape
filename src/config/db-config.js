// Mongoose DB Configuration



const mongoose = require('mongoose')



const url = process.env.DB_URL
console.log(`connection to url: ${url}`)

console.log("CONNECTING MONGOOSE")
mongoose.connect(process.env.DB_URL, {

    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(console.log("connection success"))
console.log('MONGOOSE CONNECTION SUCCESS')






module.exports.mongoose = mongoose
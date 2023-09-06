// const mongoose = require('mongoose');
// const mongooseDBLinkk = process.env.mongodblink
// mongoose.connect(mongooseDBLinkk)
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/final-project-khai');

module.exports = mongoose;
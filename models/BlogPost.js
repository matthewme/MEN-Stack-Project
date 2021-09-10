const mongoose = require('mongoose')
var Schema = mongoose.Schema;

var blogPostSchema = new Schema({
  title: String,
  content: String,
  username: String,
  datePosted:{
    type: Date,
    default: new Date()
  },
  image: String

});

// MongoDB model
const BlogPost  = mongoose.model('testCollection', blogPostSchema);
module.exports = BlogPost
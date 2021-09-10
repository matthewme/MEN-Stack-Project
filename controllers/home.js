// This controller is for displaying the home page and all the posts in the DB
const BlogPost = require('../models/BlogPost.js')

module.exports = async (req,res) =>{
    var blogposts = await BlogPost.find({})
    console.log(req.session)
    res.render('index', {blogposts})

}
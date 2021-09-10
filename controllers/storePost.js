// This controller takes a new blog posts from the New Post tab and inserts it into the DB
const BlogPost = require('../models/BlogPost.js')
const path = require('path')

module.exports = async (req,res) =>{
    //Save the Image
    let image = req.files.image
  
    await image.mv('./public/assets/img/' + image.name);
  
    // Save data to MongoDB
    const data = {
      title: req.body.title,
      content: req.body.body,
      image: "/assets/img/" + image.name
    }
  
    const  newBlogPost = new BlogPost(data)
    newBlogPost.save()
  
    res.redirect('/')
  };
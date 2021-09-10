// This Controller takes a blog post from the DB and display it
const BlogPost = require('../models/BlogPost.js')

module.exports = async (req,res) =>{
    const blogpost = await BlogPost.findById(req.params.id)
    //console.log(req.params)
    res.render('post', {blogpost})
    }
/*server.get('/post/:id', async (req,res) =>{
    const blogpost = await testCollection.findById(req.params.id)
    //console.log(req.params)
    res.render('post', {blogpost})
  })
*/

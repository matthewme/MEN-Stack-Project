const User = require('../models/User.js')
const path = require('path');

module.exports = async (req,res) =>{

  // Save data to MongoDB
  const data = {
    username: req.body.username,
    password: req.body.password,
  }

  const  newUser = new User(data)

  newUser.save(data, (error, user) => {
    if(error){
      //Store validation errors
      const validationErrors  = Object.keys(error.errors).map(key => error.errors[key].message)
      req.session.validationErrors = validationErrors
      //req.flash('validationErrors', validationErrors)

      return res.redirect('/auth/register')
    }
    res.redirect('/')
  })
};

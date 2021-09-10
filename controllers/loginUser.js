// This controller verifies the user credentials
const bcyrpt = require('bcrypt')
const User = require('../models/User.js')

module.exports = (req,res) => {
    const { username, password } = req.body
    
    User.findOne({ username:username }, (error,user) => {
        if(user){
            bcyrpt.compare(password, user.password, (error,same) =>{
                if(same){// If password match
                    //Store User session
                    req.session.userID = user._id
                    res.redirect('/')
                }
                else{
                    res.redirect('/auth/login')
                }
            })
        }
        else{
            res.redirect('/auth/login')
        }
    })
}
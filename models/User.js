const mongoose = require('mongoose')
const Schema = mongoose.Schema
var uniqueValidator = require('mongoose-unique-validator')
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true,'Please provide username'],
        unique: [true,'Username Taken']
    },
    password: {
        type: String,
        required: [true,'Please provide password']
    }   
})

UserSchema.plugin(uniqueValidator)

UserSchema.pre('save',function(next){
    const user = this // 'this' == UserSchema. Mongoose makes it that way

    bcrypt.hash(user.password, 10, (error,hash) => {
        user.password = hash
        next()
    })
})

//Export Model
const User = mongoose.model('user',UserSchema)
module.exports = User

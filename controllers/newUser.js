const flash = require('connect-flash')

module.exports = (req,res) => {
    // Render register.ejs
    res.render('register',{
        errors: req.session.validationErrors
        //errors: flash('validationErrors')
    }) 
}
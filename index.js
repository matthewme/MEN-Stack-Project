// Inlcude packages adn modules
const express = require('express')
//const { MongoClient, MongoGridFSChunkError, Db } = require("mongodb");
const ejs = require('ejs')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')
const homePageController = require('./controllers/home')
const newPostController = require('./controllers/newPost')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const loginPageController = require('./controllers/login')
const loginUserPageController = require('./controllers/loginUser')
const logoutController = require('./controllers/logout')
const expressSession = require('express-session')
const authMiddleWare = require('./middleware/authMiddleware');
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware');
const flash = require('connect-flash')

// Global Variables
global.loggedIn = null

// Create the server
const server = express()

// MongoDB URI
const uri = "mongodb+srv://MattAdmin:YNxJwYxMaLeidJgT@cluster0.bh0rb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

// Connect to the MongoDB cluster
mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
  console.log("Mongoose is connected")
})

// Use 
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended:true}))
server.use(fileUpload())
server.use(expressSession({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}))
server.use(flash())

server.use("*", (req,res,next) =>{
  loggedIn = req.session.userID
  next()
})

// Include static assests
server.use(express.static('./public'))

// Tell express to use EJS as our templating engine
// Any file ending with .ejs should be rendered with EJS package
server.set('view engine','ejs')

//------ Controllers ------//
// Home Page Controller
server.get('/', homePageController)

// New Post Page Controller
server.get('/posts/new', authMiddleWare, newPostController)

// Store Post Controller
// Take the blog post and insert it into the DB
server.post('/posts/store', authMiddleWare,storePostController)

//Get Post Controller
//Take a an indiviual blogpost and display it
server.get('/post/:id',getPostController)

// Display the new user page
server.get('/auth/register',redirectIfAuthenticatedMiddleware,newUserController)

// Store the new user in DB
server.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController)

// Display the login page
server.get('/auth/login', redirectIfAuthenticatedMiddleware, loginPageController)

// Post when user is logging in
server.post('/users/login', redirectIfAuthenticatedMiddleware,loginUserPageController)

// logout
server.get('/auth/logout', logoutController)

// Not found page
server.use((req,res) => res.render('notfound'))

//------ Start the server ------//
server.listen(5000, () => {
  console.log('Server is listening on port 5000')
})

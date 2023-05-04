if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// like imports
const express = require('express')
const app = express()
const bcrypt = require('bcrypt') // used for hashing passwords / comparing hashed passwords
const passport = require('passport') // used for user authentication
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override') //lets us use the delete method on app

// models
const userModel = require('./model/userModel')
const Product = require("./model/productModel");

// controllers
const loginController = require('./controller/loginController')
const registerController = require('./controller/registerController')
const productController = require("./controller/productController");
const cartController = require("./controller/cartController");

// routes
indexRoute = require('./routes/indexRoute')
loginRoute = require('./routes/loginRoute')
logoutRoute = require('./routes/logoutRoute')
registerRoute = require('./routes/registerRoute')
storeRoute = require('./routes/storeRoute')
homeRoute = require('./routes/homeRoute')
barrelFundRoute = require('./routes/barrelFundRoute')
recipesRoute = require('./routes/recipesRoute')
cartRoute = require('./routes/cartRoute')
cartDeleteRoute = require('./routes/cartDeleteRoute')
checkoutRoute = require('./routes/checkoutRoute')

// userslist was moved to usersModel.js

// setting view engine to ejs (since our views are in ejs)
app.set('view-engine', 'ejs')

// allows us to access user input values with req.body
app.use(express.urlencoded({ extended: false }))
app.use(flash())

// creating a session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

// app.get('/', checkAuthenticated, (req, res) => {
//   res.render('index.ejs', { name: req.user.name })
// })
app.use('/', homeRoute.router)

// LOGIN PAGE
// changes --------------------------------
app.use('/login', loginRoute.router)
// app.get('/login', checkNotAuthenticated, loginController.renderLogin)

// app.post('/login', checkNotAuthenticated, loginController.authenticateUser)

// REGISTER PAGE
app.use('/register', registerRoute.router)
// app.get('/register', checkNotAuthenticated, registerController.renderRegister)

// app.post('/register', checkNotAuthenticated, registerController.registerUser)
// changes --------------------------------

// LOGOUT / END SESSION
app.use('/logout', logoutRoute.router)
// app.delete('/logout', (req, res, next) => {
//   req.logOut((err) => {
//     if (err) {
//       return next(err);
//     }
//     res.redirect('/login');
//   });
// });

// STORE
// REGISTER PAGE
app.use('/store', storeRoute.router)

// checking if the user is authenticated (some pages require authentication and some pages should not be accessed when user is already authenticated)
// function checkAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     console.log("working3")
//     return next()
//   }

//   res.redirect('/login')
// }

// function checkNotAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     console.log("working4")
//     return res.redirect('/')
//   }
//   console.log("working5")
//   next()
// }


//use public folder for images
app.use("/public", express.static('public'));
app.use('/home', homeRoute.router)
app.use('/barrelFund', barrelFundRoute.router)
app.use('/recipes', recipesRoute.router)
app.use('/cart', cartRoute.router)
app.use('/cart-remove', cartDeleteRoute.router)
app.use('/checkout', checkoutRoute.router)

app.listen(3000)

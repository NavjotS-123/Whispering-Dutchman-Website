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
  

// checking if the user is authenticated (some pages require authentication and some pages should not be accessed when user is already authenticated)
function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        console.log("working3")
        return next()
    }

    res.redirect('/login')
}

module.exports = { checkAuthenticated }

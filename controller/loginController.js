
if (process.env.NODE_ENV !== 'production') {
    console.log('Running in development mode')
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
const userModel = require('../model/userModel')

const initializePassport = require('../passport-config')
initializePassport.initialize(
    passport,
    email => userModel.users.find(user => user.email === email),
    id => userModel.users.find(user => user.id === id)
)

const renderLogin = (req, res) => {
    res.render('login.ejs')
}

const authenticateUser = (req, res) => {
    console.log("working")
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res)
    console.log("working2")

}

module.exports = {
    renderLogin,
    authenticateUser
}

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

const renderRegister = (req, res) => {
    res.render('register.ejs')
}

const registerUser = async (req, res) => {
    try {
        //hashing the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        //adding the user to the user list
        userModel.users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        res.redirect('/login')
    } catch {
        res.redirect('/register')
    }
}

module.exports = {
    renderRegister,
    registerUser
}
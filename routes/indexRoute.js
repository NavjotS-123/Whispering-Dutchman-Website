// like imports
const express = require('express')
const router = express.Router()

// controllers
const checkAuthenticated = require('../controller/checkAuth')
const checkNotAuthenticated = require('../controller/checkNotAuth')
const loginController = require('../controller/loginController')
const registerController = require('../controller/registerController')

router.get('/', checkAuthenticated.checkAuthenticated, (req, res) => {
    res.render('index.ejs', { name: req.user.name })
})

module.exports = { router }
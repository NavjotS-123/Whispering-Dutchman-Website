// like imports
const express = require('express')
const router = express.Router()


// controllers
const checkAuthenticated = require('../controller/checkAuth')
const checkNotAuthenticated = require('../controller/checkNotAuth')
const loginController = require('../controller/loginController')
const registerController = require('../controller/registerController')
const productModel = require('../model/productModel')

const dbConnection = require('../model/dbConnection')

router.get('/', (req, res) => {
    res.render('recipes.ejs')
})
    

module.exports = { router }
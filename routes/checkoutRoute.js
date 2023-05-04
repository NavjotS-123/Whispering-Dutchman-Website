// like imports
const express = require('express')
const router = express.Router()

const cartController = require('../controller/cartController')

const dbConnection = require('../model/dbConnection')

router.post('/', (req, res, next) => {
    console.log('Checkout Pressed')
    cartController.wipeCart()
    res.end("Order Successfully Placed!")
})



module.exports = { router }
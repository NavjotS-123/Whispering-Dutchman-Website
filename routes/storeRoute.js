// like imports
const express = require('express')
const router = express.Router()


// controllers
const checkAuthenticated = require('../controller/checkAuth')
const checkNotAuthenticated = require('../controller/checkNotAuth')
const loginController = require('../controller/loginController')
const registerController = require('../controller/registerController')
const storeController = require('../controller/storeController')
const cartController = require("../controller/cartController")

const productModel = require('../model/productModel')


const dbConnection = require('../model/dbConnection')

var cart = new cartController(1);

/* ^^^^ Moved to cartRoute.js
router.post('/cart', (req, res, next) => {
    console.log('received a request for /add-to-cart')
    const result = cartController.addProductToCart(req)
    res.send(result)
})
*/

router.get('/', function(req, res){
    
    const con = dbConnection.connection

    // connecting to db
    con.connect()

    //query db
    con.query(
    'SELECT * FROM product', (err, row) => {
        if(err) {
        throw err
        }

        //get index of returned list
        //create array of product objects

        // table = res
        else {
            console.log("this is the result" + row)
            res.render('store.ejs', {content:row})
        }
    })
    // *** temporary implementation ***
})

// https://www.youtube.com/watch?v=bTYqeQ6p7bM&ab_channel=CourseOnDemand
// @ 51:10

module.exports = { router }

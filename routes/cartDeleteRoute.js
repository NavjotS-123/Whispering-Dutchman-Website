// like imports
const express = require('express')
const router = express.Router()

// controllers
const checkAuthenticated = require('../controller/checkAuth')
const checkNotAuthenticated = require('../controller/checkNotAuth')
const loginController = require('../controller/loginController')
const registerController = require('../controller/registerController')
const cartController = require('../controller/cartController')
const productModel = require('../model/productModel')

const dbConnection = require('../model/dbConnection')

router.post('/', (req, res, next) => {
    console.log('received a request for /delete-from-cart req=' + req.body.id)
    result = cartController.removeProductFromCart(req.body.id)
    
    console.log('cartRoute.post - loading cart page.')
    const con = dbConnection.connection

    // connecting to db
    con.connect()
    query = 'select product_name, image, cart_id, order_id, cart.product_id, quantity, cost from wdmdb.product, wdmdb.cart where cart.product_id = product.product_id'

    //query db
    con.query(query, (err, row) => {
        if(err) {
        throw err
        }

        //get index of returned list
        //create array of product objects

        // table = res
        else {
            console.log("cartRoute.get - this is the result" + row)
            res.render('cart.ejs', {content:row})
        }
    })
    // *** temporary implementation ***
})


module.exports = { router }

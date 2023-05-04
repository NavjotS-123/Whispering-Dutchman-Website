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


/*
router.get('/', (req, res) => {
    res.render('cart.ejs')
})
*/

router.get('/', function(req, res){
    
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


// ^^^^ Moved from storeRoute    
router.post('/', (req, res, next) => {
    console.log('received a request for /add-to-cart req=' + req.body.id)
    result = cartController.addProductToCart(req.body.id)
    
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

router.post('/cart-remove', (req, res, next) => {
    console.log('received a request for /cart-remove req=' + req.body.id)
})

module.exports = { router }

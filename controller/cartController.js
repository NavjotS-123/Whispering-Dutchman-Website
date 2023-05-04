if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const mysql = require('mysql2')
const dbConnection = require('../model/dbConnection');
const products = require('../controller/productController');
const cart = require("../model/cartModel");
const order = require("../model/orderModel");
const Product = require("../model/productModel");

const cartItems = [];
const customer_id = 1;
const order_id = 1;
var allProducts = [];

class cartController {

	//static allProducts = [new Product("1", "24.95", "10", "0"), new Product("2", "24.95", "1", "0")];
	static allProducts = [];
    

    
    constructor(order_id) {
        // this.order = new order();
        this.cart = new cart(order_id);
        this.allProducts = [];
    }

    static grabProductFromId(id) {
        for (const product of this.allProducts) {
            if (id === product.id) {
                return product;
            }
        }
    }

    static addProductToCart(id) {
        // Populate products list if not already done.
        if (this.allProducts.length < 1) {
            const connection = dbConnection.connection;
            try {
                connection.connect();
                var sql = "SELECT product_id, price, stock FROM wdmdb.product";
                connection.query(sql, (error, results) => {
                    if (error) {
                        //reject(error);
                        console.log(error);
                        throw error;
                    } 
                    //connection.end();

                    console.log('Products returned from db: ' + results.length);
                    results.forEach((result) => {
                        var id = result.product_id;
                        var price = result.price;
                        var stock = result.stock;
                        var quantity = 0;
                        //this.addProduct(id, price, stock, quantity);
                        this.allProducts.push(new Product(id, price, stock, quantity));
                        //console.log(this.products);
                    });

                    console.log("grabProductFromId - find product id " + id);
                    for (const product of this.allProducts) {
                        console.log("product.id = " + product.id);
                        if (id == product.id) {
                            console.log("Product match = " + product.id);
                            return cart.addProduct(product);
                        }
                    }
                });

            } catch (error) {
                console.log("Problem with grabbing the products from the database");
                console.log(error);
            }
        } else {
            console.log("grabProductFromId - find product id " + id);
            for (const product of this.allProducts) {
                console.log("product.id = " + product.id);
                if (id == product.id) {
                    console.log("Product match = " + product.id);
                    return cart.addProduct(product);
                }
            }
        }
    }

    static removeProductFromCart(id) {
        // Populate products list if not already done.
        if (this.allProducts.length < 1) {
            const connection = dbConnection.connection;
            try {
                connection.connect();
                var sql = "SELECT product_id, price, stock FROM wdmdb.product";
                connection.query(sql, (error, results) => {
                    if (error) {
                        //reject(error);
                        console.log(error);
                        throw error;
                    } 
                    //connection.end();

                    console.log('Products returned from db: ' + results.length);
                    results.forEach((result) => {
                        var id = result.product_id;
                        var price = result.price;
                        var stock = result.stock;
                        var quantity = 0;
                        //this.addProduct(id, price, stock, quantity);
                        this.allProducts.push(new Product(id, price, stock, quantity));
                        //console.log(this.products);
                    });

                    console.log("grabProductFromId - find product id " + id);
                    for (const product of this.allProducts) {
                        console.log("product.id = " + product.id);
                        if (id == product.id) {
                            console.log("Product match = " + product.id);
                            return cart.removeProduct(product);
                        }
                    }
                });

            } catch (error) {
                console.log("Problem with grabbing the products from the database");
                console.log(error);
            }
        } else {
            console.log("grabProductFromId - find product id " + id);
            for (const product of this.allProducts) {
                console.log("product.id = " + product.id);
                if (id == product.id) {
                    console.log("Product match = " + product.id);
                    return cart.removeProduct(product);
                }
            }
        }
    }

    static wipeCart() {
        cart.wipe();
        allProducts = [];
    }

    static showProductsInCart() {
        this.cart.showProducts();
    }
}

module.exports = cartController;

const Product = require("../model/productModel");
const mysql = require('mysql2')
const connection = require('../model/dbConnection')

class ProductController {

    static products = [];

    // Contructs a new product controller object containing an empty products array 
    constructor() {
        this.products = [];
    }

    // Grabs a product using a product id
    static grabProductFromId(id) {
        for (const product of this.products) {
            if (id === product.id) {
                return product;
            }
        }
    }

    // Creates a product object to be stored within the products array
    static addProduct(id, price, stock, quantity) {
        const product = new Product(id, price, stock, quantity);
        this.products.push(product);
        
    }

    // Removes a product from the products array when provided with a valid product_id
    static removeProduct(id) {
        const index = this.products.findIndex((product) => product.id === id);
        if (index !== -1) {
            this.products.splice(index, 1);
        }
    }

    // Has an issue where it takes to long to do this an other methods can be completed prior to this one.
    // Adds all products in the database to the products array.
    static async addAllProducts() {
        try {
            const results = await new Promise((resolve, reject) => {
                connection.connect();
                var sql = "SELECT * FROM `WDMDB`.`PRODUCT`";
                connection.query(sql, (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    }
                    connection.end();
                });
            });
            console.log('Products returned from db: ' + results.length);
            results.forEach((result) => {
                var id = result.product_id;
                var price = result.price;
                var stock = result.stock;
                var quantity = 0;
                this.addProduct(id, price, stock, quantity);
                console.log(this.products);
            });
        } catch (error) {
            console.log("Problem with grabbing the products from the database");
        }

        // connection.connect();
        // var sql = "SELECT * FROM `WDMDB`.`PRODUCT`";
        // connection.query(sql, (error, results) => {
        //     if (error) {
        //         console.log("Problem with grabbing the products from the database");
        //     } else {
        //         console.log('Products returned from db: ' + results.length);
        //         results.forEach((result) => {
        //             var id = result.product_id;
        //             var price = result.price;
        //             var stock = result.stock;
        //             var quantity = 0;
        //             this.addProduct(id, price, stock, quantity);
        //             console.log(this.products);
        //         });
        //     }
        //     connection.end();
        // });
    }
}

//updateStock(){
//
//}

module.exports = ProductController;

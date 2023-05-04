const cartController = require("../controller/cartController");
const ProductController = require("../controller/productController");
const dbConnection = require('../model/dbConnection')

class Cart {
    
    static order_id = 1;
    static products = [];
    
    
    constructor(order_id) {

        this.products = [];
        this.order_id = order_id;

    }

    // Adds a product to cart.products if it isn't in the array already if it is it changes the stock and quantity of the product
    static addProduct(productToAdd) {
        const productInCart = this.products.find(product => product.id === productToAdd.id);
        if (productInCart) {
            if (productInCart.stock >= 1) {
                productInCart.quantity += 1;
                productInCart.stock--;

            } else {
                console.log("Sorry that product is out of stock");
            }

        } else {
            productToAdd.quantity = 1;
            productToAdd.stock--;
            this.products.push(productToAdd);
        }
        
        this.updateCartDB();

    }

    // Works but deletes the entire product object from cart.products array should decrement quantity by 1 or delete if quantity is = 1
    static removeProduct(product) {
        const index = this.products.findIndex((i) => i.id === product.id);
        if (index !== -1) {
            this.products.splice(index, 1);
        }
        
        this.updateCartDB();
    }

    // Need to test still
    static getTotal() {
        return this.products.reduce((total, product) => total + product.price, 0);
    }

    // Need to test still
    static showProducts() {
        return this.products;
    }

    static updateCartDB() {
        console.log("cartModel.addToCartDB");
        const connection = dbConnection.connection;
        connection.connect();
        
        // Delete existing cart rows.
        var sql = "DELETE FROM wdmdb.cart WHERE order_id = ?";
        var values = [this.order_id];
        connection.query(sql, values, (function(err) {
            console.log('cart has been cleared for order_id ' + this.order_id);
        }));
        console.log('cart has been cleared for order_id ' + this.order_id);

        // Add cart rows.        
        this.products.forEach((product) => {
            var prodID = product.id;
            var quantity = product.quantity;
            var cost = product.price * quantity;

            var sql = "INSERT INTO `wdmdb`.`cart` (`order_id`,`product_id`, `quantity`, `cost`) VALUES (?, ?, ?, ?)"
            var values = [this.order_id, prodID, quantity, cost]
            connection.query(sql, values, (function(err) {
                console.log('cart has been updated')
            }));
        })
        //connection.end();
    }

    static wipe() {
        console.log("Wiping cart....")
        const connection = dbConnection.connection;
        connection.connect();
        
        // Delete existing cart rows.
        var sql = "DELETE FROM wdmdb.cart WHERE order_id = ?";
        var values = [this.order_id];
        connection.query(sql, values, (function(err) {
            console.log('cart has been cleared for order_id ' + this.order_id);
        }));
        console.log('cart has been cleared for order_id ' + this.order_id);

    }

}

module.exports = Cart;
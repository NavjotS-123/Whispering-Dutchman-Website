class Product {

    constructor(product_ID, price, stock, quantity) {
        this.id = product_ID;
        this.price = new Number(price);
        this.stock = stock;
        this.quantity = quantity;
    }
}

module.exports = Product;

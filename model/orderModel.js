class Order {
    constructor(orderID, totalCost, orderDate) {
        this.orderID = orderID;
        // this.customerId = customerId; not needed anymore
        this.cartId = cartId;
        this.totalCost = totalCost;
        this.orderDate = orderDate;
    }

    newOrderId() { // Needs a 
        var orderID;
        connection.connect()
        connection.query(
            'select * from wdmdb.orders order by order_id desc limit 1;', (err, res) => {
                if (err) {
                    throw err
                }
                orderID = res[0].order_id + 1;
                console.log(orderID);
                return orderID;
            })
        var sql = 'INSERT INTO WDMDB.ORDERS (order_id, total_cost) VALUES(?, ?)';
        values = [orderID, 0];
        connection.query(sql, values, (function(err) {
            console.log('Order has been created')
        }));
        connection.end()
    }

    saveOrderToDB(order) {
        const delStat = "Order has yet to be delivered";
        const sql = 'INSERT INTO orders (order_id, cart_id, delivery_status, total_cost) VALUES (?, ?, ?, ?, ?)';
        const values = [order.orderID, order.cartId, delStat, order.totalCost];
        connection.query(sql, values, (error, results) => {
            if (error) throw error;
            console.log('Order added to database.');
        });
    }
}
module.exports = function(newOrderId, saveToDB) {};
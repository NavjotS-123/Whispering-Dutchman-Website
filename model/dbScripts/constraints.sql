--CONSTRAINTS SCRIPT

ALTER TABLE `wdmdb`.`customers`
ADD FOREIGN KEY (order_id) REFERENCES orders(order_id)
ADD FOREIGN KEY (address_id) REFERENCES address(address_id);

ALTER TABLE `wdmdb`.`address`
ADD FOREIGN KEY (customer_id) REFERENCES customers(customer_id);

ALTER TABLE `wdmdb`.`orders`
ADD FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
ADD FOREIGN KEY (cart_id) REFERENCES cart(cart_id);

ALTER TABLE `wdmdb`.`cart`
ADD FOREIGN KEY (product_id) REFERENCES product(product_id)
FOREIGN KEY (order_id) REFERENCES orders(order_id);

ALTER TABLE `wdmdb`.`recipes`
ADD FOREIGN KEY (product_id) REFERENCES product(product_id);
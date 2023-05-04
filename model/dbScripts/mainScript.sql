DROP SCHEMA IF EXISTS `wdmdb` ;
CREATE SCHEMA `wdmdb` ;
USE `wdmdb` ;

CREATE TABLE `wdmdb`.`customers` (
  `customer_id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `f_name` VARCHAR(45) NOT NULL,
  `l_name` VARCHAR(45) NOT NULL,
  `phone` VARCHAR(12) NOT NULL,
  `address_id` INT,
  `order_id` INT,
   PRIMARY KEY (`customer_id`));

CREATE TABLE `wdmdb`.`address` (
  `address_id` INT NOT NULL AUTO_INCREMENT,
  `customer_id` INT NOT NULL,
  `country` VARCHAR(45) NOT NULL,
  `province` VARCHAR(45) NOT NULL,
  `city` VARCHAR(45) NOT NULL,
  `street_address` VARCHAR(45) NOT NULL,
  `zip_code` VARCHAR(45) NOT NULL,
   PRIMARY KEY (`address_id`));

CREATE TABLE `wdmdb`.`product` (
  `product_id` INT NOT NULL AUTO_INCREMENT,
  `product_name` VARCHAR(45),
  `price` FLOAT(30,2) NOT NULL,
  `alc_type` VARCHAR(1) NOT NULL,
  `alc_percent` FLOAT(4,2) NOT NULL,
  `stock` INT NOT NULL,
  `size` VARCHAR(10) NOT NULL,
  `image` VARCHAR(30),
   PRIMARY KEY (`product_id`));

CREATE TABLE `wdmdb`.`orders` (
  `order_id` INT NOT NULL AUTO_INCREMENT,
  `customer_id` INT NOT NULL,
  `cart_id` INT NOT NULL,
  `delivery_status` VARCHAR(45) NOT NULL,
  `total_cost` FLOAT NOT NULL,
   PRIMARY KEY (`order_id`));

CREATE TABLE `wdmdb`.`cart` (
  `cart_id` INT NOT NULL AUTO_INCREMENT,
  `order_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  `quantity` INT NOT NULL,
  `cost` INT NOT NULL,
   PRIMARY KEY (`cart_id`));

CREATE TABLE `wdmdb`.`admin` (
  `admin_id` INT NOT NULL,
  `password` VARCHAR(45) NOT NULL,
   PRIMARY KEY (`admin_id`));
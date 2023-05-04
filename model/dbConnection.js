//"import" mysql module for node.js
const mysql = require('mysql2')

// creating a connection but not connecting (connect in the model files)
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'wdmdb'
})

module.exports = { connection }

var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    database: 'blogdb',
    user: 'root',
    password: 'Password123!'
})

module.exports = connection;
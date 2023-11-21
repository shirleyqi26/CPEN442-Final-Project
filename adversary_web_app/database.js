var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    database: 'adversary_database',
    user: 'root',
    password: 'Password123!'
})

module.exports = connection;
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    database: 'adversary_database',
    user: 'root',
    password: 'Pa$$w0rd'
})

module.exports = connection;
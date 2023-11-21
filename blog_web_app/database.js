var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    database: 'blogdb',
    user: 'root',
    password: 'change this :D'
})

module.exports = connection;
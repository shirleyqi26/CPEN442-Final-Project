var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    database: "blogdb",
    user: "root",
    password: "Password123!" // Change here for whoever is hosting
});

module.exports = connection;
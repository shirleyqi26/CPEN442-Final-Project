const express = require("express");
const app = express();
const port = 4000
var connection = require("./database")
const cors = require("cors");
var fs = require("fs");
var path = require("path");

app.use(cors({
    origin: "*"
}));
app.use(express.json());

app.get("/", (req, res) => {
    let sql = "SELECT info FROM STOLEN_INFO";
    connection.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        else {
            res.send(JSON.parse(JSON.stringify(result)));
        }
    });
});
  
app.post("/stolenInfo", (req, res) => {
    const info = req.body.stolen_info;
    if (!info) {
        return res.status(400).send("Bad Request: Missing 'info' in the request body");
    }
    let sql = "INSERT INTO stolen_info (info) VALUES (?)";
    connection.query(sql, info, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send("Data added successfully");
        }
    });
});

app.delete("/resetDB", (req, res) => {
    let sql = "DELETE FROM adversary_database.stolen_info WHERE id;";
    connection.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        else {
            res.send(JSON.parse(JSON.stringify(result)));
        }
    });
});

function reset_db() {
    let sql = "DELETE FROM adversary_database.stolen_info WHERE id;";
    connection.query(sql);
}

function create_db() {
    const generatedScript = fs.readFileSync(path.join(__dirname, "createAdversaryDB.sql")).toString().split("\n");
    console.log(generatedScript);
    for (let i = 0; i < generatedScript.length; i++) {
        connection.query(generatedScript[i]);
    }
}

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    connection.connect((err) => {
        if (err) {
            throw err;
        }
        else {
            console.log("Database connected");
            create_db();
            reset_db();
        }
    });
});
const express = require("express");
const app = express();
const port = 5000;
var connection = require("./database");
const cors = require("cors");
var fs = require('fs');
var path = require('path');

app.use(cors({
    origin: "*"
}));
app.use(express.json());

app.get("/getPosts", (req, res) => {
    let sql = "SELECT * FROM blogdb.posts";
    connection.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(JSON.parse(JSON.stringify(result)));
        }
    });
  });

  app.get("/getPostsFiltered", (req, res) => {
    let sql = "SELECT * FROM blogdb.posts WHERE username = ?";
    connection.query(sql, req.query["username"], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(JSON.parse(JSON.stringify(result)));
        }
    });
  });

  app.get("/getUser", (req, res) => {
    let sql = "SELECT * FROM blogdb.users WHERE username = '" + req.query["username"] + "' AND password = '" + req.query["password"] + "'";
    connection.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(JSON.parse(JSON.stringify(result)));
        }
    });
  });

  app.get("/getUserByUserName", (req, res) => {
    const values = [req.query["username"]];
    let sql = "SELECT * FROM blogdb.users WHERE username = ?";
    connection.query(sql, values, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(JSON.parse(JSON.stringify(result)));
        }
    });
  });

  app.post("/postUsers", (req, res) => {
    let sql = "INSERT INTO blogdb.users (username, name, birthday, email, secretinfo) VALUES (?)";
    const values = [req.body.username, req.body.name, req.body.birthday, req.body.email, req.body.secretinfo, req.body.password];
    connection.query(sql, values, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send("Data added successfully!");
        }
    });
});

  app.post('/postUsers', (req, res) => {
    let sql = 'INSERT INTO blogdb.users (username, name, birthday, email, secretinfo) VALUES (?)';
    const values = [req.body.username, req.body.name, req.body.birthday, req.body.email, req.body.secretinfo];
    connection.query(sql, values, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send("Data added successfully!");
        }
    });
});
  
  app.post("/postPosts", (req, res) => {
    let sql = "INSERT INTO blogdb.posts (subject, content, username) VALUES (?)";
    const values = [req.body.subject, req.body.content, req.body.username];
    connection.query(sql, [values], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send("Data added successfully!");
        }
    });
});

app.delete("/resetBlogDB", (req, res) => {
    const generatedScript = fs.readFileSync(path.join(__dirname, "initBlogDB.sql")).toString().split("\n");
    for (let i = 0; i < generatedScript.length; i++) {
        connection.query(generatedScript[i]);
    }
});

function reset_db() {
    const generatedScript = fs.readFileSync(path.join(__dirname, "initBlogDB.sql")).toString().split("\n");
    console.log(generatedScript);
    for (let i = 0; i < generatedScript.length; i++) {
        connection.query(generatedScript[i]);
    }
}

function create_db() {
    const generatedScript = fs.readFileSync(path.join(__dirname, "createBlogDB.sql")).toString().split("\n");
    console.log(generatedScript);
    for (let i = 0; i < generatedScript.length; i++) {
        connection.query(generatedScript[i]);
    }
}

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
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
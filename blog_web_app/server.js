const express = require("express");
const app = express();
const port = 3000;
var connection = require("./database");
const cors = require("cors");

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

app.delete('/resetDB', (req, res) => {

    let sql = 'DELETE FROM blogdb.posts WHERE postid; DELETE FROM adversary_database.stolen_info WHERE id;DELETE FROM blogdb.posts WHERE postid;' +
    'INSERT INTO blogdb.posts(subject, content, username) VALUES ("how does code work?", "hello", "smithbeast2");' + 
    'INSERT INTO blogdb.posts(subject, content, username) VALUES ("this is my post", "stuff stuff stuff", "secretman123");' +
    'INSERT INTO blogdb.posts(subject, content, username) VALUES ("crypto", "crypto", "cryptolover5");' +
    'DELETE FROM blogdb.users WHERE userid;' +
    'INSERT INTO blogdb.users(username, name, birthday, email, secretinfo, password) VALUES ("christophersmith", "Christopher Smith", "2000-01-01", "christophersmith@gmail.com", "Chris Smith", "csmith");' +
    'INSERT INTO blogdb.users(username, name, birthday, email, secretinfo, password) VALUES ("boatman", "Boat Man", "2000-02-03", "boatman@gmail.com", "boatman", "boatman1");'
    connection.query(sql, (err, result) => {
        if (err) {
            throw err
        }
        else {
            res.send(JSON.parse(JSON.stringify(result)))
        }
    })  
});

function reset_db() {
    let sql = 'DELETE FROM blogdb.posts WHERE postid; DELETE FROM adversary_database.stolen_info WHERE id;DELETE FROM blogdb.posts WHERE postid;' +
    'INSERT INTO blogdb.posts(subject, content, username) VALUES ("how does code work?", "hello", "smithbeast2");' + 
    'INSERT INTO blogdb.posts(subject, content, username) VALUES ("this is my post", "stuff stuff stuff", "secretman123");' +
    'INSERT INTO blogdb.posts(subject, content, username) VALUES ("crypto", "crypto", "cryptolover5");' +
    'DELETE FROM blogdb.users WHERE userid;' +
    'INSERT INTO blogdb.users(username, name, birthday, email, secretinfo, password) VALUES ("christophersmith", "Christopher Smith", "2000-01-01", "christophersmith@gmail.com", "Chris Smith", "csmith");' +
    'INSERT INTO blogdb.users(username, name, birthday, email, secretinfo, password) VALUES ("boatman", "Boat Man", "2000-02-03", "boatman@gmail.com", "boatman", "boatman1");'

    connection.query(sql, (err, result) => {
        if (err) {
            throw err
        }
        else {
            console.log(JSON.parse(JSON.stringify(result)))
        }
    })  
}
create_db()

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
    connection.connect((err) => {
        if (err) {
            throw err;
        }
        else {
            console.log("Database connected");
        }
    });
  });
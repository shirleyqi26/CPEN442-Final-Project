const express = require('express');
const app = express();
const port = 3000
var connection = require('./database')
const cors = require('cors');

app.use(cors({
    origin: '*'
}));
app.use(express.json());

app.get('/getPosts', (req, res) => {
    console.log("getPosts")
    let sql = 'SELECT * FROM blogdb.posts'
    connection.query(sql, (err, result) => {
        if (err) {
            throw err
        }
        else {
            console.log("posts:")
            console.log(JSON.parse(JSON.stringify(result)))
            res.send(JSON.parse(JSON.stringify(result)))
        }
    })
  })
  
  app.post('/postPosts', (req, res) => {
    console.log("postposts")
    console.log(req.body)
    if (!req.body.title || !req.body.content || !req.body.username) {
        return res.status(400).send('Bad Request: poorly formed payload');
    }

    let sql = 'INSERT INTO blogdb.posts (title, content, username) VALUES (?)';
    const values = [req.body.title, req.body.content, req.body.username];
    connection.query(sql, values, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send('Data added successfully');
        }
    });
});

app.post('/postUsers', (req, res) => {
    console.log("postusers")
    console.log(req.body)
    const info = req.body.stolen_info;

    if (!req.body) {
        return res.status(400).send('Bad Request: Missing "info" in the request body');
    }

    let sql = 'INSERT INTO blogdb.users (username, name, birthday, email, secretinfo) VALUES (?)';
    const values = [req.body.username, req.body.name, req.body.birthday, req.body.email, req.body.secretinfo];
    connection.query(sql, info, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send('Data added successfully');
        }
    });
});

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    connection.connect((err) => {
        if (err) {
            throw err
        }
        else {
            console.log('Database connected')
        }
    })
  })

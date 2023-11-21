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
            // console.log("posts:")
            // console.log(JSON.parse(JSON.stringify(result)))
            res.send(JSON.parse(JSON.stringify(result)))
        }
    })
  })

  app.get('/getPostsFiltered', (req, res) => {
    console.log("getPostsFiltered")
    console.log(req.query)
    let sql = 'SELECT * FROM blogdb.posts WHERE username = ?'
    connection.query(sql, req.query["username"], (err, result) => {
        if (err) {
            throw err
        }
        else {
            // console.log("posts:")
            // console.log(JSON.parse(JSON.stringify(result)))
            res.send(JSON.parse(JSON.stringify(result)))
        }
    })
  })

  app.get('/getUser', (req, res) => {
    console.log("getUsers")
    console.log(req.query)
    const values = [req.query["username"], req.query["password"]]
    let sql = 'SELECT * FROM blogdb.users WHERE username = ? AND password = ?'
    connection.query(sql, values, (err, result) => {
        if (err) {
            throw err
        }
        else {
            console.log("users:")
            console.log(JSON.parse(JSON.stringify(result)))
            res.send(JSON.parse(JSON.stringify(result)))
        }
    })
  })

  app.get('/getUserByUserName', (req, res) => {
    console.log("getUserByUserName")
    console.log(req.query)
    const values = [req.query["username"]]
    let sql = 'SELECT * FROM blogdb.users WHERE username = ?'
    connection.query(sql, values, (err, result) => {
        if (err) {
            throw err
        }
        else {
            console.log(JSON.parse(JSON.stringify(result)))
            res.send(JSON.parse(JSON.stringify(result)))
        }
    })
  })

  app.post('/postUsers', (req, res) => {
    console.log("postusers")
    console.log(req.body)

    if (!req.body) {
        return res.status(400).send('Bad Request: Missing "info" in the request body');
    }

    let sql = 'INSERT INTO blogdb.users (username, name, birthday, email, secretinfo) VALUES (?)';
    const values = [req.body.username, req.body.name, req.body.birthday, req.body.email, req.body.secretinfo, req.body.password];
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
  
  app.post('/postPosts', (req, res) => {
    console.log("postposts")
    console.log(req.body)
    if (!req.body.subject || !req.body.content || !req.body.username) {
        return res.status(400).send('Bad Request: poorly formed payload');
    }
    console.log(typeof(req.body.subject))
    let sql = 'INSERT INTO blogdb.posts (subject, content, username) VALUES (?)';
    const values = [req.body.subject, req.body.content, req.body.username];
    connection.query(sql, [values], (err, result) => {
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

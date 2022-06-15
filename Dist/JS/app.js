const express = require('express');
const { status } = require('express/lib/response');
const mysql = require('mysql');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Password786#",
    database: "acmedb1",
    connectionLimit: 10
});

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

//Getting all the quotes to the table
app.get('/quotes', (req, res) => {
    pool.query(`select * from quotes order by status`, (err, result) => {
        if (err) {
            res.json({ "success": false, data: err });
        } else {
            res.send(result);
        }
    });
});

//Getting 1 qoute through the ID
app.get('/quotes/:id', (req, res) => {
    pool.query(`select * from quotes where quoteId = ?`, [req.params.id], (err, result) => {
        if (err) {
            res.json({ "success": false, data: err });
        } else {
            res.send(result);
        }
    });
});

//Insert data in database
app.post('/quotes', (req, res) => {
    console.log(req.body);
    pool.query('INSERT INTO quotes SET ?', req.body, (err, result) => {
        if (err) {
            res.json({ "success": false, data: err });
        } else {
            res.send(result);
        }
    });
});

//Update data in database
app.put('/quotes/:id', (req, res) => {
    let body = req.body;
    const data = [body.quoteName, body.status, body.createdBy, req.params.id]
    pool.query('UPDATE quotes SET quoteName = ?, status = ?, createdBy = ? WHERE quoteId = ?', data, (err, result) => {
        if (err) {
            res.json({ "success": false, data: err });
        } else {
            res.send({ "Success": 200 });
        }
    });
});

//PORT
const port = process.env.PORT || 3001;
app.listen(port, function () {
    console.log(`Server has started on ${port}`);
});

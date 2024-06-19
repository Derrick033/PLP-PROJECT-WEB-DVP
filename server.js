const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: 'Spice@033Dkw', 
    database: 'zenquest'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(express.static('public'));


app.post('/register', (req, res) => {
    const { first_name, surname, age, email, subscription_plan } = req.body;
    const query = `INSERT INTO subscribers (first_name, surname, age, email, subscription_plan) VALUES (?, ?, ?, ?, ?)`;

    db.query(query, [first_name, surname, age, email, subscription_plan], (err, result) => {
        if (err) throw err;
        res.send('Registration successful');
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

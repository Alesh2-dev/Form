 require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    port: process.env.DB_PORT || '3307',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'student',
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        process.exit(1);
    }
    console.log('Connected to MySQL Successfully!');
});

app.post('/sign_up', (req, res) => {
    const { name, age, email, phone, course, gender, psw } = req.body;

    if (!name || !email || !phone || !psw) {
        return res.status(400).send('Missing required fields.');
    }

    const sql = "INSERT INTO users (name, age, email, phone, course, gender, psw) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const values = [name, age, email, phone, course, gender, psw];

    connection.query(sql, values, (err) => {
        if (err) {
            console.error('Error inserting record:', err);
            return res.status(500).send('Database error');
        }
        console.log('Record Inserted Successfully');
        res.status(200).send('Record inserted successfully');
    });
});

app.get('/', (req, res) => {
    res.redirect('/index.html');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

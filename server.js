const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000; 


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345678987654321',
  database: 'upsc'
});


db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    process.exit(1); 
  }
  console.log('Connected to MySQL database.');
});


app.use(cors());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 


app.get('/candidates', (req, res) => {
  db.query('SELECT * FROM candidates', (err, results) => {
    if (err) {
      console.error('Error fetching candidates:', err);
      return res.status(500).json({ error: 'Error fetching candidates' });
    }
    res.json(results); 
  });
});


app.get('/candidates/name/:name', (req, res) => {
  const candidateName = req.params.name;
  const sql = 'SELECT * FROM candidates WHERE name = ?';
  db.query(sql, [candidateName], (err, results) => {
    if (err) {
      console.error('Error fetching candidate by name:', err);
      return res.status(500).json({ error: 'Error fetching candidate' });
    }

    if (results.length === 0) {
      console.log('No candidate found with that name.');
      return res.status(404).json({ error: 'Candidate not found' });
    }

    res.json(results[0]);
  });
});




app.post('/candidates', (req, res) => {
  const { name, category, marks, age, location } = req.body;

  console.log('Received request to add candidate:', { name, category, marks, age, location });

  if (!name || !category || !marks || !age || !location) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const sql = 'INSERT INTO candidates (name, category, marks, age, location) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [name, category, marks, age, location], (err, results) => {
    if (err) {
      console.error('Error inserting candidate:', err);
      return res.status(500).json({ error: 'Error inserting candidate' });
    }
    console.log('Candidate added with ID:', results.insertId);
    res.status(201).json({ id: results.insertId, ...req.body });
  });
});



app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

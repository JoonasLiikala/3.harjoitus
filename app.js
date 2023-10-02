const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'shoppinglist',
});

db.connect((err) => {
  if (err) {
    console.error('Tietokantaan ei saatu yhteyttä: ' + err.message);
  } else {
    console.log('Yhdistetty tietokantaan');
  }
});

app.get('/items', (req, res) => {
  db.query('SELECT * FROM item', (err, results) => {
    if (err) {
      console.error('Virhe tietokantakyselyssä: ' + err.message);
      res.status(500).json({ error: 'Tietokantavirhe' });
    } else {
      res.json({ items: results });
    }
  });
});

app.listen(port, () => {
  console.log(`Palvelin käynnissä portissa ${port}`);
});
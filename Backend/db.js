// server/db.js
const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',           // your MySQL username
  password: '',           // your MySQL password
  database: 'cms_db',      // your database name
});

connection.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err);
    throw err;
  }
  console.log('✅ MySQL Connected');
});

module.exports = connection;

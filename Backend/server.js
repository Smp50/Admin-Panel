// server/index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors({
  origin: ['http://localhost:3000', ''],
  credentials: true
}));

const menuRoutes = require('./Routes/menuRoutes');
app.use('/api/menus', menuRoutes);

const moduleRoutes = require('./Routes/moduleRoutes');
app.use('/api', moduleRoutes);
app.use('/uploads', express.static('uploads'));
// Ensure uploads folder exists
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}



// Routes
const pageRoutes = require('./Routes/pageRoutes');
app.use('/api/pages', pageRoutes);

// Root check
app.get('/', (req, res) => {
  res.send('CMS API is running');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

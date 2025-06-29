const multer = require('multer');
const path = require('path');

// Adjust this path to your uploads folder location (relative or absolute)
const uploadPath = path.join(__dirname, '..', 'uploads');  // one level up from backend folder

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

module.exports = upload;

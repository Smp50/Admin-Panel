const express = require('express');
const router = express.Router();
const db = require('../db');
const upload = require('../upload'); // Make sure this exists and is correct
const fs = require('fs');

// ✅ GET modules by page slug
router.get('/modules/:slug', (req, res) => {
  const { slug } = req.params;

  db.query('SELECT * FROM modules WHERE page_slug = ?', [slug], (err, results) => {
    if (err) {
      console.error('❌ Error fetching modules:', err);
      return res.status(500).json({ error: 'Database fetch error' });
    }
    res.json(results);
  });
});

// ✅ POST module data with optional file upload
router.post('/modules', upload.single('image'), (req, res) => {
  console.log('📥 Incoming form data:', req.body);
  console.log('🖼️ Uploaded file:', req.file);

  const { page_slug, type } = req.body;

  if (!page_slug || !type) {
    return res.status(400).json({ error: 'Missing page_slug or type' });
  }

  let content = {};

  try {
    // 🌟 PRODUCT MODULE
    if (type === 'product') {
      const { title, price, description, short_description } = req.body;
      const image = req.file ? `/uploads/${req.file.filename}` : '';

      if (!title || !price) {
        return res.status(400).json({ error: 'Missing required fields for product' });
      }

      content = {
        title,
        price,
        description,
        short_description,
        image,
      };
    }

    // 🌟 SERVICE MODULE
    else if (type === 'service') {
      const { title, description, icon } = req.body;

      if (!title || !description || !icon) {
        return res.status(400).json({ error: 'Missing required fields for service' });
      }

      content = {
        title,
        description,
        icon,
      };
    }

    // 🌟 GALLERY MODULE
    else if (type === 'gallery') {
      const image = req.file ? `/uploads/${req.file.filename}` : '';
      if (!image) {
        return res.status(400).json({ error: 'Gallery image is required' });
      }

      content = { image };
    }

    // ❌ UNKNOWN TYPE
    else {
      return res.status(400).json({ error: 'Unknown module type' });
    }

    // ✅ INSERT TO DATABASE
    db.query(
      'INSERT INTO modules (page_slug, type, content) VALUES (?, ?, ?)',
      [page_slug, type, JSON.stringify(content)],
      (err, result) => {
        if (err) {
          console.error('❌ Database insert error:', err);
          return res.status(500).json({ error: 'Database insert error' });
        }

        console.log('✅ Module inserted with ID:', result.insertId);
        res.json({ success: true, insertId: result.insertId });
      }
    );
  } catch (e) {
    console.error('❌ Server error:', e);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

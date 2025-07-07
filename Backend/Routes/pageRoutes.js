const express = require('express');
const router = express.Router();
const Page = require('../models/page');

// Get all pages
router.get('/', (req, res) => {
  Page.getAll((err, results) => {
    if (err) return res.status(500).json({ message: 'Error' });
    res.json(results);
  });
});

// Get page by ID (for editing)
router.get('/edit/:id', (req, res) => {
  Page.getById(req.params.id, (err, results) => {
    if (results.length) {
      const page = results[0];

      // Make sure these are strings (not null)
      res.json({
        id: page.id,
        title: page.title || '',
        slug: page.slug || '',
        editorData: page.editorData || ''
      });
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  });
});

// Delete page
router.delete('/:id', (req, res) => {
  Page.delete(req.params.id, (err) => {
    if (err) return res.status(500).json({ message: 'Delete error' });
    res.json({ message: 'Deleted' });
  });
});


// Update page
router.put('/:id', (req, res) => {
  Page.update(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json({ message: 'Update error' });
    res.json({ message: 'Updated' });
  });
});


router.get('/', (req, res) => {
  Page.getAll((err, results) => res.json(results));
});

router.get('/:slug', (req, res) => {
  Page.getBySlug(req.params.slug, (err, results) => {
    if (results.length) res.json(results[0]);
    else res.status(404).json({ message: 'Not found' });
  });
});

router.post('/', (req, res) => {
  Page.create(req.body, (err, results) => res.json({ message: 'Created', id: results.insertId }));
});

// router.put('/:id', (req, res) => {
//   Page.update(req.params.id, req.body, (err) => res.json({ message: 'Updated' }));
// });

// router.delete('/:id', (req, res) => {
//   Page.delete(req.params.id, (err) => res.json({ message: 'Deleted' }));
// });

module.exports = router;

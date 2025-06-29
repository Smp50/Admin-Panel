const express = require('express');
const router = express.Router();
const Page = require('../models/page');

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

router.put('/:id', (req, res) => {
  Page.update(req.params.id, req.body, (err) => res.json({ message: 'Updated' }));
});

router.delete('/:id', (req, res) => {
  Page.delete(req.params.id, (err) => res.json({ message: 'Deleted' }));
});

module.exports = router;

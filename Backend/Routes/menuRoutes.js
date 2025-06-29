const express = require('express');
const router = express.Router();
const Menu = require('../models/menu');

// Get all menus
router.get('/', (req, res) => {
  Menu.getAll((err, results) => res.json(results));
});

// Get menus by position (header or footer)
router.get('/:position', (req, res) => {
  Menu.getByPosition(req.params.position, (err, results) => res.json(results));
});

// Create menu
router.post('/', (req, res) => {
  Menu.create(req.body, (err, result) => res.json({ message: 'Created', id: result.insertId }));
});

// Update menu
router.put('/:id', (req, res) => {
  Menu.update(req.params.id, req.body, (err) => res.json({ message: 'Updated' }));
});

// Delete menu
router.delete('/:id', (req, res) => {
  Menu.delete(req.params.id, (err) => res.json({ message: 'Deleted' }));
});

module.exports = router;

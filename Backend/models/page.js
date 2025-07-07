const db = require('../db');

// Get all pages
exports.getAll = (cb) => {
  db.query('SELECT * FROM pages', cb);
};

// Get page by slug
exports.getBySlug = (slug, cb) => {
  db.query('SELECT * FROM pages WHERE slug = ?', [slug], cb);
};

// Get page by ID
exports.getById = (id, cb) => {
  db.query('SELECT * FROM pages WHERE id = ?', [id], cb);
};

// Create a new page
exports.create = (data, cb) => {
  db.query('INSERT INTO pages SET ?', data, cb);
};

// Update a page
exports.update = (id, data, cb) => {
  db.query('UPDATE pages SET ? WHERE id = ?', [data, id], cb);
};

// Delete a page
exports.delete = (id, cb) => {
  db.query('DELETE FROM pages WHERE id = ?', [id], cb);
};

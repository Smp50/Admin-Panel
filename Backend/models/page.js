const db = require('../db');

const Page = {
  getAll: cb => db.query('SELECT * FROM pages', cb),
  getBySlug: (slug, cb) => db.query('SELECT * FROM pages WHERE slug = ?', [slug], cb),
  create: (data, cb) => db.query('INSERT INTO pages SET ?', [data], cb),
  update: (id, data, cb) => db.query('UPDATE pages SET ? WHERE id = ?', [data, id], cb),
  delete: (id, cb) => db.query('DELETE FROM pages WHERE id = ?', [id], cb)
};

module.exports = Page;

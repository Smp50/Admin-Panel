const db = require('../db');

const Menu = {
  getAll: (cb) => db.query('SELECT * FROM menus', cb),
  getByPosition: (position, cb) => db.query('SELECT * FROM menus WHERE position = ?', [position], cb),
  create: (data, cb) => db.query('INSERT INTO menus SET ?', [data], cb),
  update: (id, data, cb) => db.query('UPDATE menus SET ? WHERE id = ?', [data, id], cb),
  delete: (id, cb) => db.query('DELETE FROM menus WHERE id = ?', [id], cb)
};

module.exports = Menu;

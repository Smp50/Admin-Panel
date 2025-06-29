import { useEffect, useState } from 'react';
import axios from 'axios';

function MenuManager() {
  const [menus, setMenus] = useState([]);
  const [form, setForm] = useState({ position: 'header', label: '', slug: '', id: null });

  const fetchMenus = () => {
    axios.get('http://localhost:5000/api/menus')
      .then(res => setMenus(res.data));
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  const handleSubmit = () => {
    const { id, ...data } = form;
    const request = id
      ? axios.put(`http://localhost:5000/api/menus/${id}`, data)
      : axios.post('http://localhost:5000/api/menus', data);

    request.then(() => {
      fetchMenus();
      setForm({ position: 'header', label: '', slug: '', id: null });
    });
  };

  const handleEdit = (menu) => {
    setForm(menu);
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/menus/${id}`).then(fetchMenus);
  };

  return (
    <div className='page-wrapper'>
      <div className="content-wrapper">
        <h2>Manage Menus (Header/Footer)</h2>

        <select value={form.position} onChange={e => setForm({ ...form, position: e.target.value })}>
          <option value="header">Header</option>
          <option value="footer">Footer</option>
        </select>

        <input
          placeholder="Label"
          value={form.label}
          onChange={e => setForm({ ...form, label: e.target.value })}
        />
        <input
          placeholder="Slug"
          value={form.slug}
          onChange={e => setForm({ ...form, slug: e.target.value })}
        />

        <button onClick={handleSubmit}>{form.id ? 'Update' : 'Create'}</button>

        <ul>
          {menus.map(menu => (
            <li key={menu.id}>
              [{menu.position}] <strong>{menu.label}</strong> → /{menu.slug}
              <button onClick={() => handleEdit(menu)}>Edit</button>
              <button onClick={() => handleDelete(menu.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MenuManager;

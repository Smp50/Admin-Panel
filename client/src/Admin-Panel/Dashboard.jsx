import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, Outlet } from 'react-router-dom';

function AdminDashboard() {
  const [pages, setPages] = useState([]);
  const [form, setForm] = useState({ title: '', slug: '', content: '', id: null });

  const fetchPages = () => axios.get('http://localhost:5000/api/pages')
    .then(res => setPages(res.data));

  useEffect(() => {
    fetchPages();
  }, []);

  const handleSubmit = () => {
    if (form.id) {
      axios.put(`http://localhost:5000/api/pages/${form.id}`, form).then(fetchPages);
    } else {
      axios.post('http://localhost:5000/api/pages', form).then(fetchPages);
    }
    setForm({ title: '', slug: '', content: '', id: null });
  };

  const handleEdit = page => setForm(page);
  const handleDelete = id => {
    axios.delete(`http://localhost:5000/api/pages/${id}`).then(fetchPages);
  };

  return (
    <div className='page-wrapper'>
      <div className="content-wrapper">
        <h2>Admin Panel</h2>
        <input placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
        <input placeholder="Slug" value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} />
        <textarea placeholder="Content" value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} />
        <button onClick={handleSubmit}>{form.id ? 'Update' : 'Create'}</button>
        <Outlet />
      </div>
    </div>
  );
}
export default AdminDashboard;

import { useEffect, useState } from 'react';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Link } from 'react-router-dom';
import axios from 'axios';

function AdminPage() {
    const [pages, setPages] = useState([]);
    const [form, setForm] = useState({ title: '', slug: '', editorData: '', id: null });

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
        setForm({ title: '', slug: '', editorData: '', id: null });
    };


    const handleEdit = page => setForm(page);
    const handleDelete = id => {
        axios.delete(`http://localhost:5000/api/pages/${id}`).then(fetchPages);
    };

    return (
        <>
            <div className="page-wrapper">
                <div className="content-wrapper">
                    <div className="row">
                        <div className="col-xl-3">
                            <ul>
                                {pages.map(p => (
                                    <li key={p.id}>
                                        {p.title} - <button onClick={() => handleEdit(p)}>Edit</button> <button onClick={() => handleDelete(p.id)}>Delete</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="col-xl-9">
                            <div className="page-data">
                                <div className="row gy-4">
                                    <div className="col-12">
                                        <h2>Admin Panel</h2>
                                    </div>
                                    <div className="col-12">
                                        <input className='form-control' placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
                                    </div>
                                    <div className="col-12">
                                        <input className='form-control' placeholder="Slug" value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} />
                                    </div>
                                    <div className="col-12">
                                        <CKEditor
                                            editor={ClassicEditor}
                                            data={form.editorData}
                                            onChange={(event, editor) => {
                                                const data = editor.getData();
                                                setForm({ ...form, editorData: data });
                                            }}
                                        />
                                    </div>
                                </div>
                                <button className='btn btn-primary mt-4' onClick={handleSubmit}>{form.id ? 'Update' : 'Create'}</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </>
    );
}
export default AdminPage;

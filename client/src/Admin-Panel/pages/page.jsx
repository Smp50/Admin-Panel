import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from 'axios';

function AdminPage() {
    const [form, setForm] = useState({ id: null, title: '', slug: '', editorData: '' });
    const [pagelist, setPagelist] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();
    const [sluggenrate, setsluggenrate] = useState(false);

    // Fetch all pages
    const fetchPages = () => {
        axios.get('http://localhost:5000/api/pages')
            .then(res => setPagelist(res.data))
            .catch(() => setPagelist([]));
    };

    // Submit form (Create or Update)
    const handleSubmit = () => {
        if (form.id) {
            axios.put(`http://localhost:5000/api/pages/${form.id}`, form)
                .then(() => {
                    fetchPages();
                    navigate('/admin-panel/cms-page'); // optional: go back to create page
                });
        } else {
            axios.post('http://localhost:5000/api/pages', form)
                .then(() => {
                    fetchPages();
                    setForm({ id: null, title: '', slug: '', editorData: '' });
                });
        }
    };

    const handleTitleChange = (e) => {
        const title = e.target.value;

        // Generate slug only if user hasn't touched slug manually
        let newSlug = form.slug;
        if (!sluggenrate) {
            newSlug = title
                .toLowerCase()
                .trim()
                .replace(/[^\w\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/--+/g, '-');
        }
        setForm(prev => ({
            ...prev,
            title: title,
            slug: newSlug
        }));
    };


    const handleSlug = () => {
        setsluggenrate(true)
    }

    // Load data on route param change
    useEffect(() => {
        fetchPages();

        if (id) {
            axios.get(`http://localhost:5000/api/pages/edit/${id}`)
                .then(res => {
                    const data = res.data;
                    console.log("✅ Data loaded", data);
                    setForm({
                        id: data.id,
                        title: data.title || '',
                        slug: data.slug || '',
                        editorData: data.editorData || ''
                    });
                });
        } else {
            setForm({ id: null, title: '', slug: '', editorData: '' });
        }
    }, [id]);

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this page?")) {
            axios.delete(`http://localhost:5000/api/pages/${form.id}`)
            .then(() => {
                alert('Page deleted!');
                fetchPages();
                setForm({ id: null, title: '', slug: '', editorData: '' });
                navigate('/admin-panel/cms-page');
            });
        }
    };

    return (
        <div className="page-wrapper">
            <div className="content-wrapper">
                <div className="row">
                    {/* Left - List */}
                    <div className="col-xl-3 border-end">
                        <h5>All Pages</h5>
                        <ul className="list-group">
                            {pagelist.map(page => (
                                <li key={page.id} className="list-group-item d-flex justify-content-between align-items-center">
                                    <span>{page.title}</span>
                                    <button className="btn btn-sm btn-link" onClick={() => navigate(`/admin-panel/cms-page/edit/${page.id}`)}>Edit</button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right - Form */}
                    <div className="col-xl-9">
                        <div className="page-data">
                            <div className="row gy-4">
                                <div className="col-12 d-flex align-items-center">
                                    <h2>{id ? 'Edit Page' : 'Create Page'}</h2>
                                    <button className="btn btn-secondary ms-auto" onClick={() => navigate(id ? '/admin-panel/cms-page' : '/admin-panel')}>Back</button>
                                </div>

                                <div className="col-12">
                                    <input
                                        className="form-control"
                                        placeholder="Title"
                                        value={form.title}
                                        onChange={handleTitleChange}
                                    />
                                </div>

                                <div className="col-12">
                                    <input
                                        className="form-control"
                                        placeholder="Slug"
                                        value={form.slug}
                                        onChange={handleSlug}
                                    />
                                </div>

                                <div className="col-12">
                                    {form.editorData !== null && (
                                        <CKEditor
                                            key={`editor-${form.id}`} // important to re-render editor
                                            editor={ClassicEditor}
                                            data={form.editorData}
                                            onChange={(event, editor) => {
                                                const data = editor.getData();
                                                setForm({ ...form, editorData: data });
                                            }}
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="btn-wrap d-flex align-items-center gap-3 mt-4">
                                <button className="btn btn-primary " onClick={handleSubmit}>
                                    {id ? 'Update Page' : 'Create Page'}
                                </button>
                                <button className={id ? 'btn btn-danger' : 'd-none'} onClick={handleDelete}>
                                    Delete
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminPage;
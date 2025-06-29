import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Module() {
    const [activeModule, setActiveModule] = useState(null); // 'product', 'service', 'gallery'
    const [formData, setFormData] = useState({});
    const [components, setComponents] = useState([]);

    const pageSlug = 'module-page'; // You can pass this via props if needed

    const fetchComponents = () => {
        if (!activeModule) return;
        axios.get(`http://localhost:5000/api/modules/${pageSlug}`)
            .then(res => {
                const filtered = res.data.filter(item => item.type === activeModule);
                setComponents(filtered);
            });
    };

    useEffect(() => {
        fetchComponents();
    }, [activeModule]);

    const handleSubmit = () => {
        if (!activeModule) return;

        const form = new FormData();
        form.append('page_slug', pageSlug);
        form.append('type', activeModule);

        if (activeModule === 'product') {
            form.append('title', formData.title || '');
            form.append('price', formData.price || '');
            form.append('description', formData.description || '');
            form.append('short_description', formData.short_description || '');
            if (formData.image instanceof File) {
                form.append('image', formData.image);
            }

        } else if (activeModule === 'service') {
            form.append('title', formData.title || '');
            form.append('description', formData.description || '');
            form.append('icon', formData.icon || '');
        } else if (activeModule === 'gallery') {
            if (formData.image instanceof File) {
                form.append('image', formData.image);
            }
    }

    axios.post('http://localhost:5000/api/modules', form, {
        headers: { 'Content-Type': 'multipart/form-data' }
    })
    .then(() => {
        setFormData({});
        fetchComponents();
    });
};


    const renderInputs = () => {
        if (activeModule === 'product') {
            return (
                <>
                    <div className="container-fluid">
                        <form action="">
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-group">
                                        <input className='form-control' placeholder="Product Name" onChange={e => setFormData({ ...formData, title: e.target.value })} />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group">
                                        <input className='form-control' type='file' placeholder='Upload image' onChange={e => setFormData({ ...formData, image: e.target.files[0] })} />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group">
                                        <input className='form-control' placeholder="Short Description" onChange={e => setFormData({ ...formData, short_description: e.target.value })} />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group">
                                        <input className='form-control' placeholder="Description" onChange={e => setFormData({ ...formData, description: e.target.value })} />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group">
                                        <input className='form-control' placeholder="Price" onChange={e => setFormData({ ...formData, price: e.target.value })} />
                                    </div>
                                </div>
                                {/* <div className="col-12">
                                    <div className="form-group">
                                        <div className="button-wrapper">
                                            <Link className='btn btn-secondary' onChange={e => setFormData({ ...formData, viewdetail: e.target.value })}></Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group">
                                        <div className="button-wrapper">
                                            <Link className='btn btn-secondary' onChange={e => setFormData({ ...formData, viewdetail: e.target.value })}></Link>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </form>
                    </div>




                </>
            );
        }
        if (activeModule === 'service') {
            return (
                <>
                    <input placeholder="Service Icon" onChange={e => setFormData({ ...formData, icon: e.target.value })} />
                    <input placeholder="Title" onChange={e => setFormData({ ...formData, title: e.target.value })} />
                    <input placeholder="Description" onChange={e => setFormData({ ...formData, description: e.target.value })} />
                </>
            );
        }
        if (activeModule === 'gallery') {
            return (
                <>
                    <input placeholder="Image URL" onChange={e => {
                        const images = formData.images || [];
                        setFormData({ ...formData, images: [...images, e.target.value] });
                    }} />
                </>
            );
        }
        return <p>Select a module</p>;
    };

    return (
        <div className="page-wrapper">
            <div className="content-wrapper">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-3">
                            <ul>
                                <li><button className='btn' onClick={() => setActiveModule('product')}>Product</button></li>
                                <li><button className='btn' onClick={() => setActiveModule('service')}>Service</button></li>
                                <li><button className='btn' onClick={() => setActiveModule('gallery')}>Gallery</button></li>
                            </ul>
                        </div>
                        <div className="col-xl-9">
                            <h3>Manage {activeModule} Content</h3>
                            {renderInputs()}
                            {activeModule && <button className='btn btn-primary' onClick={handleSubmit}>Add {activeModule}</button>}

                            <hr />
                            {/* <ul>
                                {components.map(comp => (
                                    <li key={comp.id}>
                                        [{comp.type}] {JSON.stringify(JSON.parse(comp.content))}
                                    </li>
                                ))}
                            </ul> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Module;

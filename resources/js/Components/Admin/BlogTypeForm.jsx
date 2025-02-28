import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BlogTypeForm({ blogType, onClose, onUpdate }) {
    const [typeBlog, setTypeBlog] = useState('');

    useEffect(() => {
        if (blogType) {
            setTypeBlog(blogType.type_blog);
        } else {
            setTypeBlog('');
        }
    }, [blogType]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (blogType) {
                await axios.post(`/api/blog-types/${blogType.id}`, { type_blog: typeBlog });
                alert('Blog type berhasil diperbarui');
            } else {
                await axios.post('/api/blog-types', { type_blog: typeBlog });
                alert('Blog type berhasil ditambahkan');
            }
            setTypeBlog('');
            onUpdate();
            onClose();
        } catch (error) {
            console.error('Error:', error);
            alert(blogType ? 'Gagal memperbarui blog type.' : 'Gagal menambahkan blog type.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow">
            <h3 className="text-lg font-semibold mb-4">Add Blog Type</h3>
            <div className="mb-4">
                <label className="block mb-1">Type Blog</label>
                <input
                    type="text"
                    value={typeBlog}
                    onChange={(e) => setTypeBlog(e.target.value)}
                    className="border border-gray-400 rounded p-2 w-full"
                    required
                />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Submit
            </button>
        </form>
    );
}

export default BlogTypeForm;
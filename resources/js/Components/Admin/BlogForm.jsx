import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function BlogForm({ Blog, onClose, onUpdate }) {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: null,
    });

    useEffect(() => {
        if (Blog) {
            setFormData({
                title: Blog.title || '',
                description: Blog.description || '',
                image: null,
            });
        } else {
            setFormData({
                title: '',
                description: '',
                image: null,
            });
        }
    }, [Blog]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
      };

    const handleDescriptionChange = (value) => {
        setFormData({ ...formData, description: value });
    };

    const handleFileChange = (e) => {
        const { name } = e.target;
        setFormData({ ...formData, [name]: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title || !formData.description) {
            alert('Title and description are required.');
            return;
        }

        const dataToSend = new FormData();

        dataToSend.append('title', formData.title);
        dataToSend.append('description', formData.description);

        if (formData.image) {
            dataToSend.append('image', formData.image);
        } else {
            dataToSend.append('old_image', Blog.image);
        }

        try {
            const response = Blog
                ? await axios.post(`/blogs/${Blog.id}`, dataToSend, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'X-CSRF-TOKEN': csrfToken,
                    },
                })
                : await axios.post('/blogs', dataToSend, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'X-CSRF-TOKEN': csrfToken,
                    },
                });

            alert('Blog saved successfully');
            onUpdate();
            onClose();
        } catch (error) {
            console.error('Error saving Blog:', error);
            alert('Failed to save Blog. Please check the required fields.');
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="p-6 bg-gray-800 text-white rounded shadow-md mb-6"
        >
            <h3 className="text-xl font-semibold mb-4">
                {Blog ? 'Edit Blog' : 'Add New Blog'}
            </h3>

            {/* Title */}
            <div className="mb-4">
                <label className="block mb-1">Title</label>
                <input
                    type="text"
                    name='title'
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="border border-gray-700 rounded p-2 w-full bg-gray-900 text-white"
                    placeholder="Enter the title"
                />
            </div>

            {/* Description */}
            <div className="mb-4">
                <label className="block mb-1">Description</label>
                <ReactQuill
                    theme="snow"
                    value={formData.description}
                    onChange={handleDescriptionChange}
                    className="mt-2"
                />
            </div>

            {/* Image 1 */}
            <div className="mb-4">
                <label className="block mb-1">Image</label>
                {Blog && Blog.image && (
                    <div className="mb-2">
                        <img
                            src={`/storage/${Blog.image}`}
                            alt="Current Image"
                            className="w-20 h-20 object-cover rounded"
                        />
                        <p className="text-gray-400 text-sm">Current image</p>
                    </div>
                )}
                <input
                    type="file"
                    name="image"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="border border-gray-700 rounded p-2 w-full bg-gray-900 text-white"
                />
            </div>

            {/* Buttons */}
            <div className="flex space-x-4">
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                    {Blog ? 'Update' : 'Submit'}
                </button>
                <button
                    type="button"
                    onClick={onClose}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                >
                    Cancel
                </button>
            </div>
        </form>
    )
}

export default BlogForm
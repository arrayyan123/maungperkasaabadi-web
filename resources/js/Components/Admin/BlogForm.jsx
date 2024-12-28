import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function BlogForm({ Blog, onClose, onUpdate }) {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        images: [],
        delete_images: [],
    });

    useEffect(() => {
        if (Blog) {
            setFormData({
                title: Blog.title || '',
                description: Blog.description || '',
                images: [],
                delete_images: [],
            });
        } else {
            setFormData({
                title: '',
                description: '',
                images: [],
                delete_images: [],
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
        const files = Array.from(e.target.files);
        setFormData((prev) => ({
            ...prev,
            images: files,
        }));
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

        formData.images.forEach((image, index) => {
            dataToSend.append(`images[${index}]`, image);
        });

        if (formData.delete_images.length > 0) {
            formData.delete_images.forEach((id) => {
                dataToSend.append('delete_images[]', id);
            });
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

            alert('Blog berhasil disimpan');
            onUpdate();
            onClose();
        } catch (error) {
            console.error('Error saving Blog:', error);
            alert('Failed to save Blog. Please check the required fields.');
        }
    };


    const handleRemoveImage = (imageId) => {
        setFormData((prev) => ({
            ...prev,
            delete_images: [...prev.delete_images, imageId],
        }));
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

            {/* Image */}
            <div className="mb-4">
                <label className="block mb-1">Images (Multiple file)</label>
                <input
                    type="file"
                    name="images"
                    onChange={handleFileChange}
                    accept="image/*"
                    multiple
                    className="border border-gray-700 rounded p-2 w-full bg-gray-900 text-white"
                />
                {/* Tampilkan gambar yang sudah ada */}
                {Blog && Blog.images && Blog.images.map((image) => (
                    <div key={image.id} className="mb-2 flex items-center">
                        <img
                            src={`/storage/${image.path}`}
                            alt="Blog Image"
                            className="w-20 h-20 object-cover rounded mr-4"
                        />
                        <button
                            onClick={() => handleRemoveImage(image.id)}
                            className="text-red-500 hover:text-red-700"
                        >
                            Hapus
                        </button>
                    </div>
                ))}
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
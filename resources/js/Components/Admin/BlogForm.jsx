import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';

function BlogForm({ Blog, onClose, onUpdate }) {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    const [deleteImages, setDeleteImages] = useState([]);

    const { quill, quillRef } = useQuill();

    useEffect(() => {
        if (Blog) {
            setTitle(Blog.title || '');
            setDescription(Blog.description || '');
            setImages([]);
            setDeleteImages([]);
            setPreviewImages([]);

            if (quill) {
                quill.clipboard.dangerouslyPasteHTML(Blog.description || '');
            }
        } else {
            setTitle('');
            setDescription('');
            setImages([]);
            setDeleteImages([]);
            setPreviewImages([]);

            if (quill) {
                quill.clipboard.dangerouslyPasteHTML('');
            }
        }
    }, [Blog, quill]);

    const handleClearForm = () => {
        setTitle('');
        if (quill) {
            quill.clipboard.dangerouslyPasteHTML('');
        }
        setImages([]);
        setDeleteImages([]);
        setPreviewImages([]);
    }

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);
        const previewURLs = files.map((file) => URL.createObjectURL(file));
        setPreviewImages(previewURLs);
    };

    const handleRemoveImage = (imageId) => {
        setDeleteImages((prev) => [...prev, imageId]);
    };

    const handleRemovePreviewImage = (index) => {
        setPreviewImages((prev) => prev.filter((_, i) => i !== index));
        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const quillDescription = quill.root.innerHTML;

        if (!title || !quillDescription) {
            alert('Title and description are required.');
            return;
        }

        const dataToSend = new FormData();
        dataToSend.append('title', title);
        dataToSend.append('description', quillDescription);

        images.forEach((image, index) => {
            dataToSend.append(`images[${index}]`, image);
        });

        if (deleteImages.length > 0) {
            deleteImages.forEach((id) => {
                dataToSend.append('delete_images[]', id);
            });
        }

        try {
            const response = Blog
                ? await axios.post(`/api/blogs/${Blog.id}`, dataToSend, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'X-CSRF-TOKEN': csrfToken,
                    },
                })
                : await axios.post('/api/blogs', dataToSend, {
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

    return (
        <form
            onSubmit={handleSubmit}
            className="p-6 bg-white text-black rounded shadow-md mb-6"
        >
            <h3 className="text-xl font-semibold mb-4">
                {Blog ? 'Edit Blog' : 'Add New Blog'}
            </h3>

            {/* Title */}
            <div className="mb-4">
                <label className="block mb-1">Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="border border-gray-700 rounded p-2 w-full text-black"
                    placeholder="Enter the title"
                />
            </div>

            {/* Description */}
            <div className="mb-4">
                <label className="block mb-1">Description</label>
                <div ref={quillRef} className="mt-2 bg-white text-black rounded" style={{ minHeight: '150px' }} />
            </div>

            {/* Image */}
            <div className="mb-4">
                <label className="block mb-1">Images (Multiple file)</label>
                <input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    multiple
                    className="border border-gray-700 rounded p-2 w-full text-black"
                />
                {/* Display existing images */}
                <div className="flex flex-wrap mt-4 gap-4">
                    Current Images
                    {Blog && Blog.images && Blog.images.map((image) => (

                        <div key={image.id} className="relative">
                            <img
                                src={`/storage/${image.path}`}
                                alt="Blog Image"
                                className="w-20 h-20 object-cover rounded mr-4"
                            />
                            <button
                                onClick={() => handleRemoveImage(image.id)}
                                className="absolute top-0 right-0 bg-red-500 text-white w-5 h-5 flex items-center justify-center rounded-full text-xs"
                            >
                                x
                            </button>
                        </div>

                    ))}
                </div>
                {/* Preview selected images */}
                {previewImages.length > 0 && (
                    <div className="flex flex-wrap mt-4 gap-4">
                        New Images
                        {previewImages.map((src, index) => (
                            <div key={index} className="relative">
                                <img
                                    src={src}
                                    alt="Preview"
                                    className="w-20 h-20 object-cover rounded shadow"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemovePreviewImage(index)}
                                    className="absolute top-0 right-0 bg-red-500 text-white w-5 h-5 flex items-center justify-center rounded-full text-xs"
                                >
                                    x
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Buttons */}
            <div className="flex space-x-4">
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                    {Blog ? 'Update' : 'Submit'}
                </button>
                {!Blog && (
                    <button
                        type="button"
                        onClick={handleClearForm}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                    >
                        Clear form
                    </button>
                )}
                {Blog && (
                    <button
                        type="button"
                        onClick={onClose}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                    >
                        Cancel
                    </button>
                )}
            </div>
        </form>
    )
}

export default BlogForm
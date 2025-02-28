import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';

function BlogForm({ Blog, onClose, onUpdate }) {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [author, setAuthor] = useState('');
    const [images, setImages] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    const [deleteImages, setDeleteImages] = useState([]);
    const [blogTypes, setBlogTypes] = useState([]);
    const [blogTypeId, setBlogTypeId] = useState('');

    const { quill, quillRef } = useQuill();

    useEffect(() => {
        const fetchBlogTypes = async () => {
            try {
                const response = await axios.get('/api/blog-types');
                setBlogTypes(response.data);
            } catch (error) {
                console.error('Error fetching blog types:', error);
            }
        };

        fetchBlogTypes();
    }, []);

    useEffect(() => {
        if (Blog) {
            setTitle(Blog.title || '');
            setDescription(Blog.description || '');
            setAuthor(Blog.author || '');
            setBlogTypeId(Blog.blog_type_id || '');
            setImages([]);
            setDeleteImages([]);
            setPreviewImages([]);

            if (quill) {
                quill.clipboard.dangerouslyPasteHTML(Blog.description || '');
            }
        } else {
            setTitle('');
            setDescription('');
            setAuthor('');
            setBlogTypeId('');
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
        setBlogTypeId('');
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

    const handleMarkImageForDeletion = (imageId) => {
        if (!deleteImages.includes(imageId)) {
            setDeleteImages((prev) => [...prev, imageId]);
        }
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
        dataToSend.append('author', author);
        dataToSend.append('blog_type_id', blogTypeId);

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
            <div className="mb-4">
                <label className="block mb-1">Blog Type</label>
                <select
                    value={blogTypeId}
                    onChange={(e) => setBlogTypeId(e.target.value)}
                    className="border border-gray-400 rounded p-2 w-full"
                    required
                >
                    <option value="">Select Blog Type</option>
                    {blogTypes.map((type) => (
                        <option key={type.id} value={type.id}>
                            {type.type_blog}
                        </option>
                    ))}
                </select>
            </div>
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
            {/* Author */}
            <div className="mb-4">
                <label className="block mb-1">Author</label>
                <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                    className="border border-gray-700 rounded p-2 w-full text-black"
                    placeholder="Enter the Author"
                />
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
                    {Blog && Blog.images && Blog.images.map((image, idx) => (
                        <div key={image.id} className="relative">
                            <img
                                src={`/storage/${image.path}`}
                                alt="Blog Image"
                                className={`w-20 h-20 object-cover rounded ${deleteImages.includes(image.id) ? 'opacity-50' : ''
                                    }`}
                            />
                            {idx === 0 && (
                                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white font-bold text-sm">
                                    Thumbnail
                                </div>
                            )}
                            {deleteImages.includes(image.id) && (
                                <div className="absolute inset-0 bg-red-500 bg-opacity-50 flex items-center justify-center text-white font-bold text-sm">
                                    Marked for Deletion
                                </div>
                            )}
                            <button
                                onClick={() => handleMarkImageForDeletion(image.id)}
                                className="absolute top-0 right-0 bg-red-500 text-white w-5 h-5 flex items-center justify-center rounded-full text-xs"
                            >
                                {deleteImages.includes(image.id) ? 'Undo' : 'x'}
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
                                {index === 0 && (
                                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white font-bold text-sm">
                                        Thumbnail
                                    </div>
                                )}
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
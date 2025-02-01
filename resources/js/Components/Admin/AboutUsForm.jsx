import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AboutUsForm({ aboutUs, onClose, onUpdate }) {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image1: null,
        image2: null,
        image3: null,
    });

    // Set data awal jika sedang mengedit
    useEffect(() => {
        if (aboutUs) {
            setFormData({
                title: aboutUs.title || '',
                description: aboutUs.description || '',
                image1: null, // File baru diunggah jika ada
                image2: null,
                image3: null,
            });
        } else {
            setFormData({
                title: '',
                description: '',
                image1: null,
                image2: null,
                image3: null,
            });
        }
    }, [aboutUs]);

    // Handle perubahan input teks (title, description)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const { name } = e.target;
        setFormData({ ...formData, [name]: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Cek apakah title dan description terisi
        if (!formData.title || !formData.description) {
            alert('Title and description are required.');
            return;
        }
    
        const dataToSend = new FormData();
    
        // Kirim data title dan description
        dataToSend.append('title', formData.title);
        dataToSend.append('description', formData.description);
    
        if (formData.image1) {
            dataToSend.append('image1', formData.image1);
        } else {
            dataToSend.append('old_image1', aboutUs.image1);
        }
    
        if (formData.image2) {
            dataToSend.append('image2', formData.image2);
        } else {
            dataToSend.append('old_image2', aboutUs.image2);
        }
    
        if (formData.image3) {
            dataToSend.append('image3', formData.image3);
        } else {
            dataToSend.append('old_image3', aboutUs.image3);
        }
    
        try {
            const response = aboutUs
                ? await axios.post(`/api/aboutus/${aboutUs.id}`, dataToSend, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'X-CSRF-TOKEN': csrfToken,
                    },
                })
                : await axios.post('/api/aboutus', dataToSend, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'X-CSRF-TOKEN': csrfToken,
                    },
                });
    
            alert('About Us saved successfully');
            onUpdate();
            onClose();
        } catch (error) {
            console.error('Error saving About Us:', error);
            alert('Failed to save About Us. Please check the required fields.');
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="p-6 bg-gray-800 text-white rounded shadow-md mb-6"
        >
            <h3 className="text-xl font-semibold mb-4">
                {aboutUs ? 'Edit About Us' : 'Add New About Us'}
            </h3>

            {/* Title */}
            <div className="mb-4">
                <label className="block mb-1">Title</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="border border-gray-700 rounded p-2 w-full bg-gray-900 text-white"
                />
            </div>

            {/* Description */}
            <div className="mb-4">
                <label className="block mb-1">Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    className="border border-gray-700 rounded p-2 w-full bg-gray-900 text-white"
                ></textarea>
            </div>

            {/* Image 1 */}
            <div className="mb-4">
                <label className="block mb-1">Image 1</label>
                {aboutUs && aboutUs.image1 && (
                    <div className="mb-2">
                        <img
                            src={`/storage/${aboutUs.image1}`}
                            alt="Current Image 1"
                            className="w-20 h-20 object-cover rounded"
                        />
                        <p className="text-gray-400 text-sm">Current image</p>
                    </div>
                )}
                <input
                    type="file"
                    name="image1"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="border border-gray-700 rounded p-2 w-full bg-gray-900 text-white"
                />
            </div>

            {/* Image 2 */}
            <div className="mb-4">
                <label className="block mb-1">Image 2</label>
                {aboutUs && aboutUs.image2 && (
                    <div className="mb-2">
                        <img
                            src={`/storage/${aboutUs.image2}`}
                            alt="Current Image 2"
                            className="w-20 h-20 object-cover rounded"
                        />
                        <p className="text-gray-400 text-sm">Current image</p>
                    </div>
                )}
                <input
                    type="file"
                    name="image2"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="border border-gray-700 rounded p-2 w-full bg-gray-900 text-white"
                />
            </div>

            {/* Image 3 */}
            <div className="mb-4">
                <label className="block mb-1">Image 3</label>
                {aboutUs && aboutUs.image3 && (
                    <div className="mb-2">
                        <img
                            src={`/storage/${aboutUs.image3}`}
                            alt="Current Image 3"
                            className="w-20 h-20 object-cover rounded"
                        />
                        <p className="text-gray-400 text-sm">Current image</p>
                    </div>
                )}
                <input
                    type="file"
                    name="image3"
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
                    {aboutUs ? 'Update' : 'Submit'}
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
    );
}

export default AboutUsForm;
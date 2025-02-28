import React, { useEffect, useState } from 'react';
import axios from 'axios';

function OurServiceForm({ OurService, onClose, onUpdate }) {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    const [formData, setFormData] = useState({
        title: '',
        link_web: '',
        image: null,
    });

    useEffect(() => {
        if (OurService) {
            setFormData({
                title: OurService.title || '',
                link_web: OurService.link_web || '',
                image: null,
            });
        } else {
            setFormData({
                title: '',
                link_web: '',
                image: null,
            });
        }
    }, [OurService]);

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

        if (!formData.title || !formData.link_web) {
            alert('Title and link web are required.');
            return;
        }

        const dataToSend = new FormData();

        dataToSend.append('title', formData.title);
        dataToSend.append('link_web', formData.link_web);

        if (formData.image) {
            dataToSend.append('image', formData.image);
        } else {
            dataToSend.append('old_image', OurService.image);
        }

        try {
            const response = OurService
                ? await axios.post(`/api/services/${OurService.id}`, dataToSend, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'X-CSRF-TOKEN': csrfToken,
                    },
                })
                : await axios.post('/api/services', dataToSend, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'X-CSRF-TOKEN': csrfToken,
                    },
                });

            alert('OurService saved successfully');
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
            className="p-6 text-black rounded shadow-md mb-6"
        >
            <h3 className="text-xl font-semibold mb-4">
                {OurService ? 'Edit Our Service' : 'Add New Our Service'}
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
                    className="border border-gray-700 rounded p-2 w-full"
                />
            </div>

            {/* link web */}
            <div className="mb-4">
                <label className="block mb-1">Link Web</label>
                <input
                    type='text'
                    name="link_web"
                    value={formData.link_web}
                    onChange={handleChange}
                    required
                    className="border border-gray-700 rounded p-2 w-full"
                />
            </div>

            {/* Image 1 */}
            <div className="mb-4">
                <label className="block mb-1">Image</label>
                {OurService && OurService.image && (
                    <div className="mb-2">
                        <img
                            src={`/storage/${OurService.image}`}
                            alt="Current Image 1"
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
                    className="border border-gray-700 rounded p-2 w-full"
                />
            </div>

            {/* Buttons */}
            <div className="flex space-x-4">
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                    {OurService ? 'Update' : 'Submit'}
                </button>
                {OurService && (
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

export default OurServiceForm
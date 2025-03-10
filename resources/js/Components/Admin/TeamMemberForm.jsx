import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';

function TeamMemberForm({ Teams, onClose, onUpdate }) {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    const { quill, quillRef } = useQuill();

    const [formData, setFormData] = useState({
        name: '',
        position: '',
        description: '',
        image: null,
    });

    useEffect(() => {
        if (Teams) {
            setFormData({
                name: Teams.name || '',
                position: Teams.position || '',
                description: Teams.description || '',
                image: null,
            });
            if (quill) {
                quill.clipboard.dangerouslyPasteHTML(Teams.description || '');
            }

        } else {
            setFormData({
                name: '',
                position: '',
                description: '',
                image: null,
            });
            if (quill) {
                quill.clipboard.dangerouslyPasteHTML('');
            }
        }
    }, [Teams, quill]);

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

        const quillDescription = quill.root.innerHTML;

        if (!formData.name || !quillDescription) {
            alert('Name and description are required.');
            return;
        }

        const dataToSend = new FormData();
        dataToSend.append('name', formData.name);
        dataToSend.append('position', formData.position);
        dataToSend.append('description', quillDescription);

        if (formData.image) {
            dataToSend.append('image', formData.image);
        } else if (Teams?.image) {
            dataToSend.append('old_image', Teams.image);
        }

        try {
            const response = Teams
                ? await axios.post(`/api/teams/${Teams.id}`, dataToSend, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'X-CSRF-TOKEN': csrfToken,
                    },
                })
                : await axios.post('/api/teams', dataToSend, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'X-CSRF-TOKEN': csrfToken,
                    },
                });

            alert('Team Member saved successfully');
            onUpdate();
            onClose();
        } catch (error) {
            console.error('Error saving Team Member:', error);
            alert('Failed to save Team Member. Please check the required fields.');
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="p-6 text-black rounded shadow-md mb-6"
        >
            <h3 className="text-xl font-semibold mb-4">
                {Teams ? 'Edit Team Member' : 'Add New Team Member'}
            </h3>

            {/* Title */}
            <div className="mb-4">
                <label className="block mb-1">Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="border border-gray-700 rounded p-2 w-full"
                />
            </div>
            {/* position */}
            <div className="mb-4">
                <label className="block mb-1">Position</label>
                <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    required
                    className="border border-gray-700 rounded p-2 w-full"
                />
            </div>
            {/* Description */}
            <div className="mb-4">
                <label className="block mb-1">Description</label>
                <div ref={quillRef} className="border border-gray-700 rounded p-2 w-full text-black"></div>
            </div>

            {/* Image */}
            <div className="mb-4">
                <label className="block mb-1">Image</label>
                {Teams && Teams.image && (
                    <div className="mb-2">
                        <img
                            src={`/storage/${Teams.image}`}
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
                    className="border border-gray-700 rounded p-2 w-full"
                />
            </div>

            {/* Buttons */}
            <div className="flex space-x-4">
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                    {Teams ? 'Update' : 'Submit'}
                </button>
                {Teams && (
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

export default TeamMemberForm
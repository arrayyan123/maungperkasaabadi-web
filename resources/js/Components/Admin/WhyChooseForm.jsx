import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(fas, far, fab);

function convertIconName(iconName) {
    return `${iconName.charAt(0).toLowerCase()}${iconName.charAt(1).toLowerCase()}-${iconName.slice(2).replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()}`;
}

function WhyChooseForm({ content, onClose, onUpdate }) {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [iconCode, setIconCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const iconOptions = Object.keys(fas).map(key => ({
        name: convertIconName(key),
        value: convertIconName(key),
    }));

    const filteredIcons = iconOptions.filter(icon =>
        icon.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    useEffect(() => {
        if (content) {
            setTitle(content.title || '');
            setDescription(content.description || '');
            setIconCode(content.icon_code || '');
        } else {
            setTitle('');
            setDescription('');
            setIconCode('');
        }
    }, [content]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("icon_code", iconCode);

        try {
            if (content) {
                await axios.post(`/api/whycontents/${content.id}`, formData, {
                    headers: {
                        'Content-Type': 'aplication/json',
                        //'X-CSRF-TOKEN': csrfToken,
                    },
                });
            } else {
                await axios.post('/api/whycontents', formData, {
                    headers: {
                        'Content-Type': 'aplication/json',
                        //'X-CSRF-TOKEN': csrfToken,
                    },
                });
            }

            alert('Content saved successfully!');
            setTitle('');
            setDescription('');
            setIconCode('');
            onClose();
        } catch (err) {
            setError('Failed to save data. Please try again.');
            console.error('Error during form submission:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Why Choose Us - Form</h1>
            {error && <div className="text-red-500 mb-4">{error}</div>}

            <form onSubmit={handleSubmit} className="mb-6">
                <div className="mb-4">
                    <label className="block mb-2 font-medium" htmlFor="title">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border rounded w-full p-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-medium" htmlFor="description">
                        Description
                    </label>
                    <textarea
                        id="description"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="border rounded w-full p-2"
                        rows="4"
                        required
                    />
                </div>
                <div className="mb-4 relative">
                    <label className="block mb-2 font-medium" htmlFor="icon">
                        Select Icon
                    </label>
                    <div
                        className="border rounded w-full p-2 cursor-pointer"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        {iconCode ? <FontAwesomeIcon icon={`fa-solid ${iconCode}`} /> : "Select an Icon"}
                    </div>
                    {isDropdownOpen && (
                        <div className="absolute z-10 bg-white max-h-96 overflow-auto border rounded shadow-lg mt-1 w-full">
                            <input
                                type="text"
                                placeholder="Search icons..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="border-b p-2 w-full "
                            />
                            {filteredIcons.map(option => (
                                <div
                                    key={option.value}
                                    className="flex items-center p-2 hover:bg-gray-200 cursor-pointer"
                                    onClick={() => {
                                        setIconCode(option.value);
                                        setIsDropdownOpen(false);
                                    }}
                                >
                                    <span>{option.name}</span>
                                    <FontAwesomeIcon icon={`fa-solid ${option.name}`} className="ml-2" />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
                    disabled={loading}
                >
                    {loading ? 'Saving...' : 'Add Icon'}
                </button>
            </form>
        </div>
    );
}

export default WhyChooseForm;
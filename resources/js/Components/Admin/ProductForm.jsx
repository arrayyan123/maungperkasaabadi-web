import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ProductForm({ product, onClose, onUpdate }) {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        type: 'nonitproduct',
        image: null,
    });

    useEffect(() => {
        if (product) {
            setFormData({
                title: product.title,
                description: product.description || '',
                type: product.type,
                image: null,
            });
        } else {
            setFormData({
                title: '',
                description: '',
                type: 'nonitproduct',
                image: null,
            });
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const data = new FormData();
    
        // Append fields only if they are present in the formData state
        if (formData.title) data.append('title', formData.title);
        if (formData.description) data.append('description', formData.description);
        if (formData.type) data.append('type', formData.type);
        if (formData.image) {
            data.append('image', formData.image); 
        } else if (product && product.image) {
            data.append('image', product.image); 
        }
            
        for (let pair of data.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
        }
    
        try {
            const response = product
                ? await axios.post(`/products/${product.id}`, data, {
                    headers: { 
                        'Content-Type': 'multipart/form-data',
                        'X-CSRF-TOKEN': csrfToken,
                    },
                })
                : await axios.post('/products', data, {
                    headers: {         
                        'Content-Type': 'multipart/form-data',
                        'X-CSRF-TOKEN': csrfToken, 
                    },
                });
    
            console.log('Response:', response.data); 
            alert('Product saved successfully');
            onUpdate();
            onClose();
        } catch (error) {
            console.error('Error saving product:', error);
            if (error.response && error.response.data.errors) {
                console.error('Validation errors:', error.response.data.errors);
            }
            alert('Failed to save product. Please check the required fields.');
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="p-6 bg-gray-800 text-white rounded shadow-md mb-6"
        >
            <h3 className="text-xl font-semibold mb-4">
                {product ? 'Edit Product' : 'Add New Product'}
            </h3>
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
            <div className="mb-4">
                <label className="block mb-1">Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="border border-gray-700 rounded p-2 w-full bg-gray-900 text-white"
                ></textarea>
            </div>
            <div className="mb-4">
                <label className="block mb-1">Type</label>
                <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="border border-gray-700 rounded p-2 w-full bg-gray-900 text-white"
                >
                    <option value="nonitproduct">Non IT Product</option>
                    <option value="itproduct">IT Product</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block mb-1">Image</label>
                <input
                    type="file"
                    name="image"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="border border-gray-700 rounded p-2 w-full bg-gray-900 text-white"
                />
            </div>
            <div className="flex space-x-4">
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                    {product ? 'Update' : 'Submit'}
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

export default ProductForm;
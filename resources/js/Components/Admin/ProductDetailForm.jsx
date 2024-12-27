import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function ProductDetailForm({ productDetail, onClose, onUpdate }) {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    const [formData, setFormData] = useState({
        product_name: '',
        product_description: '',
        type_product: 'nonitproduct',
        image: null,
    });

    useEffect(() => {
        if (productDetail) {
            setFormData({
                product_name: productDetail.product_name,
                product_description: productDetail.product_description || '',
                type_product: productDetail.type_product,
                image: null,
            });
        } else {
            setFormData({
                product_name: '',
                product_description: '',
                type_product: 'nonitproduct',
                image: null,
            });
        }
    }, [productDetail]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDescriptionChange = (value) => {
        setFormData({ ...formData, product_description: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const data = new FormData();
    
        // if (formData.product_name) data.append('product_name', formData.product_name);
        // if (formData.product_description) data.append('product_description', formData.product_description);
        // if (formData.type_product) data.append('type_product', formData.type_product);

        data.append('product_name', formData.product_name);
        data.append('product_description', formData.product_description);
        data.append('type_product', formData.type_product);
        
        if (formData.image) {
            data.append('image', formData.image); 
        } else if (productDetail && productDetail.image) {
            data.append('old_image', productDetail.image); 
        }
    
        try {
            const response = productDetail
                ? await axios.post(`/product_details/${productDetail.id}`, data, {
                    headers: { 
                        'Content-Type': 'multipart/form-data',
                        'X-CSRF-TOKEN': csrfToken,
                    },
                })
                : await axios.post('/product_details', data, {
                    headers: {         
                        'Content-Type': 'multipart/form-data',
                        'X-CSRF-TOKEN': csrfToken, 
                    },
                });
    
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
                {productDetail ? 'Edit Product Detail' : 'Add New Product Detail'}
            </h3>
            <div className="mb-4">
                <label className="block mb-1">Product Name</label>
                <input
                    type="text"
                    name="product_name"
                    value={formData.product_name}
                    onChange={handleChange}
                    required
                    className="border border-gray-700 rounded p-2 w-full bg-gray-900 text-white"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1">Product Description</label>
                <ReactQuill
                    theme="snow"
                    value={formData.product_description}
                    onChange={handleDescriptionChange}
                    className="mt-2"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1">Type Product</label>
                <select
                    name="type_product"
                    value={formData.type_product}
                    onChange={handleChange}
                    className="border border-gray-700 rounded p-2 w-full bg-gray-900 text-white"
                >
                    <option value="nonitproduct">Non IT Product</option>
                    <option value="itproduct">IT Product</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block mb-1">Image</label>
                {productDetail && productDetail.image && (
                    <div className="mb-2">
                        <img
                            src={`/storage/${productDetail.image}`}
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
            <div className="flex space-x-4">
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                    {productDetail ? 'Update' : 'Submit'}
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

export default ProductDetailForm;
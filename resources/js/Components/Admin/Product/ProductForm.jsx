import React, { useState, useEffect } from 'react';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import axios from 'axios';

function ProductForm({ product, onClose, onUpdate }) {
    const [typeProduct, setTypeProduct] = useState('');
    const [descriptionProduct, setDescriptionProduct] = useState('');
    const [image, setImage] = useState(null)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentImage, setCurrentImage] = useState('');

    const { quill, quillRef } = useQuill();

    useEffect(() => {
        if (product) {
            setTypeProduct(product.type_product || '');
            setDescriptionProduct(product.description_product || '');
            setCurrentImage(product.image || '');
            setImage(null);

            if (quill) {
                quill.clipboard.dangerouslyPasteHTML(product.description_product || '');
            }
        } else {
            setTypeProduct('');
            setDescriptionProduct('');

            if (quill) {
                quill.clipboard.dangerouslyPasteHTML('');
            }
            setCurrentImage('');
            setImage(null);
        }
    }, [product, quill]);

    useEffect(() => {
        if (quill) {
            quill.on('text-change', () => {
                setDescriptionProduct(quill.root.innerHTML);
            });
        }
    }, [quill]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append('type_product', typeProduct);
        formData.append('description_product', descriptionProduct);

        if (image) {
            formData.append('image', image);
        } else if (currentImage) {
            formData.append('old_image', currentImage);
        }

        try {
            if (product) {
                //buat update produk
                await axios.post(`/api/products/${product.id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                    },
                });
            } else {
                // Buat produk baru
                await axios.post('/api/products', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                    },
                });
            }
            alert('Product saved successfully!');
            setTypeProduct('');
            setDescriptionProduct('');
            setImage(null);
            setCurrentImage('');
            if (quill) {
                quill.clipboard.dangerouslyPasteHTML('');
            }

            onClose();
            onUpdate();
        } catch (err) {
            console.error(err);
            setError('Failed to save product. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex flex-col item-center justify-center text-black w-full'>
            <h1 className='font-bold text-[23px] text-center'>
                {product ? 'Edit Product' : 'Add Product'}
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4 w-full">
                <div>
                    <label className="block">Type Product</label>
                    <input
                        type="text"
                        value={typeProduct}
                        onChange={(e) => setTypeProduct(e.target.value)}
                        className="w-full border text-black px-3 py-2"
                        required
                    />
                </div>
                <div>
                    <label className="block">Description</label>
                    <div className="border p-2">
                        <div ref={quillRef} style={{ minHeight: '150px' }} />
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Image</label>
                    {currentImage && (
                        <div className="mb-2">
                            <img
                                src={`/storage/${currentImage}`}
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
                {error && <p className="text-red-500">{error}</p>}
                <div className="flex md:flex-row flex-col gap-4">
                    <button type="submit" className="bg-blue-500 rounded-2xl text-white px-4 py-2">
                        {loading ? 'Saving...' : 'Save Product'}
                    </button>
                    {product && (
                        <button onClick={onClose} className="bg-blue-200 rounded-2xl text-black px-4 py-2">
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}

export default ProductForm;
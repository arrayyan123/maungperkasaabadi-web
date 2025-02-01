import React, { useState, useEffect } from 'react';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import axios from 'axios';

function ProductForm({ product, onClose, onUpdate }) {
    const [typeProduct, setTypeProduct] = useState('');
    const [descriptionProduct, setDescriptionProduct] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { quill, quillRef } = useQuill();

    useEffect(() => {
        if (product) {
            setTypeProduct(product.type_product);
            setDescriptionProduct(product.description_product);

            if (quill) {
                quill.clipboard.dangerouslyPasteHTML(product.description_product || '');
            }
        } else {
            setTypeProduct('');
            setDescriptionProduct('');

            if (quill) {
                quill.clipboard.dangerouslyPasteHTML('');
            }
        }
    }, [product, quill]);

    useEffect(() => {
        if (quill) {
            quill.on('text-change', () => {
                setDescriptionProduct(quill.root.innerHTML);
            });
        }
    }, [quill]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append('type_product', typeProduct);
        formData.append('description_product', descriptionProduct);

        try {
            if (product) {
                // Update produk jika ada produk yang dipilih
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
            if (quill) {
                quill.clipboard.dangerouslyPasteHTML('');
            }

            onClose();
            onUpdate();
        } catch (err) {
            setError('Failed to save product. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex flex-col item-center justify-center w-full'>
            {/*title nya harus berubah sesuai dengan yang kita pilih. jika sedang mengisi data baru, maka*/}
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
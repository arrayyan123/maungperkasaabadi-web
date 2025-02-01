import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';

function ProductDetailForm({ productDetail, onClose, onUpdate }) {
    const [productId, setProductId] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [images, setImages] = useState([]);
    const [deleteImages, setDeleteImages] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [localImages, setLocalImages] = useState([]);

    const { quill, quillRef } = useQuill();

    // Fetch daftar produk saat komponen dimuat
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/api/products');
                setProducts(response.data);
            } catch {
                setError('Failed to load products.');
            }
        };

        fetchProducts();

        // Jika ada detail produk yang dipilih, isi form dengan data tersebut
        if (productDetail) {
            setProductId(productDetail.product_id);
            setName(productDetail.product_detail_name);
            setDescription(productDetail.product_detail_description);
            setType(productDetail.product_detail_type);
            setImages([]);
            setDeleteImages([]); // Reset images jika ingin mengedit
            setLocalImages(productDetail.images);

            if (quill) {
                quill.clipboard.dangerouslyPasteHTML(productDetail.product_detail_description || '');
            }
        } else {
            // Reset form jika tidak ada detail produk yang dipilih
            setProductId('');
            setName('');
            setDescription('');
            setType('');
            setImages([]);
            setDeleteImages([]);
            setLocalImages([]);

            if (quill) {
                quill.clipboard.dangerouslyPasteHTML('');
            }
        }
    }, [productDetail, quill]);

    useEffect(() => {
        if (quill) {
            quill.on('text-change', () => {
                setDescription(quill.root.innerHTML);
            });
        }
    }, [quill]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append('product_id', productId);
        formData.append('product_detail_name', name);
        formData.append('product_detail_description', description);
        formData.append('product_detail_type', type);
        images.forEach((image) => formData.append('images[]', image));
        deleteImages.forEach((id) => formData.append('delete_images[]', id));

        console.log("Submitting form with data:");
        console.log({
            product_id: productId,
            name,
            description,
            type,
            images,
            deleteImages
        });

        try {
            let response;
            if (productDetail) {
                // Update detail produk jika ada detail yang dipilih
                await axios.post(`/api/product-details/${productDetail.id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                    },
                });
            } else {
                // Buat detail produk baru
                await axios.post('/api/product-details', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                    },
                });
            }

            alert('Product detail saved successfully!');

            setProductId('');
            setName('');
            setDescription('');
            setType('');
            setImages([]);
            setDeleteImages([]);
            setLocalImages([]);
            if (quill) {
                quill.clipboard.dangerouslyPasteHTML('');
            }

            onClose();
            onUpdate();
        } catch (err) {
            console.error("Error saving product detail:", err);
            setError('Failed to save product detail. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e) => {
        setImages([...e.target.files]);
    };

    const handleDeleteImage = (id) => {
        setDeleteImages((prev) => [...prev, id]); // Menambahkan ke daftar gambar yang akan dihapus
        setLocalImages((prev) => prev.filter((image) => image.id !== id)); // Menghapus gambar dari tampilan
    };

    const handleRemovePreviewImage = (index) => {
        setImages((prev) => prev.filter((_, i) => i !== index)); // Menghapus gambar dari preview
    };

    return (
        <div className='flex flex-col item-center justify-center w-full'>
            <h1 className='font-bold text-[23px] text-center'>
                {productDetail ? 'Edit Product Detail' : 'Add Product Detail'}
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4 w-full">
                <div>
                    <label className="block">Product</label>
                    <select
                        value={productId}
                        onChange={(e) => setProductId(e.target.value)}
                        className="w-full border px-3 py-2"
                        required
                    >
                        <option value="">Select Product</option>
                        {products.map((product) => (
                            <option key={product.id} value={product.id}>
                                {product.type_product}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border px-3 py-2"
                        required
                    />
                </div>
                <div>
                    <label className="block">Description</label>
                    <div className="border p-2">
                        <div ref={quillRef} style={{ minHeight: '150px' }} />
                    </div>
                </div>
                <div>
                    <label className="block">Type</label>
                    <input
                        type="text"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="w-full border px-3 py-2"
                        required
                    />
                </div>
                <div>
                    <label className="block">Images</label>
                    <input
                        type="file"
                        multiple
                        onChange={handleImageChange}
                        className="w-full"
                    />
                </div>
                <div className="mt-4">
                    <h3 className="font-bold">Image Preview:</h3>
                    <div className="flex flex-wrap">
                        {localImages.map((image) => (
                            <div key={image.id} className="relative m-2">
                                <img
                                    src={`/storage/${image.path}`}
                                    alt={`Image ${image.id}`}
                                    className="w-24 h-24 object-cover border"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleDeleteImage(image.id)}
                                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                                >
                                    x
                                </button>
                            </div>
                        ))}
                        {Array.from(images).map((image, index) => (
                            <div key={index} className="relative m-2">
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt={`Preview ${index}`}
                                    className="w-24 h-24 object-cover border"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemovePreviewImage(index)} // Gambar baru tidak memiliki ID, bisa diabaikan
                                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                                >
                                    x
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <div className="flex md:flex-row gap-4 flex-col">
                    <button type="submit" className="bg-blue-500 rounded-2xl text-white px-4 py-2">
                        {loading ? 'Saving...' : 'Save Product Detail'}
                    </button>
                    {productDetail && (
                        <button onClick={onClose} className="bg-blue-200 rounded-2xl text-black px-4 py-2">
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}

export default ProductDetailForm;
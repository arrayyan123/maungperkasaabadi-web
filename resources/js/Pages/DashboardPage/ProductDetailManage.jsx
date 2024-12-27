import ProductDetailForm from '@/Components/Admin/ProductDetailForm'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import React, { useEffect, useState, useRef } from 'react';
import { Head } from '@inertiajs/react';

function ProductDetailManage() {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [product, setProduct] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const formRef = useRef(null);

    const fetchProduct = async () => {
        try {
            const response = await fetch('/product_details');
            const data = await response.json();
            setProduct(data);
        } catch (error) {
            console.error('Error fetching About Us:', error);
        }
    }

    useEffect(() => {
        fetchProduct();
    }, [refresh]);

    const handleEditProduct = (item) => {
        setSelectedProduct(item);

        if (formRef.current) {
            formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const handleDeleteProduct = async (ProductDetailId) => {
        if (window.confirm('Are you sure you want to delete this About Us item?')) {
            try {
                const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
                await fetch(`/product_details/${ProductDetailId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': csrfToken,
                    },
                });
                alert('Product Detail deleted successfully!');
                setRefresh(!refresh);
            } catch (error) {
                console.error('Error deleting Product Detail item:', error);
                alert('Failed to delete Product Detail item. Please try again.');
            }
        }
    };
    return (
        <div>
            <AuthenticatedLayout
                header={
                    <h2 className="text-2xl font-bold text-white">
                        Dashboard - Product Detail Management
                    </h2>
                }
            >
                <Head title="Product Detail Management" />
                <div className='p-6 bg-gradient-to-b from-gray-800 to-gray-900 text-white min-h-screen'>
                    <div ref={formRef}>
                        <ProductDetailForm
                            productDetail={selectedProduct}
                            onClose={() => setSelectedProduct(null)}
                            onUpdate={() => setRefresh(!refresh)}
                        />
                    </div>
                    <div className="my-6">
                        <h3 className="text-xl font-semibold mb-4">Product Detail List</h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-gray-800 text-white rounded-lg shadow-md">
                                <thead>
                                    <tr className="bg-gray-700 text-left">
                                        <th className="py-3 px-4">Product Name</th>
                                        <th className="py-3 px-4">Product Description</th>
                                        <th className="py-3 px-4">Type Product</th>
                                        <th className="py-3 px-4">Images</th>
                                        <th className="py-3 px-4">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {product.map((item) => (
                                        <tr key={item.id} className="border-t border-gray-700 hover:bg-gray-700">
                                            <td className="py-3 px-4">{item.product_name}</td>
                                            <td className="py-3 px-4">
                                                <div
                                                    className="prose prose-sm max-w-none text-white"
                                                    dangerouslySetInnerHTML={{ __html: item.product_description }}
                                                />
                                            </td>
                                            <td className="py-3 px-4">
                                                {item.type_product}
                                            </td>
                                            <td className="py-3 px-4 flex flex-col space-y-2">
                                                <img
                                                    src={`/storage/${item.image}`}
                                                    alt={`Image ${item.image}`}
                                                    width="50"
                                                    className="border rounded"
                                                />
                                            </td>
                                            <td className="py-3 px-4 items-center space-y-2">
                                                <button
                                                    onClick={() => handleEditProduct(item)}
                                                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteProduct(item.id)}
                                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {product.length === 0 && (
                                <p className="text-center text-gray-400 mt-4">
                                    No Team member items found.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </div>
    )
}

export default ProductDetailManage
import ProductDetailForm from '@/Components/Admin/Product/ProductDetailForm'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import React, { useEffect, useState, useRef } from 'react';
import { Head } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import ProductForm from '@/Components/Admin/Product/ProductForm';


function ProductDetailManage() {
    const [currentTab, setCurrentTab] = useState("productmanage");
    const tabs = [
        { label: "Product Manage", value: "productmanage" },
        { label: "Product Detail Manage", value: "productdetailmanage" },
    ];

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [products, setProducts] = useState([]);
    const [productDetail, setProductDetail] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(3);
    const formRef = useRef(null);

    const fetchProducts = async () => {
        try {
            const response = await fetch('/api/products');
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const fetchProductDetail = async () => {
        try {
            const response = await fetch('/api/product-details');
            const data = await response.json();
            setProductDetail(data);
        } catch (error) {
            console.error('Error fetching About Us:', error);
        }
    }

    useEffect(() => {
        fetchProductDetail();
        fetchProducts();
    }, [refresh]);

    const handleEditProducts = (product) => {
        setSelectedProducts(product);
        if (formRef.current) {
            formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const handleEditProduct = (item) => {
        setSelectedProduct(item);

        if (formRef.current) {
            formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const handleDeleteProducts = async (productId) => {
        if (window.confirm('Are you sure you want to delete this product item?')) {
            try {
                const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
                await fetch(`/api/products/${productId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': csrfToken,
                    },
                });
                alert('About Us item deleted successfully!');
                setRefresh(!refresh);
            } catch (error) {
                console.error('Error deleting product item:', error);
                alert('Failed to delete product item. Please try again.');
            }
        }
    };

    const handleDeleteProduct = async (ProductDetailId) => {
        if (window.confirm('Are you sure you want to delete this Product Detail?')) {
            try {
                const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
                await fetch(`/api/product-details/${ProductDetailId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': csrfToken,
                    },
                });
                alert('Product Detail deleted successfully!');
                setRefresh(!refresh);
            } catch (error) {
                console.error('Error deleting Product Detail:', error);
                alert('Failed to delete Product Detail. Please try again.');
            }
        }
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = productDetail.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(productDetail.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    return (
        <div>
            <AuthenticatedLayout
                header={
                    <h2 className="text-2xl font-bold text-white">
                        Product Management
                    </h2>
                }
            >
                <Head title="Product Detail Management" />
                <div className='p-4'>
                    <div className="mx-auto w-full sm:px-4 lg:px-5">
                        <div className="flex border-b overflow-x-auto border-gray-200">
                            {tabs.map(({ label, value }) => (
                                <button
                                    key={value}
                                    onClick={() => {
                                        setCurrentTab(value);
                                    }}
                                    className={`py-2 px-4 text-sm font-medium ${currentTab === value
                                        ? "border-b-2 border-blue-500 text-blue-500"
                                        : "text-gray-500 hover:text-blue-500"
                                        }`}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                        {currentTab === "productmanage" && (
                            <div>
                                <div ref={formRef}>
                                    <ProductForm
                                        product={selectedProduct}
                                        onClose={() => setSelectedProduct(null)}
                                        onUpdate={() => setRefresh(!refresh)}
                                    />
                                </div>
                                <div className="my-6">
                                    <h3 className="text-xl font-semibold mb-4">Products List</h3>
                                    <div className="overflow-x-auto">
                                        <table className="w-full border-collapse border border-gray-300 mt-4">
                                            <thead>
                                                <tr className="bg-gray-100">
                                                    <th className="border border-gray-300 px-4 py-2">Type</th>
                                                    <th className="border border-gray-300 px-4 py-2">Description</th>
                                                    <th className="border border-gray-300 px-4 py-2">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {products.map((product) => (
                                                    <tr key={product.id}>
                                                        <td className="border border-gray-300 px-4 py-2">
                                                            {product.type_product}
                                                        </td>
                                                        <td className="border border-gray-300 px-4 py-2">
                                                            <div
                                                                className="prose prose-sm max-w-none"
                                                                dangerouslySetInnerHTML={{ __html: product.description_product }}
                                                            />
                                                        </td>
                                                        <td className="border border-gray-300 px-4 py-2">
                                                            <button
                                                                onClick={() => handleEditProduct(product)}
                                                                className="bg-blue-500 text-white px-2 py-1 mr-2 rounded"
                                                            >
                                                                Edit
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteProduct(product.id)}
                                                                className="bg-red-500 text-white px-2 py-1 rounded"
                                                            >
                                                                Delete
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        {products.length === 0 && (
                                            <p className="text-center text-gray-400 mt-4">
                                                No products found.
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                        {currentTab === "productdetailmanage" && (
                            <div>
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
                                        <table className="min-w-full bg-white text-black rounded-lg shadow-md">
                                            <thead>
                                                <tr className="bg-gray-100 border-b-2 border-gray-300">
                                                    <th className="px-4 py-2">Product Detail</th>
                                                    <th className="px-4 py-2">Type</th>
                                                    <th className="px-4 py-2">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentProducts.map((detail) => (
                                                    <tr key={detail.id}>
                                                        <td className="px-4 py-2 my-10">
                                                            <div className="flex lg:flex-row items-center flex-col w-full gap-4">
                                                                <img
                                                                    src={detail.images[0]?.path ? `/storage/${detail.images[0].path}` : '/default-thumbnail.png'}
                                                                    alt={detail.product_detail_name}
                                                                    className="w-56 h-32 object-cover rounded-md"
                                                                />
                                                                <div className="flex flex-col w-full">
                                                                    <h1 className="font-bold text-xl">
                                                                        {detail.product_detail_name}
                                                                    </h1>
                                                                    <div className="">
                                                                        <div
                                                                            className="prose prose-sm max-w-none"
                                                                            dangerouslySetInnerHTML={{ __html: detail.product_detail_description.substring(0, 200) + (detail.product_detail_description.length > 200 ? '...' : '') }}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-2 my-10">
                                                            {detail.product_detail_type}
                                                        </td>
                                                        <td className="px-4 py-2 my-10 flex items-center gap-2 justify-center">
                                                            <button
                                                                onClick={() =>
                                                                    handleEditProduct(detail)
                                                                }
                                                                className="bg-blue-500 text-white px-2 py-1 rounded"
                                                            >
                                                                <FontAwesomeIcon icon={faPenToSquare} />
                                                            </button>
                                                            <button
                                                                onClick={() =>
                                                                    handleDeleteProduct(detail.id)
                                                                }
                                                                className="bg-red-500 text-white px-2 py-1 rounded"
                                                            >
                                                                <FontAwesomeIcon icon={faTrash} />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        {productDetail.length === 0 && (
                                            <p className="text-center text-gray-400 mt-4">
                                                No Product detail items found.
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex justify-center mt-4">
                                        {Array.from({ length: totalPages }, (_, index) => (
                                            <button
                                                key={index + 1}
                                                onClick={() => handlePageChange(index + 1)}
                                                className={`mx-1 px-3 py-1 rounded ${currentPage === index + 1
                                                    ? 'bg-blue-500 text-white'
                                                    : 'bg-gray-700 text-gray-300'
                                                    }`}
                                            >
                                                {index + 1}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </AuthenticatedLayout>
        </div>
    )
}

export default ProductDetailManage
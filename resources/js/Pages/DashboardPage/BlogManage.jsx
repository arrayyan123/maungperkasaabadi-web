import React, { useEffect, useState, useRef } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import IonIcon from '@reacticons/ionicons'
import moment from 'moment';
import BlogForm from '@/Components/Admin/BlogForm';
import Newsletter from '@/Components/Admin/Newsletter';


function BlogManage() {
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [blog, setBlog] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(3);
    const formRef = useRef(null);

    const fetchBlog = async () => {
        try {
            const response = await fetch('/blogs');
            const data = await response.json();
            setBlog(data);
        } catch (error) {
            console.error('Error fetching About Us:', error);
        }
    }

    useEffect(() => {
        fetchBlog();
    }, [refresh]);

    const handleEditBlog = (item) => {
        setSelectedBlog(item);
        if (formRef.current) {
            formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentBlogs = blog.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(blog.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleDeleteBlog = async (blogId) => {
        if (window.confirm('Are you sure you want to delete this About Us item?')) {
            try {
                const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
                await fetch(`/blogs/${blogId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': csrfToken,
                    },
                });
                alert('Blog item deleted successfully!');
                setRefresh(!refresh);
            } catch (error) {
                console.error('Error deleting About Us item:', error);
                alert('Failed to delete Blog item. Please try again.');
            }
        }
    };

    return (
        <>
            <AuthenticatedLayout
                header={
                    <h2 className="text-2xl font-bold text-white">
                        Dashboard - Blog Management
                    </h2>
                }
            >
                <Head title="Blog Management" />
                <div className='p-6 bg-gradient-to-b from-gray-800 to-gray-900 text-white min-h-screen'>
                    <div ref={formRef}>
                        <BlogForm
                            Blog={selectedBlog}
                            onClose={() => setSelectedBlog(null)}
                            onUpdate={() => setRefresh(!refresh)}
                        />
                    </div>
                    <div className="my-6">
                        <h3 className="text-xl font-semibold mb-4">Blog List</h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-gray-800 text-white rounded-lg shadow-md">
                                <thead>
                                    <tr className="bg-gray-700 text-left">
                                        <th className="py-3 px-4">Title</th>
                                        <th className="py-3 px-4">Description</th>
                                        <th className="py-3 px-4">Waktu Upload</th>
                                        <th className="py-3 px-4">Images</th>
                                        <th className="py-3 px-4">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentBlogs.map((item) => (
                                        <tr key={item.id} className="border-t border-gray-700 hover:bg-gray-700">
                                            <td className="py-3 px-4">{item.title}</td>
                                            <td className="py-3 px-4">
                                                <div
                                                    className="prose prose-sm max-w-none text-white"
                                                    dangerouslySetInnerHTML={{ __html: item.description }}
                                                />
                                            </td>
                                            <td className="py-3 px-4">
                                                {moment(item.created_at).format('MMMM Do, YYYY, h:mm A')}
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
                                                    onClick={() => handleEditBlog(item)}
                                                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteBlog(item.id)}
                                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {blog.length === 0 && (
                                <p className="text-center text-gray-400 mt-4">
                                    No Blog items found.
                                </p>
                            )}
                        </div>
                        <div className="flex justify-center mt-4">
                            {Array.from({ length: totalPages }, (_, index) => (
                                <button
                                    key={index + 1}
                                    onClick={() => handlePageChange(index + 1)}
                                    className={`mx-1 px-3 py-1 rounded ${
                                        currentPage === index + 1
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-700 text-gray-300'
                                    }`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <Newsletter />
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    )
}

export default BlogManage
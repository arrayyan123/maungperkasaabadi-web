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
    const [news, setNews] = useState([]);
    const [subscriber, setSubscriber] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [currentPageBlogs, setCurrentPageBlogs] = useState(1);
    const [currentPageNews, setCurrentPageNews] = useState(1);
    const [currentPageSubscriber, setCurrentPageSubscriber] = useState(1);

    const itemsPerPageBlogs = 3;
    const itemsPerPageNews = 3;
    const itemsPerPageSubscriber = 3;
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

    const fetchNewsletter = async () => {
        try {
            const response = await fetch('/admin/newsletter');
            const data = await response.json();
            setNews(data);
        } catch (error) {
            console.error('Error fetching About Us:', error);
        }
    }

    const fetchSubscriber = async () => {
        try {
            const response = await fetch('/admin/subscriber');
            const data = await response.json();
            setSubscriber(data);
        } catch (error) {
            console.error('Error fetching About Us:', error);
        }
    }

    useEffect(() => {
        fetchSubscriber();
        fetchNewsletter();
        fetchBlog();
    }, [refresh]);

    const handleEditBlog = (item) => {
        setSelectedBlog(item);
        if (formRef.current) {
            formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const indexOfLastBlog = currentPageBlogs * itemsPerPageBlogs;
    const indexOfFirstBlog = indexOfLastBlog - itemsPerPageBlogs;
    const currentBlogs = blog.slice(indexOfFirstBlog, indexOfLastBlog);
    const totalBlogPages = Math.ceil(blog.length / itemsPerPageBlogs);

    const indexOfLastNews = currentPageNews * itemsPerPageNews;
    const indexOfFirstNews = indexOfLastNews - itemsPerPageNews;
    const currentNews = news.slice(indexOfFirstNews, indexOfLastNews);
    const totalNewsPages = Math.ceil(news.length / itemsPerPageNews);

    const indexOfLastSubscriber = currentPageSubscriber * itemsPerPageSubscriber;
    const indexOfFirstSubscriber = indexOfLastSubscriber - itemsPerPageSubscriber;
    const currentSubscriber = subscriber.slice(indexOfFirstSubscriber, indexOfLastSubscriber);
    const totalSubscriberPages = Math.ceil(subscriber.length / itemsPerPageSubscriber);

    const handlePageChangeBlogs = (pageNumber) => {
        setCurrentPageBlogs(pageNumber);
    };

    const handlePageChangeNews = (pageNumber) => {
        setCurrentPageNews(pageNumber);
    };

    const handlePageChangeSubscriber = (pageNumber) => {
        setCurrentPageSubscriber(pageNumber);
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

    const handleDeleteNews = async (newsId) => {
        if (window.confirm('Are you sure you want to delete this News?')) {
            try {
                const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
                await fetch(`/admin/newsletter/${newsId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': csrfToken,
                    },
                });
                alert('News deleted successfully!');
                setRefresh(!refresh);
            } catch (error) {
                console.error('Error deleting News:', error);
                alert('Failed to delete News. Please try again.');
            }
        }
    };

    const handleDeleteSubscriber = async (newsId) => {
        if (window.confirm('Are you sure you want to delete this Subscriber?')) {
            try {
                const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
                await fetch(`/admin/subscriber/${newsId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': csrfToken,
                    },
                });
                alert('Subscriber deleted successfully!');
                setRefresh(!refresh);
            } catch (error) {
                console.error('Error deleting About Us item:', error);
                alert('Failed to delete Subscriber. Please try again.');
            }
        }
    };

    return (
        <>
            <AuthenticatedLayout
                header={
                    <h2 className="text-2xl font-bold text-white">
                        Dashboard - Blog &amp; NewsLetter
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
                            {currentBlogs.length === 0 && (
                                <p className="text-center text-gray-400 mt-4">
                                    No Blog items found.
                                </p>
                            )}
                        </div>
                        <div className="flex justify-center mt-4">
                            {Array.from({ length: totalBlogPages }, (_, index) => (
                                <button
                                    key={index + 1}
                                    onClick={() => handlePageChangeBlogs(index + 1)}
                                    className={`mx-1 px-3 py-1 rounded ${currentPageBlogs === index + 1
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
                    <div className="my-6">
                        <h3 className="text-xl font-semibold mb-4">NewsLetter List</h3>
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
                                    {currentNews.map((item) => (
                                        <tr key={item.id} className="border-t border-gray-700 hover:bg-gray-700">
                                            <td className="py-3 px-4">{item.title}</td>
                                            <td className="py-3 px-4">
                                                <div
                                                    className="prose prose-sm max-w-none text-white"
                                                    dangerouslySetInnerHTML={{ __html: item.body }}
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
                                                    onClick={() => handleDeleteNews(item.id)}
                                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {currentNews.length === 0 && (
                                <p className="text-center text-gray-400 mt-4">
                                    No Newsletter items found.
                                </p>
                            )}
                        </div>
                        <div className="flex justify-center mt-4">
                            {Array.from({ length: totalNewsPages }, (_, index) => (
                                <button
                                    key={index + 1}
                                    onClick={() => handlePageChangeNews(index + 1)}
                                    className={`mx-1 px-3 py-1 rounded ${currentPageNews === index + 1
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-700 text-gray-300'
                                        }`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="my-6">
                        <h3 className="text-xl font-semibold mb-4">Subscriber List</h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-gray-800 text-white rounded-lg shadow-md">
                                <thead>
                                    <tr className="bg-gray-700 text-left">
                                        <th className="py-3 px-4">Name</th>
                                        <th className="py-3 px-4">Description</th>
                                        <th className="py-3 px-4">Waktu Daftar</th>
                                        <th className="py-3 px-4">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentSubscriber.map((item) => (
                                        <tr key={item.id} className="border-t border-gray-700 hover:bg-gray-700">
                                            <td className="py-3 px-4">{item.name}</td>
                                            <td className="py-3 px-4">
                                                {item.email}
                                            </td>
                                            <td className="py-3 px-4">
                                                {moment(item.created_at).format('MMMM Do, YYYY, h:mm A')}
                                            </td>
                                            <td className="py-3 px-4 items-center space-y-2">
                                                <button
                                                    onClick={() => handleDeleteSubscriber(item.id)}
                                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {currentSubscriber.length === 0 && (
                                <p className="text-center text-gray-400 mt-4">
                                    No Subscriber items found.
                                </p>
                            )}
                        </div>
                        <div className="flex justify-center mt-4">
                            {Array.from({ length: totalSubscriberPages }, (_, index) => (
                                <button
                                    key={index + 1}
                                    onClick={() => handlePageChangeSubscriber(index + 1)}
                                    className={`mx-1 px-3 py-1 rounded ${currentPageSubscriber === index + 1
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
            </AuthenticatedLayout>
        </>
    )
}

export default BlogManage
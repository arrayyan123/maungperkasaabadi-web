import React, { useEffect, useState, useRef, useCallback } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import IonIcon from '@reacticons/ionicons'
import moment from 'moment';
import BlogForm from '@/Components/Admin/BlogForm';
import Newsletter from '@/Components/Admin/Newsletter';
import BlogTypeForm from '@/Components/Admin/BlogTypeForm';

function BlogManage() {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [selectedBlogType, setSelectedBlogType] = useState(null);
    const [blog, setBlog] = useState([]);
    const [news, setNews] = useState([]);
    const [subscriber, setSubscriber] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [currentPageBlogs, setCurrentPageBlogs] = useState(1);
    const [currentPageNews, setCurrentPageNews] = useState(1);
    const [currentPageSubscriber, setCurrentPageSubscriber] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [typeBlog, setTypeBlog] = useState([]);
    const [comments, setComments] = useState([]);
    const [selectedComments, setSelectedComments] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [currentTab, setCurrentTab] = useState("blogmanage");
    const tabs = [
        { label: "Blog Types Manage", value: "blogtype" },
        { label: "Blog Manage", value: "blogmanage" },
        { label: "Blog Comments Manage", value: "commentmanage" },
        { label: "Newsletter Manage", value: "newslettermanage" },
    ];

    const itemsPerPageBlogs = 3;
    const itemsPerPageNews = 3;
    const itemsPerPageSubscriber = 3;
    const formRef = useRef(null);

    const fetchBlog = async () => {
        try {
            const response = await fetch('/api/blogs');
            const data = await response.json();
            setBlog(data);
        } catch (error) {
            console.error('Error fetching About Us:', error);
        }
    }

    const fetchBlogType = async () => {
        try {
            const response = await fetch('/api/blog-types');
            const data = await response.json();
            setTypeBlog(data);
        } catch (error) {
            console.error('Error fetching blog:', error);
        }
    }

    const fetchComments = async (blogId) => {
        try {
            const response = await fetch(`/api/blogs/${blogId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setComments(data.comments);
            setSelectedComments([]);
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };

    const handleSelectBlog = (blog) => {
        setSelectedBlog(blog);
        fetchComments(blog.id);
    };

    const toggleCommentSelection = (commentId) => {
        setSelectedComments((prev) =>
            prev.includes(commentId)
                ? prev.filter((id) => id !== commentId)
                : [...prev, commentId]
        );
    };

    const toggleSelectAllComments = () => {
        if (selectedComments.length === comments.length) {
            setSelectedComments([]);
        } else {
            setSelectedComments(comments.map((comment) => comment.id));
        }
    };

    const deleteSelectedComments = async () => {
        try {
            await Promise.all(
                selectedComments.map((id) =>
                    fetch(`/api/comments/${id}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-CSRF-TOKEN': csrfToken,
                        },
                    })
                )
            );
            alert('Selected comments deleted successfully!');
            setShowDeleteModal(false);
            fetchComments(selectedBlog.id);
        } catch (error) {
            console.error('Error deleting selected comments:', error);
            alert('Failed to delete selected comments.');
        }
    };

    const fetchNewsletter = async () => {
        try {
            const response = await fetch('/api/admin/newsletter');
            const data = await response.json();
            setNews(data);
        } catch (error) {
            console.error('Error fetching About Us:', error);
        }
    }

    const fetchSubscriber = async () => {
        try {
            const response = await fetch('/api/admin/subscriber');
            const data = await response.json();
            setSubscriber(data);
        } catch (error) {
            console.error('Error fetching About Us:', error);
        }
    }

    useEffect(() => {
        fetchComments();
        fetchBlogType();
        fetchSubscriber();
        fetchNewsletter();
        fetchBlog();
    }, [refresh]);

    const handleEditBlog = (item) => {
        setSelectedBlog(item);
        setIsModalOpen(true);
    };

    const handleEditBlogType = (item) => {
        setSelectedBlogType(item);
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
        if (window.confirm('Are you sure you want to delete this Blog item?')) {
            try {
                const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
                await fetch(`/api/blogs/${blogId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': csrfToken,
                    },
                });
                alert('Blog item deleted successfully!');
                setRefresh(!refresh);
            } catch (error) {
                console.error('Error deleting Blog item:', error);
                alert('Failed to delete Blog item. Please try again.');
            }
        }
    };

    const handleDeleteBlogType = async (blogTypeId) => {
        if (window.confirm('Are you sure you want to delete this Blog Type item?')) {
            try {
                const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
                await fetch(`/api/blog-types/${blogTypeId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': csrfToken,
                    },
                });
                alert('Blog Type item deleted successfully!');
                setRefresh(!refresh);
            } catch (error) {
                console.error('Error deleting Blog Type item:', error);
                alert('Failed to delete Blog item. Please try again.');
            }
        }
    };

    const handleDeleteNews = async (newsId) => {
        if (window.confirm('Are you sure you want to delete this News?')) {
            try {
                const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
                await fetch(`/api/admin/newsletter/${newsId}`, {
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
                await fetch(`/api/admin/subscriber/${newsId}`, {
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

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedBlog(null);
    };

    const handleKeyDown = useCallback((event) => {
        if (event.key === 'Escape') {
            handleCloseModal();
        }
    }, []);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    const handleOutsideClick = (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            handleCloseModal();
        }
    };

    return (
        <>
            <AuthenticatedLayout
                header={
                    <h2 className="text-2xl font-bold text-white">
                        Blog &amp; NewsLetter
                    </h2>
                }
            >
                <Head title="Blog Management" />
                <div className='mx-auto w-full sm:px-4 lg:px-5 py-5 bg-white text-black min-h-screen'>
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
                    {currentTab === "blogtype" && (
                        <div className="mt-4 p-4">
                            <BlogTypeForm
                                blogType={selectedBlogType}
                                onClose={() => setSelectedBlogType(null)}
                                onUpdate={() => setRefresh(!refresh)}
                            />
                            <div className="my-6">
                                <h3 className="text-xl font-semibold mb-4">Blog List</h3>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full bg-white md:border-none border text-black rounded-lg shadow-md">
                                        <thead>
                                            <tr className="bg-white text-left">
                                                <th className="py-3 px-4">Tipe Blog</th>
                                                <th className="py-3 px-4">Waktu Upload</th>
                                                <th className="py-3 px-4">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {typeBlog.map((item) => (
                                                <tr key={item.id} className="border-t border-gray-700">
                                                    <td className="py-3 px-4">{item.type_blog}</td>
                                                    <td className="py-3 px-4">
                                                        {moment(item.created_at).format('MMMM Do, YYYY, h:mm A')}
                                                    </td>
                                                    <td className="py-3 px-4 items-center space-y-2">
                                                        <button
                                                            onClick={() => handleEditBlogType(item)}
                                                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteBlogType(item.id)}
                                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    {typeBlog.length === 0 && (
                                        <p className="text-center text-gray-400 mt-4">
                                            No Blog Type items found.
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                    {currentTab === "blogmanage" && (
                        <div className="mt-4 p-4">
                            <button
                                onClick={() => {
                                    setSelectedBlog(null);
                                    setIsModalOpen(true); // Open modal for new blog
                                }}
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                            >
                                Add New Blog
                            </button>
                            <div className="my-6">
                                <h3 className="text-xl font-semibold mb-4">Blog List</h3>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full bg-white md:border-none border text-black rounded-lg shadow-md">
                                        <thead>
                                            <tr className="bg-white text-left">
                                                <th className="py-3 px-4">Title</th>
                                                <th className="py-3 px-4">Description</th>
                                                <th className="py-3 px-4">Type Blog</th>
                                                <th className="py-3 px-4">Waktu Upload</th>
                                                <th className="py-3 px-4">Images</th>
                                                <th className="py-3 px-4">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentBlogs.map((item) => (
                                                <tr key={item.id} className="border-t border-gray-700">
                                                    <td className="py-3 px-4">{item.title}</td>
                                                    <td className="py-3 px-4">
                                                        <div
                                                            className="prose prose-sm max-w-none text-black"
                                                            dangerouslySetInnerHTML={{ __html: item.description.substring(0, 100) + (item.description.length > 100 ? '...' : '') }}
                                                        />
                                                    </td>
                                                    <td className="py-3 px-4">
                                                        {item.blog_type && (
                                                            <h3 className="text-sm text-black">
                                                                {item.blog_type.type_blog || 'tidak ada'}
                                                            </h3>
                                                        )}
                                                    </td>
                                                    <td className="py-3 px-4">
                                                        {moment(item.created_at).format('MMMM Do, YYYY, h:mm A')}
                                                    </td>
                                                    <td className="py-3 px-4 flex flex-wrap">
                                                        {item.images.map((image) => (
                                                            <img
                                                                key={image.id}
                                                                src={`/storage/${image.path}`}
                                                                alt={`Image ${image.path}`}
                                                                width="50"
                                                                className="border rounded"
                                                            />
                                                        ))}
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
                        </div>
                    )}
                    {currentTab === "commentmanage" && (
                        <div className="p-4">
                            <div className="mb-6">
                                <h2 className="text-lg font-semibold mb-2">Daftar Blog</h2>
                                <ul className="border rounded-md divide-y">
                                    {currentBlogs.map((blog) => (
                                        <li
                                            key={blog.id}
                                            className={`p-4 cursor-pointer ${selectedBlog?.id === blog.id ? "bg-blue-100" : ""
                                                }`}
                                            onClick={() => handleSelectBlog(blog)}
                                        >
                                            <h3 className="font-medium">{blog.title}</h3>
                                            <div
                                                className="prose prose-sm max-w-none text-black"
                                                dangerouslySetInnerHTML={{ __html: blog.description.substring(0, 100) + (blog.description.length > 100 ? '...' : '') }}
                                            />
                                        </li>
                                    ))}
                                </ul>
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
                            {selectedBlog && (
                                <div>
                                    <h2 className="text-lg font-semibold mb-4">
                                        Komentar untuk: {selectedBlog.title}
                                    </h2>

                                    <div className="flex items-center justify-between mb-4">
                                        <button
                                            onClick={toggleSelectAllComments}
                                            className="bg-blue-500 text-white px-4 py-2 rounded"
                                        >
                                            {selectedComments.length === comments.length
                                                ? 'Deselect All'
                                                : 'Select All'}
                                        </button>
                                        <button
                                            onClick={() => setShowDeleteModal(true)}
                                            className={`bg-red-500 text-white px-4 py-2 rounded ${selectedComments.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
                                                }`}
                                            disabled={selectedComments.length === 0}
                                        >
                                            Delete Selected ({selectedComments.length})
                                        </button>
                                    </div>

                                    <ul className="border rounded-md divide-y">
                                        {comments.map((comment) => (
                                            <li key={comment.id} className="p-4 flex items-center gap-4">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedComments.includes(comment.id)}
                                                    onChange={() => toggleCommentSelection(comment.id)}
                                                />
                                                <div>
                                                    <div>
                                                        <p className="font-medium">{comment.name}</p>
                                                        <p>{comment.email}</p>
                                                    </div>
                                                    <div
                                                        className="prose prose-sm max-w-none text-black"
                                                        dangerouslySetInnerHTML={{ __html: comment.comment.substring(0, 100) + (comment.comment.length > 100 ? '...' : '') }}
                                                    />
                                                </div>
                                            </li>
                                        ))}
                                    </ul>

                                    {comments.length === 0 && (
                                        <p className="text-gray-600 mt-4">Tidak ada komentar.</p>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                    {currentTab === "newslettermanage" && (
                        <div>
                            <div>
                                <Newsletter />
                            </div>
                            <div className="my-6">
                                <h3 className="text-xl font-semibold mb-4">NewsLetter List</h3>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full text-black rounded-lg shadow-md">
                                        <thead>
                                            <tr className=" text-left">
                                                <th className="py-3 px-4">Title</th>
                                                <th className="py-3 px-4">Description</th>
                                                <th className="py-3 px-4">Waktu Upload</th>
                                                <th className="py-3 px-4">Images</th>
                                                <th className="py-3 px-4">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentNews.map((item) => (
                                                <tr key={item.id} className="border-t border-gray-700 ">
                                                    <td className="py-3 px-4">{item.title}</td>
                                                    <td className="py-3 px-4">
                                                        <div
                                                            className="prose prose-sm max-w-none text-black"
                                                            dangerouslySetInnerHTML={{ __html: item.body.substring(0, 100) + (item.body.length > 100 ? '...' : '') }}
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
                    )}
                </div>
            </AuthenticatedLayout>
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={handleOutsideClick}>
                    <div className="bg-white w-full overflow-y-auto max-h-[calc(100vh-2rem)] max-w-4xl p-6 rounded-lg shadow-lg relative">
                        {/* Close Button */}
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>

                        {/* BlogForm */}
                        <BlogForm
                            Blog={selectedBlog}
                            onClose={() => {
                                setIsModalOpen(false);
                                setSelectedBlog(null);
                            }}
                            onUpdate={() => {
                                setRefresh(!refresh);
                                setIsModalOpen(false);
                            }}
                        />
                    </div>
                </div>
            )}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
                        <p className="text-lg">Are you sure you want to delete selected comments?</p>
                        <div className="mt-4 flex justify-end space-x-4">
                            <button
                                onClick={deleteSelectedComments}
                                className="bg-red-500 text-white px-4 py-2 rounded"
                            >
                                Yes, Delete
                            </button>
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="bg-gray-300 text-black px-4 py-2 rounded"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default BlogManage
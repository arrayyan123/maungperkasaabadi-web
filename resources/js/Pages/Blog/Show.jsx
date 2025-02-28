import React, { useState, useEffect } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import WebsiteLayout from '@/Layouts/WebsiteLayout';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import moment from 'moment';

function Show({ blog }) {
    const { props } = usePage();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        comment: '',
    });

    const [blogs, setBlogs] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredBlogs = blogs.filter(blog =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const fetchBlog = async () => {
        try {
            const response = await fetch('/api/blogs');
            const data = await response.json();
            setBlogs(data);
        } catch (error) {
            console.error('Error fetching Blogs:', error);
        }
    }

    useEffect(() => {
        fetchBlog();
    }, []);

    const [successMessage, setSuccessMessage] = useState('');
    const [comments, setComments] = useState(blog.comments);
    const [sortOrder, setSortOrder] = useState('newest');
    const [modalImage, setModalImage] = useState(null);

    const openModal = (imagePath) => {
        setModalImage(imagePath);
    };

    const closeModal = () => {
        setModalImage(null);
    };


    const { quill, quillRef } = useQuill();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dataToSend = new FormData();
        dataToSend.append('name', formData.name);
        dataToSend.append('email', formData.email);
        dataToSend.append('comment', quill ? quill.root.innerHTML : '');

        const csrfToken = document.querySelector('meta[name="csrf-token"]').content;

        try {
            const response = await axios.post(`/api/blogs/${blog.id}/comments`, dataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-CSRF-TOKEN': csrfToken,
                },
            });

            // Periksa apakah respons berhasil
            if (response.status === 200) {
                setSuccessMessage(response.data.message);
                setComments([...comments, { ...formData, id: Date.now() }]);
                setFormData({
                    name: '',
                    email: '',
                    comment: '',
                });
                if (quill) quill.root.innerHTML = '';
                //window.location.reload();
            } else {
                console.error('Failed to submit comment:', response.data);
            }
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
        }
    };

    const sortComments = (comments) => {
        return comments.sort((a, b) => {
            const dateA = new Date(a.created_at);
            const dateB = new Date(b.created_at);
            return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
        });
    };

    useEffect(() => {
        if (quill) {
            quill.on('text-change', () => {
                setFormData((prev) => ({
                    ...prev,
                    comment: quill.root.innerHTML,
                }));
            });
        }
    }, [quill]);

    return (
        <>
            <WebsiteLayout>
                <Head title={blog.title} />
                <div className='p-4 flex md:flex-row flex-col text-black lg:space-x-5 space-x-0 items-start'>
                    <div className='flex flex-col w-full'>
                        <a href="/blog-page">
                            <button className='bg-[#0F2749] my-4 px-4 py-2 text-white rounded-xl shadow-lg scale-100 hover:scale-110 ease-in-out transition-all duration-300'>
                                Kembali
                            </button>
                        </a>
                        <h1 className="text-2xl font-bold">{blog.title}</h1>
                        <h1 className='text-sm text-gray-400'>dibuat oleh: {blog.author}</h1>
                        <p className='text-sm text-gray-400 mb-3'>{moment(blog.created_at).format('MMMM Do, YYYY, h:mm A')}</p>
                        <a
                            onClick={(e) => {
                                e.preventDefault();
                                openModal(`/storage/${blog.images[0]?.path}`);
                            }}
                            className='h-80 group relative flex items-end mb-4 overflow-hidden rounded-lg bg-gray-100 shadow-lg'
                            href="#"
                        >
                            <img
                                src={`/storage/${blog.images[0]?.path}`}
                                alt={blog.title}
                                className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                            />
                        </a>
                        <div
                            className="prose prose-sm max-w-none"
                            dangerouslySetInnerHTML={{ __html: blog.description }}
                        />
                        <div className='mt-5'>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6 xl:gap-8">
                                {blog.images.map((image, index) => {
                                    const isFirstInRow = (Math.floor(index / 2) % 2 === 0);
                                    const isLeftImage = index % 2 === 0;
                                    return (
                                        <a
                                            key={index}
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                openModal(`/storage/${image.path}`);
                                            }}
                                            className={`group relative flex items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg ${isFirstInRow
                                                ? isLeftImage
                                                    ? 'h-80'
                                                    : 'md:col-span-2 col-span-1 h-80'
                                                : isLeftImage
                                                    ? 'md:col-span-2 col-span-1 h-80'
                                                    : 'h-80'
                                                }`}
                                        >
                                            <img
                                                src={`/storage/${image.path}`}
                                                loading="lazy"
                                                alt={`Gallery Image ${index + 1}`}
                                                className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                                            />

                                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                        <div className='p-5 shadow-lg w-full mx-auto'>
                            <h2 className="text-xl font-bold mt-6">Komentar</h2>
                            <form onSubmit={handleSubmit} className="mt-4">
                                <div>
                                    <label htmlFor="name" className="block">Nama</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="border p-2 w-full"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="border p-2 w-full"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="comment" className="block">Komentar</label>
                                    <div
                                        ref={quillRef}
                                        className="border p-2 w-full h-40 bg-white"
                                    ></div>
                                </div>
                                <button
                                    type="submit"
                                    className="bg-blue-500 rounded-xl text-white px-4 py-2 mt-2"
                                >
                                    Kirim
                                </button>
                            </form>
                            <div className="mt-4">
                                <label htmlFor="sortOrder" className="block">Urutkan Berdasarkan:</label>
                                <select
                                    id="sortOrder"
                                    value={sortOrder}
                                    onChange={(e) => setSortOrder(e.target.value)}
                                    className="border p-2 w-full rounded-lg"
                                >
                                    <option value="newest">Terbaru</option>
                                    <option value="oldest">Terlama</option>
                                </select>
                            </div>
                            {sortComments(comments).map((comment) => (
                                <div key={comment.id} className="border p-2 my-2 rounded-lg">
                                    <div className='flex flex-row gap-4 items-center'>
                                        <p className="font-bold">{comment.name}</p>
                                        <p className='text-sm text-gray-400'>{moment(comment.created_at).format('MMMM Do, YYYY, h:mm A')}</p>
                                    </div>
                                    <p className='prose prose-sm max-w-none' dangerouslySetInnerHTML={{ __html: comment.comment }}></p>
                                </div>
                            ))}
                            {comments.length === 0 && (
                                <p className="text-center text-lg text-gray-400 mt-4">
                                    Jadilah yang pertama berkomentar!
                                </p>
                            )}
                            {props.success && (
                                <div className="text-green-500 mt-4">{props.success}</div>
                            )}
                        </div>
                    </div>
                    {/*side blog*/}
                    <div className='w-[40vw] lg:block hidden'>
                        <h1 className='font-bold mb-3'>Telusuri Blog Terbaru Kami</h1>
                        <input
                            type="text"
                            placeholder="Menelusuri"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="border border-gray-700 rounded p-2 w-full mb-3 text-black"
                        />
                        <ul>
                            {filteredBlogs.map((blogSide) => (
                                <li key={blogSide.id} className='border-b-2 border-gray-400'>
                                    <Link
                                        href={`/blog-page/${blogSide.id}?title=${encodeURIComponent(blogSide.title)}`}
                                        className="cursor-pointer"
                                    >
                                        <div className='flex flex-row items-center gap-4'>
                                            <img
                                                src={`/storage/${blogSide.images[0]?.path}`}
                                                alt={blogSide.title}
                                                className="h-12 w-26 object-cover rounded-md object-center transition duration-200 group-hover:scale-110"
                                            />
                                            <span className='flex flex-col'>
                                                <h1 className='text-sm text-gray-400'>{moment(blogSide.created_at).format('MMMM Do, YYYY, h:mm A')}</h1>
                                                <h2 className="text-md hover:font-bold hover:underline">{blogSide.title}</h2>
                                            </span>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                            {filteredBlogs.length === 0 && (
                                <p className="text-center text-gray-400 mt-4">
                                    Blog tidak ditemukan
                                </p>
                            )}
                        </ul>
                    </div>
                </div>
            </WebsiteLayout>
            {modalImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
                    onClick={closeModal}
                >
                    <div className="relative">
                        <img
                            src={modalImage}
                            alt="Preview"
                            className="max-w-[90vw] motion-preset-blur-up mx-auto max-h-[90vh] object-contain bg-white"
                        />
                        <p className='text-white mx-3'>{blog.title}</p>
                        <button
                            className="absolute top-0 md:block hidden right-0 p-4 text-white text-3xl"
                            onClick={closeModal}
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default Show;
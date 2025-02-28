import React, { useEffect, useState } from 'react'
import { Link } from '@inertiajs/react';
import moment from 'moment';
import { Chip } from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

function Index() {
    const [blogs, setBlogs] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [typeBlog, setTypeBlog] = useState([]);
    const [selectedType, setSelectedType] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const fetchBlog = async () => {
        try {
            const response = await fetch('/api/blogs');
            const data = await response.json();
            console.log(data);
            setBlogs(data);
        } catch (error) {
            console.error('Error fetching Blog:', error);
        }
    }

    const fetchBlogType = async () => {
        try {
            const response = await fetch('/api/blog-types');
            const data = await response.json();
            setTypeBlog(data);
        } catch (error) {
            console.error('Error fetching Blog Type:', error);
        }
    }

    useEffect(() => {
        fetchBlog();
        fetchBlogType();
    }, []);

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const getRandomDarkColor = () => {
        const colors = [
            '#1F1F1F', 
            '#2C3E50', 
            '#34495E', 
            '#4B0082', 
            '#3E2723', 
            '#2E7D32', 
            '#BF360C', 
            '#6A1B9A', 
            '#1976D2', 
            '#C2185B'  
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    const filteredBlogs = blogs.filter((blog) => {
        const matchesSearchQuery = blog.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = selectedType ? blog.blog_type?.type_blog === selectedType : true;
        return matchesSearchQuery && matchesType;
    });

    const handleTypeSelection = (type) => {
        setSelectedType((prevSelectedType) => {
            const newSelectedType = prevSelectedType === type ? null : type;
            if (newSelectedType) {
                setModalMessage(`Anda memilih tipe: ${newSelectedType}`);
                setIsModalOpen(true);
            }
            return newSelectedType;
        });
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className='lg:p-8 p-4'>
            <div className='flex flex-row lg:space-x-5 space-x-0'>
                <div className='flex flex-col w-full'>
                    <div className='mb-4'>
                        <FontAwesomeIcon icon="fa-solid fa-house" className='text-black' />
                        <h1 className='font-bold text-[24px]'>Telusuri Blog Terbaru Kami</h1>
                        <p>Tetap Terinformasi dengan blog terbaru kami</p>
                    </div>
                    {/* untuk filterisasi menggunakan material ui chip */}
                    <div className='flex flex-row gap-2 md:w-[50vw] w-full overflow-x-auto mb-4'>
                        {typeBlog.map((type) => (
                            <Chip
                                key={type.id}
                                value={type.type_blog}
                                style={{ backgroundColor: getRandomDarkColor() }}
                                className={`cursor-pointer ${selectedType === type.type_blog ? 'text-white' : ''
                                    }`}
                                onClick={() => handleTypeSelection(type.type_blog)}
                            />
                        ))}
                    </div>
                    <div className="grid grid-cols-1 w-full sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredBlogs.map((blog) => (
                            <div key={blog.id} className="border rounded-lg shadow">
                                <div 
                                    style={{ backgroundColor: getRandomDarkColor() }}
                                    className='px-2 py-1 absolute mt-2 ml-2 rounded-md'>
                                    {blog.blog_type && (
                                        <h3 className="text-sm text-white">
                                            {blog.blog_type.type_blog || 'tidak ada'}
                                        </h3>
                                    )}
                                </div>
                                <img
                                    src={`/storage/${blog.images[0]?.path}`}
                                    alt={blog.title}
                                    className="w-full h-48 object-cover rounded-t-lg"
                                />
                                <div className="p-4">
                                    <h2 className='text-[#FBB039]'>{blog.author || 'Anonymous'}</h2>
                                    <h1 className='text-[12px] text-gray-400'>{moment(blog.created_at).format('MMMM Do, YYYY, h:mm A')}</h1>
                                    <Link
                                        href={`/blog-page/${blog.id}?title=${encodeURIComponent(blog.title)}`}
                                        className="cursor-pointer"
                                    >
                                        <h2 className="text-lg hover:underline font-bold">{blog.title}</h2>
                                    </Link>
                                    <Link
                                        href={`/blog-page/${blog.id}?title=${encodeURIComponent(blog.title)}`}
                                        className="text-blue-500 hover:underline"
                                    >
                                        Baca selengkapnya
                                    </Link>
                                </div>
                            </div>
                        ))}
                        {filteredBlogs.length === 0 && (
                            <p className="text-center text-gray-400 mt-4">
                                Blog tidak ditemukan
                            </p>
                        )}
                    </div>
                </div>

                {/*side blog*/}
                <div className='w-[40vw] lg:block hidden'>
                    <h1 className='font-bold mb-3'>Telusuri Blog Terbaru</h1>
                    <input
                        type="text"
                        placeholder="Menelusuri"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="border border-gray-700 rounded p-2 w-full mb-3 text-black"
                    />
                    <ul>
                        {filteredBlogs.map((blog) => (
                            <li key={blog.id} className='border-b-2 border-gray-400'>
                                <Link
                                    href={`/blog-page/${blog.id}?title=${encodeURIComponent(blog.title)}`}
                                    className="cursor-pointer"
                                >
                                    <div className='flex flex-row items-center gap-4'>
                                        <img
                                            src={`/storage/${blog.images[0]?.path}`}
                                            alt={blog.title}
                                            className="h-12 w-26 object-cover rounded-md object-center transition duration-200 group-hover:scale-110"
                                        />
                                        <span className='flex flex-col'>
                                            <h1 className='text-sm text-gray-400'>{moment(blog.created_at).format('MMMM Do, YYYY, h:mm A')}</h1>
                                            <h2 className="text-md hover:font-bold hover:underline">{blog.title.substring(0, 50) + (blog.title.length > 50 ? '...' : '')}</h2>
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
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 motion-preset-slide-right rounded shadow-l flex items-center flex-col">
                        <h2 className="font-bold">{modalMessage}</h2>
                        <button onClick={closeModal} className="mt-4 bg-blue-500 text-white p-2 rounded">
                            Ok
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Index
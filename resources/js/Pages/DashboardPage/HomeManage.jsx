import React, { useEffect, useState, useRef } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import IonIcon from '@reacticons/ionicons'
import ProductForm from '@/Components/Admin/Product/ProductForm';
import AboutUsForm from '@/Components/Admin/AboutUsForm';
import PartnershipForm from '@/Components/Admin/PartnershipForm';

const svgImages = import.meta.glob('/public/assets/Images/*.svg', { eager: true });
const pngImages = import.meta.glob('/public/assets/Images/*.png', { eager: true });
const dashboardImages = import.meta.glob('/public/assets/Images/dashboardAssets/*.webp', { eager: true });

const images = { ...svgImages, ...pngImages, ...dashboardImages };

const getImageByName = (name) => {
    const matchingImage = Object.keys(images).find((path) => path.includes(`${name}`));
    return matchingImage ? images[matchingImage].default || images[matchingImage] : null;
};

function HomeManage() {
    const [aboutUs, setAboutUs] = useState([]);
    const [partnerships, setPartnerships] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [selectedAboutUs, setSelectedAboutUs] = useState(null);
    const [selectedPartnership, setSelectedPartnership] = useState(null);
    const [openAboutUsManage, setOpenAboutUsManage] = useState(false);
    const [openPartnership, setOpenPartnership] = useState(false);
    const formRef = useRef(null);

    const toggleOpenAboutUsManage = () => {
        setOpenAboutUsManage(!openAboutUsManage);
        setOpenPartnership(false);
    };

    const toggleOpenPartnership = () => {
        setOpenPartnership(!openPartnership);
        setOpenAboutUsManage(false);
    }

    const fetchAboutUs = async () => {
        try {
            const response = await fetch('/api/aboutus');
            const data = await response.json();
            setAboutUs(data);
        } catch (error) {
            console.error('Error fetching About Us:', error);
        }
    };

    const fetchPartnership = async () => {
        try {
            const response = await fetch('/api/partnership');
            const data = await response.json();
            setPartnerships(data);
        } catch (error) {
            console.error('Error fetching About Us:', error);
        }
    }

    const handleEditAboutUs = (item) => {
        setSelectedAboutUs(item);
        if (formRef.current) {
            formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const handleEditPartnership = (partnership) => {
        setSelectedPartnership(partnership);
        if (formRef.current) {
            formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    useEffect(() => {
        fetchAboutUs();
        fetchPartnership();
    }, [refresh]);

    const handleDeleteAboutUs = async (aboutUsId) => {
        if (window.confirm('Are you sure you want to delete this About Us item?')) {
            try {
                const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
                await fetch(`/api/aboutus/${aboutUsId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': csrfToken,
                    },
                });
                alert('About Us item deleted successfully!');
                setRefresh(!refresh);
            } catch (error) {
                console.error('Error deleting About Us item:', error);
                alert('Failed to delete About Us item. Please try again.');
            }
        }
    };

    const handleDeletePartnership = async (partnershipId) => {
        if (window.confirm('Are you sure you want to delete this Partnership item?')) {
            try {
                const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
                await fetch(`/api/partnership/${partnershipId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': csrfToken,
                    },
                });
                alert('Partnership item deleted successfully!');
                setRefresh(!refresh);
            } catch (error) {
                console.error('Error deleting About Us item:', error);
                alert('Failed to delete Partnership item. Please try again.');
            }
        }
    };
    return (
        <>
            <AuthenticatedLayout
                header={
                    <h2 className="text-2xl font-bold text-white">
                        Content Management
                    </h2>
                }
            >
                <Head title="Home Management" />
                <div className="p-6 bg-white text-black min-h-screen">
                    <div className='grid lg:grid-cols-3 grid-cols-1 h-[350px] gap-4 px-0 py-3'>
                        <div
                            onClick={toggleOpenAboutUsManage}
                            className="relative rounded-[22px] cursor-pointer bg-gradient-to-r from-purple-600 to-blue-600 h-auto w-auto text-white overflow-hidden"
                        >
                            <div className="absolute inset-0">
                                <div className="absolute inset-0 bg-black opacity-50"></div>
                            </div>
                            <div className="relative z-10 lg:p-20 p-0 flex flex-col justify-center h-full space-y-20">
                                <div className=" flex mt-0 flex-col justify-center lg:space-y-10 space-y-3 text-center">
                                    <div
                                        className={`relative text-white hover:font-bold cursor-pointer transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-white before:origin-center before:h-[1px] motion motion-preset-shrink motion-delay-[100ms] before:w-0 ${openAboutUsManage ? 'before:w-[50%]' : ''
                                            } before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-white after:origin-center after:h-[1px] after:w-0 ${openAboutUsManage ? 'after:w-[50%]' : ''
                                            } after:bottom-0 after:right-[50%]`}>
                                        <span className="lg:text-[30px] text-[23px]">About us Management</span>
                                    </div>
                                    <div className="relative mx-auto animate-bounce">
                                        <IonIcon className="text-white text-[30px]" name="caret-down-outline" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            onClick={toggleOpenPartnership}
                            className="relative rounded-[22px] cursor-pointer bg-gradient-to-r from-purple-600 to-blue-600 h-auto w-auto text-white overflow-hidden">
                            <div class="absolute inset-0">
                                <img src="https://images7.alphacoders.com/103/thumb-1920-1037113.jpg" alt="Background Image" class="object-cover object-center w-full h-full" />
                                <div class="absolute inset-0 bg-black opacity-50"></div>
                            </div>
                            <div class="relative z-10 lg:p-20 p-0 flex flex-col justify-center h-full space-y-20">
                                <div className="flex mt-0 flex-col justify-center lg:space-y-10 space-y-3 text-center">
                                    <div
                                        className={`relative text-white hover:font-bold cursor-pointer transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-white before:origin-center before:h-[1px] motion motion-preset-shrink motion-delay-[200ms] before:w-0 ${openPartnership ? 'before:w-[50%]' : ''
                                            } before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-white after:origin-center after:h-[1px] after:w-0 ${openPartnership ? 'after:w-[50%]' : ''
                                            } after:bottom-0 after:right-[50%]`}>
                                        <span className="lg:text-[30px] text-[23px]">Partnership Management</span>
                                    </div>
                                    <div className="relative mx-auto animate-bounce">
                                        <IonIcon className="text-white text-[30px]" name="caret-down-outline" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {openAboutUsManage && (
                        <div>
                            <div ref={formRef}>
                                <AboutUsForm
                                    aboutUs={selectedAboutUs}
                                    onClose={() => setSelectedAboutUs(null)}
                                    onUpdate={() => setRefresh(!refresh)}
                                />
                            </div>
                            <div className="my-6">
                                <h3 className="text-xl font-semibold mb-4">About Us List</h3>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full bg-gray-800 text-white rounded-lg shadow-md">
                                        <thead>
                                            <tr className="bg-gray-700 text-left">
                                                <th className="py-3 px-4">Title</th>
                                                <th className="py-3 px-4">Description</th>
                                                <th className="py-3 px-4">Images</th>
                                                <th className="py-3 px-4">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {aboutUs.map((item) => (
                                                <tr key={item.id} className="border-t border-gray-700 hover:bg-gray-700">
                                                    <td className="py-3 px-4">{item.title}</td>
                                                    <td className="py-3 px-4">{item.description}</td>
                                                    <td className="py-3 px-4 flex flex-col space-y-2">
                                                        {['image1', 'image2', 'image3'].map((key) => (
                                                            <img
                                                                key={key}
                                                                src={item[key] ? `/storage/${item[key]}` : '/placeholder.png'}
                                                                alt={`Image ${key}`}
                                                                width="50"
                                                                className="border rounded"
                                                            />
                                                        ))}
                                                    </td>
                                                    <td className="py-3 px-4 items-center space-y-2">
                                                        <button
                                                            onClick={() => handleEditAboutUs(item)}
                                                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteAboutUs(item.id)}
                                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    {aboutUs.length === 0 && (
                                        <p className="text-center text-gray-400 mt-4">
                                            No About Us items found.
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                    {openPartnership && (
                        <div>
                            <div ref={formRef}>
                                <PartnershipForm
                                    Partnership={selectedPartnership}
                                    onClose={() => setSelectedPartnership(null)}
                                    onUpdate={() => setRefresh(!refresh)}
                                />
                            </div>
                            <div className="my-6">
                                <h3 className="text-xl font-semibold mb-4">About Us List</h3>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full bg-gray-800 text-white rounded-lg shadow-md">
                                        <thead>
                                            <tr className="bg-gray-700 text-left">
                                                <th className="py-3 px-4">Title</th>
                                                <th className="py-3 px-4">Description</th>
                                                <th className="py-3 px-4">Images</th>
                                                <th className="py-3 px-4">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {partnerships.map((partnership) => (
                                                <tr key={partnership.id} className="border-t border-gray-700 hover:bg-gray-700">
                                                    <td className="py-3 px-4">{partnership.title}</td>
                                                    <td className="py-3 px-4">{partnership.description}</td>
                                                    <td className="py-3 px-4 flex flex-col space-y-2">
                                                        <img
                                                            src={`/storage/${partnership.image}`}
                                                            alt={`Image ${partnership.title}`}
                                                            width="50"
                                                            className="border rounded"
                                                        />
                                                    </td>
                                                    <td className="py-3 px-4 items-center space-y-2">
                                                        <button
                                                            onClick={() => handleEditPartnership(partnership)}
                                                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeletePartnership(partnership.id)}
                                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    {partnerships.length === 0 && (
                                        <p className="text-center text-gray-400 mt-4">
                                            No partnerships items found.
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </AuthenticatedLayout>
        </>
    );
}

export default HomeManage;
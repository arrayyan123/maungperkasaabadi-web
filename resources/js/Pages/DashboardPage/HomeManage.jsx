import React, { useEffect, useState, useRef } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import IonIcon from '@reacticons/ionicons'
import ProductForm from '@/Components/Admin/Product/ProductForm';
import AboutUsForm from '@/Components/Admin/AboutUsForm';
import PartnershipForm from '@/Components/Admin/PartnershipForm';
import WhyChooseForm from '@/Components/Admin/WhyChooseForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
    const [whyContent, setWhyContent] = useState([])
    const [selectedWhyContent, setSelectedWhyContent] = useState(null)
    const [selectedPartnership, setSelectedPartnership] = useState(null);
    const [currentTab, setCurrentTab] = useState("aboutusmanage");
    const tabs = [
        { label: "About Us Manage", value: "aboutusmanage" },
        { label: "Partnership Manage", value: "partnershipmanage" },
        { label: "'Why Choose' Manage", value: "whychoosemanage" },
    ];

    const formRef = useRef(null);

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
            console.error('Error fetching Partnership:', error);
        }
    }

    const fetchWhyContent = async () => {
        try {
            const response = await fetch('/api/whycontents');
            const data = await response.json();
            setWhyContent(data)
        } catch (error) {
            console.error('Error fetching "Why Content"', error);
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

    const handleEditWhyContent = (content) => {
        setSelectedWhyContent(content);
        if (formRef.current) {
            formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    useEffect(() => {
        fetchAboutUs();
        fetchPartnership();
        fetchWhyContent();
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
                <Head title="Content Management" />
                <div className="mx-auto w-full sm:px-4 lg:px-5 py-5 bg-white text-black min-h-screen">
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
                    {currentTab === 'aboutusmanage' && (
                        <div className="mt-4">
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
                                    <table className="min-w-full text-black rounded-lg shadow-md">
                                        <thead>
                                            <tr className="text-left">
                                                <th className="py-3 px-4">Title</th>
                                                <th className="py-3 px-4">Description</th>
                                                <th className="py-3 px-4">Images</th>
                                                <th className="py-3 px-4">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {aboutUs.map((item) => (
                                                <tr key={item.id} className="border-t border-gray-700">
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
                    {currentTab === 'partnershipmanage' && (
                        <div className="mt-4">
                            <div ref={formRef}>
                                <PartnershipForm
                                    Partnership={selectedPartnership}
                                    onClose={() => setSelectedPartnership(null)}
                                    onUpdate={() => setRefresh(!refresh)}
                                />
                            </div>
                            <div className="my-6">
                                <h3 className="text-xl font-semibold mb-4">Partnership List</h3>
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
                    {currentTab === 'whychoosemanage' && (
                        <div>
                            <div ref={formRef}>
                                <WhyChooseForm
                                    content={selectedWhyContent}
                                    onUpdate={() => setSelectedWhyContent(null)}
                                    onClose={() => setRefresh(!refresh)}
                                />
                            </div>
                            <div className="my-6">
                                <h3 className="text-xl font-semibold mb-4">Why Content List</h3>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full bg-gray-800 text-white rounded-lg shadow-md">
                                        <thead>
                                            <tr className="bg-gray-700 text-left">
                                                <th className="py-3 px-4">Title</th>
                                                <th className="py-3 px-4">Description</th>
                                                <th className="py-3 px-4">Icon</th>
                                                <th className="py-3 px-4">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {whyContent.map((content) => (
                                                <tr key={content.id} className="border-t border-gray-700 hover:bg-gray-700">
                                                    <td className="py-3 px-4">{content.title}</td>
                                                    <td className="py-3 px-4">{content.description}</td>
                                                    <td className="py-3 px-4 flex flex-col space-y-2">
                                                        
                                                        <FontAwesomeIcon icon={`fa-solid ${content.icon_code}`} className="" />
                                                    </td>
                                                    <td className="py-3 px-4 items-center space-y-2">
                                                        <button
                                                            onClick={() => handleEditWhyContent(content)}
                                                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            //onClick={() => handleDeletePartnership(content.id)}
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
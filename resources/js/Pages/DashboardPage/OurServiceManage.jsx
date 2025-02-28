import React, { useState, useEffect, useRef } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import moment from 'moment';
import OurServiceForm from '@/Components/Admin/OurServiceForm';
import { Head } from '@inertiajs/react';

function OurServiceManage() {
    const [services, setServices] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const formRef = useRef(null);

    const fetchService = async () => {
        try {
            const response = await fetch('/api/services');
            const data = await response.json();
            setServices(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    const handleDeleteService = async (serviceId) => {
        if (window.confirm('Are you sure you want to delete this Service?')) {
            try {
                const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
                await fetch(`/api/services/${serviceId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': csrfToken,
                    },
                });
                alert('Service deleted successfully!');
                setRefresh(!refresh);
            } catch (error) {
                console.error('Error deleting Service:', error);
                alert('Failed to delete Service. Please try again.');
            }
        }
    };

    const handleEditService = (item) => {
        setSelectedService(item);
        if (formRef.current) {
            formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    useEffect(() => {
        fetchService()
    }, [refresh])
    return (
        <div>
            <AuthenticatedLayout
                header={
                    <h2 className="text-2xl font-bold text-white">
                        Services Management
                    </h2>
                }
            >
                <Head title="Service Management" />
                <div className="p-6 min-h-screen">
                    <div ref={formRef}>
                        <OurServiceForm
                            OurService={selectedService}
                            onClose={() => setSelectedService(null)}
                            onUpdate={() => setRefresh(!refresh)}
                        />
                    </div>
                    <div className="my-6">
                        <h3 className="text-xl font-semibold mb-4">Link Website List</h3>
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
                                    {services.map((item) => (
                                        <tr key={item.id} className="border-t border-gray-700 hover:bg-gray-700">
                                            <td className="py-3 px-4">{item.title}</td>
                                            <td className="py-3 px-4"><a href={item.link_web} target="_blank">{item.link_web}</a></td>
                                            <td className="py-3 px-4 flex flex-col space-y-2">
                                                <img
                                                    src={`/storage/${item.image}`}
                                                    alt={`Image ${item.title}`}
                                                    width="50"
                                                    className="border rounded"
                                                />
                                            </td>
                                            <td className="py-3 px-4 items-center space-y-2">
                                                <button
                                                    onClick={() => handleEditService(item)}
                                                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteService(item.id)}
                                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {services.length === 0 && (
                                <p className="text-center text-gray-400 mt-4">
                                    No services web items found.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </div>
    )
}

export default OurServiceManage
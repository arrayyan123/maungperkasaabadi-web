import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import IonIcon from '@reacticons/ionicons'
import TeamMemberForm from '@/Components/Admin/TeamMemberForm';

function AboutUsManage() {
    const [selectedTeamMember, setSelectedTeamMember] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const [teams, setTeams] = useState([]);


    const fetchTeams = async () => {
        try {
            const response = await fetch('/teams');
            const data = await response.json();
            setTeams(data);
        } catch (error) {
            console.error('Error fetching About Us:', error);
        }
    };

    useEffect(() => {
        fetchTeams();
    }, [refresh]);

    const handleEditTeams = (item) => {
        setSelectedTeamMember(item);
    };

    const handleDeleteTeams = async (memberId) => {
        if (window.confirm('Are you sure you want to delete this About Us item?')) {
            try {
                const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
                await fetch(`/aboutus/${memberId}`, {
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

    return (
        <>
            <AuthenticatedLayout
                header={
                    <h2 className="text-2xl font-bold text-white">
                        Dashboard - About us Management
                    </h2>
                }
            >
                <Head title="About us Management" />
                <div className='p-6 bg-gradient-to-b from-gray-800 to-gray-900 text-white min-h-screen'>
                    <TeamMemberForm
                        Teams={selectedTeamMember}
                        onClose={() => setSelectedTeamMember(null)}
                        onUpdate={() => setRefresh(!refresh)}
                    />
                    <div className="my-6">
                        <h3 className="text-xl font-semibold mb-4">Team Member List</h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-gray-800 text-white rounded-lg shadow-md">
                                <thead>
                                    <tr className="bg-gray-700 text-left">
                                        <th className="py-3 px-4">Name</th>
                                        <th className="py-3 px-4">Position</th>
                                        <th className="py-3 px-4">Description</th>
                                        <th className="py-3 px-4">Images</th>
                                        <th className="py-3 px-4">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {teams.map((item) => (
                                        <tr key={item.id} className="border-t border-gray-700 hover:bg-gray-700">
                                            <td className="py-3 px-4">{item.name}</td>
                                            <td className="py-3 px-4">{item.position}</td>
                                            <td className="py-3 px-4">{item.description}</td>
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
                                                    onClick={() => handleEditTeams(item)}
                                                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteTeams(item.id)}
                                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {teams.length === 0 && (
                                <p className="text-center text-gray-400 mt-4">
                                    No Team member items found.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    )
}

export default AboutUsManage
import React, { useEffect, useState, useRef } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import IonIcon from '@reacticons/ionicons'
import TeamMemberForm from '@/Components/Admin/TeamMemberForm';

function AboutUsManage() {
    const [selectedTeamMember, setSelectedTeamMember] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const [teams, setTeams] = useState([]);
    const formRef = useRef(null);

    const fetchTeams = async () => {
        try {
            const response = await fetch('/api/teams');
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
        if (formRef.current) {
            formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const handleDeleteTeams = async (memberId) => {
        if (window.confirm('Are you sure you want to delete this Team Member?')) {
            try {
                const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
                await fetch(`/api/teams/${memberId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': csrfToken,
                    },
                });
                alert('Team Member deleted successfully!');
                setRefresh(!refresh);
            } catch (error) {
                console.error('Error deleting Team Member:', error);
                alert('Failed to delete Team Member. Please try again.');
            }
        }
    };

    return (
        <>
            <AuthenticatedLayout
                header={
                    <h2 className="text-2xl font-bold text-white">
                        Team Management
                    </h2>
                }
            >
                <Head title="Team Management" />
                <div className='p-6 min-h-screen'>
                    <div ref={formRef}>
                        <TeamMemberForm
                            Teams={selectedTeamMember}
                            onClose={() => setSelectedTeamMember(null)}
                            onUpdate={() => setRefresh(!refresh)}
                        />
                    </div>
                    <div className="my-6">
                        <h3 className="text-xl font-semibold mb-4">Team Member List</h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-black rounded-lg shadow-md">
                                <thead>
                                    <tr className="text-left">
                                        <th className="py-3 px-4">Name</th>
                                        <th className="py-3 px-4">Position</th>
                                        <th className="py-3 px-4">Description</th>
                                        <th className="py-3 px-4">Images</th>
                                        <th className="py-3 px-4">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {teams.map((item) => (
                                        <tr key={item.id} className="border-t border-gray-700 ">
                                            <td className="py-3 px-4">{item.name}</td>
                                            <td className="py-3 px-4">{item.position}</td>
                                            <td className="py-3 px-4">
                                                <div
                                                    className="prose prose-sm max-w-none text-black"
                                                    dangerouslySetInnerHTML={{ __html: item.description.substring(0, 100) + (item.description.length > 100 ? '...' : '') }}
                                                />
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
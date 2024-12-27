import React, { useState, useRef } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import moment from 'moment';
import IonIcon from '@reacticons/ionicons';

function ContactManage({ contacts }) {
    const [reply, setReply] = useState('');
    const [selectedContact, setSelectedContact] = useState(null);
    const [selectedContacts, setSelectedContacts] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [filters, setFilters] = useState({ name: '', email: '', created_at: '' }); 
    const { post, processing } = useForm();
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    const handleReply = (e, id) => {
        e.preventDefault();
        fetch(`/admin/contacts/${id}/reply`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
            },
            body: JSON.stringify({ reply }),
        })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.error('Error:', error));
    };

    const deleteSelectedMessages = async () => {
        try {
            await Promise.all(
                selectedContacts.map((id) =>
                    fetch(`/admin/contacts/${id}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-CSRF-TOKEN': csrfToken,
                        },
                    })
                )
            );
            alert('Selected messages deleted successfully!');
            setSelectedContacts([]);
            setShowDeleteModal(false);
            window.location.reload();
        } catch (error) {
            console.error('Error deleting selected messages:', error);
            alert('Failed to delete selected messages.');
        }
    };

    const toggleMessageSelection = (id) => {
        setSelectedContacts((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((msgId) => msgId !== id)
                : [...prevSelected, id]
        );
    };

    const toggleSelectAll = () => {
        if (selectedContacts.length === contacts.length) {
            setSelectedContacts([]);
        } else {
            setSelectedContacts(contacts.map((contact) => contact.id));
        }
    };

    const isAllSelected = selectedContacts.length === contacts.length && contacts.length > 0;

    const renderContactDetails = () => {
        if (!selectedContact) {
            return (
                <div className="flex items-center justify-center h-full text-gray-500">
                    <p>Select a message to view its details.</p>
                </div>
            );
        }

        return (
            <div className="p-4 overflow-y-auto min-h-[45vh]">
                <h1 className="text-xl font-semibold text-gray-700">
                    Product Name: {selectedContact.subject || 'N/A'}
                </h1>
                <p className="text-sm text-gray-500 mb-2">
                    From: {selectedContact.name} ({selectedContact.email})
                </p>
                <p className="text-gray-700 mb-4">
                    Created at: {moment(selectedContact.created_at).format('MMMM Do, YYYY, h:mm A')}
                </p>
                <h2 className="text-sm text-gray-700">{selectedContact.message}</h2>
            </div>
        );
    };

    const filteredContacts = contacts.filter((contact) => {
        const { name, email, created_at } = filters;
        const matchesName = name
            ? contact.name.toLowerCase().includes(name.toLowerCase())
            : true;
        const matchesEmail = email
            ? contact.email.toLowerCase().includes(email.toLowerCase())
            : true;
        const matchesDate = created_at
            ? moment(contact.created_at).format('YYYY-MM-DD') === created_at
            : true;

        return matchesName && matchesEmail && matchesDate;
    });

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
    };

    return (
        <>
            <AuthenticatedLayout
                header={
                    <h2 className="text-2xl font-bold text-white">
                        Dashboard - Contact Management
                    </h2>
                }
            >
                <Head title="Contact Management" />
                <div className="min-h-screen">
                    <div className="flex">
                        {/* Contact List */}
                        <div className="p-0  w-full text-black min-h-screen">
                            <div className='px-6 pt-8'>
                                <h1 className="text-2xl font-bold mb-5">Contacts</h1>
                                <div className="flex flex-col md:flex-row gap-4 mb-5">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Filter by Name"
                                        value={filters.name}
                                        onChange={handleFilterChange}
                                        className="border border-gray-300 rounded-md p-2 flex-1"
                                    />
                                    <input
                                        type="text"
                                        name="email"
                                        placeholder="Filter by Email"
                                        value={filters.email}
                                        onChange={handleFilterChange}
                                        className="border border-gray-300 rounded-md p-2 flex-1"
                                    />
                                    <input
                                        type="date"
                                        name="created_at"
                                        value={filters.created_at}
                                        onChange={handleFilterChange}
                                        className="border border-gray-300 rounded-md p-2 flex-1"
                                    />
                                </div>
                                <div className="flex lg:flex-row flex-col lg:space-y-0 space-y-3 items-center justify-between mb-4">
                                    <button
                                        onClick={toggleSelectAll}
                                        className="px-4 py-2 bg-blue-500 text-white rounded-md"
                                    >
                                        {isAllSelected ? 'Deselect All' : 'Select All'}
                                    </button>
                                    <button
                                        onClick={() => setShowDeleteModal(true)}
                                        className={`px-4 py-2 bg-red-500 text-white rounded-md ${selectedContacts.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
                                            }`}
                                        disabled={selectedContacts.length === 0}
                                    >
                                        <span className='flex flex-row space-x-2 items-center'>
                                            <IonIcon name='trash' /> <p>Selected ({selectedContacts.length})</p>
                                        </span>
                                    </button>
                                </div>
                            </div>

                            <div className="mt-8 flex lg:flex-row flex-col">
                                {/* Contact List */}
                                <section className="w-full lg:w-1/3 border-r bg-white overflow-y-auto lg:max-h-[76vh] md:max-h-[77vh] sm:max-h-[28vh] max-h-[26vh]">
                                    <div>
                                        {filteredContacts.map((contact) => (
                                            <div
                                                key={contact.id}
                                                className={`p-4 border-b cursor-pointer ${selectedContact?.id === contact.id
                                                    ? 'bg-blue-50'
                                                    : 'hover:bg-gray-100'
                                                    }`}
                                            >
                                                <div className="flex items-center overflow-hidden">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedContacts.includes(contact.id)}
                                                        onChange={() => toggleMessageSelection(contact.id)}
                                                        className="mr-2"
                                                    />
                                                    <div
                                                        onClick={() => setSelectedContact(contact)}
                                                        className="flex justify-between items-center w-full"
                                                    >
                                                        <div>
                                                            <h3 className="text-sm font-semibold text-gray-700">
                                                                {contact.name}
                                                            </h3>
                                                            <p className="text-xs text-gray-500 truncate">
                                                                {contact.message}
                                                            </p>
                                                            <p className="text-xs text-gray-500 truncate">
                                                                {moment(contact.created_at).format('MMMM Do, YYYY, h:mm A')}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                {/* Contact Details */}
                                <section className="flex-1 bg-gray-50 flex-shrink-0">
                                    {renderContactDetails()}
                                </section>
                            </div>
                            {selectedContact && (
                                <div className="mt-8 p-4">
                                    <h2 className="text-xl font-semibold mb-4">
                                        Reply to {selectedContact.name} ({selectedContact.email})
                                    </h2>
                                    <ReactQuill
                                        value={reply}
                                        onChange={setReply}
                                        className="border border-gray-300 rounded-md"
                                        theme="snow"
                                    />
                                    <button
                                        onClick={(e) => handleReply(e, selectedContact.id)}
                                        disabled={processing}
                                        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
                                    >
                                        Send Reply
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Delete Confirmation Modal */}
                        {showDeleteModal && (
                            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
                                    <p className="text-lg">Are you sure you want to delete selected messages?</p>
                                    <div className="mt-4 flex justify-end space-x-4">
                                        <button
                                            onClick={deleteSelectedMessages}
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
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}

export default ContactManage;
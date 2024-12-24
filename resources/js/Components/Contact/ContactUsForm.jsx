import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';

const ContactUsForm = () => {
    const { data, setData, post, processing, reset } = useForm({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/contact-us', {
            onSuccess: () => reset(),
        });
    };

    return (
        <div className="max-w-md mx-auto my-10 text-black ">
            <h1 className="text-2xl text-center font-bold mb-5">Contact Us</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className="w-full border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        className="w-full border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Subject</label>
                    <input
                        type="text"
                        value={data.subject}
                        onChange={(e) => setData('subject', e.target.value)}
                        className="w-full border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Message</label>
                    <textarea
                        value={data.message}
                        onChange={(e) => setData('message', e.target.value)}
                        className="w-full border-gray-300 rounded-md"
                        rows="4"
                        required
                    ></textarea>
                </div>
                <button
                    type="submit"
                    disabled={processing}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                    Send Message
                </button>
            </form>
        </div>
    );
};

export default ContactUsForm;
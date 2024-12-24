import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import IonIcon from '@reacticons/ionicons';

const webMFile = import.meta.glob('/public/assets/Images/*.webm', { eager: true });

const images = { ...webMFile };

const getImageByName = (name) => {
    const matchingImage = Object.keys(images).find((path) => path.includes(`${name}`));
    return matchingImage ? images[matchingImage].default || images[matchingImage] : null;
};

const checkmark = getImageByName('checkmark')

const ContactUsForm = () => {
    const [showModal, setShowModal] = useState(false);
    const { data, setData, post, processing, reset } = useForm({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/contact-us', {
            onSuccess: () => {
                reset();
                setShowModal(true);
                setTimeout(() => setShowModal(false), 10000);
            },
        });
    };

    return (
        <div className="w-full my-10 text-black ">
            <div className='flex lg:flex-row flex-col gap-5 items-center'>
                <div className='w-full flex flex-col space-y-4'>
                    <h1 className='text-5xl text-black font-extrabold'>Contact Us</h1>
                    <p>
                        Kami siap membantu Anda! Jangan ragu untuk menghubungi kami jika Anda memiliki pertanyaan, membutuhkan informasi lebih lanjut, atau ingin berdiskusi mengenai layanan kami. Tim kami akan dengan senang hati memberikan solusi terbaik untuk kebutuhan Anda.
                    </p>
                    <span className='flex flex-row items-center space-x-4'>
                        <IonIcon name='call' />
                        <p>0882-1167-5711</p>
                    </span>
                    <span className='flex flex-row items-center space-x-4'>
                        <IonIcon name='mail' />
                        <p>maungperkasaabadi@gmail.com</p>
                    </span>
                </div>
                {/* Form Contact us */}
                <div className='bg-gray-100 p-4 w-full shadow-2xl rounded-3xl'>
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
                            className={`flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded-md ${
                                processing ? 'opacity-70 cursor-not-allowed' : ''
                            }`}
                        >
                            {processing ? (
                                <>
                                    <svg
                                        className="animate-spin h-5 w-5 mr-2 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                        ></path>
                                    </svg>
                                    Sending...
                                </>
                            ) : (
                                'Send Message'
                            )}
                        </button>
                    </form>
                </div>
            </div>
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        <video
                            className="mx-auto mb-4"
                            width="100"
                            height="100"
                            autoPlay
                            muted
                            onEnded={() => setShowModal(false)}
                        >
                            <source src={checkmark} type="video/webm" />
                            Your browser does not support the video tag.
                        </video>
                        <h2 className="text-xl font-semibold text-green-600">Success!</h2>
                        <p>Your message has been sent successfully.</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContactUsForm;
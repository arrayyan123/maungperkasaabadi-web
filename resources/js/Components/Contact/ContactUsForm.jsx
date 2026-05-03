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
        post('/api/contact-us', {
            onSuccess: () => {
                reset();
                setShowModal(true);
                setTimeout(() => setShowModal(false), 10000);
            },
        });
    };

    return (
        <div className="w-full py-44 px-4 md:px-8 bg-[#1f2937]">
            <div className="flex flex-col lg:flex-row gap-10 items-start mx-auto">
                {/* Contact Info */}
                <div className="w-full lg:w-1/2 mb-8 lg:mb-0 flex flex-col gap-6">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white">
                        Contact Us
                    </h1>
                    <p className="text-base md:text-lg text-white/80">
                        Kami siap membantu Anda! Jangan ragu untuk menghubungi kami jika Anda memiliki pertanyaan, membutuhkan informasi lebih lanjut, atau ingin berdiskusi mengenai layanan kami. Tim kami akan dengan senang hati memberikan solusi terbaik untuk kebutuhan Anda.
                    </p>
                    <div className="flex flex-col gap-4 mt-2">
                        <div className="flex items-center gap-3">
                            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#b87d58]/10">
                                <IonIcon name="call" className="text-2xl" style={{ color: "#b87d58" }} />
                            </span>
                            <a href="tel:088211675711" className="text-lg font-semibold text-white hover:underline">0882-1167-5711</a>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#b87d58]/10">
                                <IonIcon name="mail" className="text-2xl" style={{ color: "#b87d58" }} />
                            </span>
                            <a href="mailto:maungperkasaabadi@gmail.com" className="text-lg font-semibold text-white hover:underline">maungperkasaabadi@gmail.com</a>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="w-full lg:w-1/2 bg-white border border-[#b87d58]/30 shadow-xl rounded-2xl p-6 md:p-10">
                    <h2 className="text-2xl font-bold text-center mb-6" style={{ color: "#b87d58" }}>
                        Kirim Pesan
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold mb-1 text-[#1f2937]">Name</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-[#b87d58]/30 focus:ring-2 focus:ring-[#b87d58] focus:outline-none text-base placeholder-[#b87d58]/40 transition"
                                placeholder="Nama lengkap"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-1 text-[#1f2937]">Email</label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={e => setData('email', e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-[#b87d58]/30 focus:ring-2 focus:ring-[#b87d58] focus:outline-none text-base placeholder-[#b87d58]/40 transition"
                                placeholder="Email aktif Anda"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-1 text-[#1f2937]">Subject</label>
                            <input
                                type="text"
                                value={data.subject}
                                onChange={e => setData('subject', e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-[#b87d58]/30 focus:ring-2 focus:ring-[#b87d58] focus:outline-none text-base placeholder-[#b87d58]/40 transition"
                                placeholder="Subjek pesan"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-1 text-[#1f2937]">Message</label>
                            <textarea
                                value={data.message}
                                onChange={e => setData('message', e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-[#b87d58]/30 focus:ring-2 focus:ring-[#b87d58] focus:outline-none text-base placeholder-[#b87d58]/40 transition resize-none"
                                placeholder="Tulis pesan Anda..."
                                rows="5"
                                required
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            disabled={processing}
                            className={`w-full flex items-center justify-center gap-2 bg-[#b87d58] hover:bg-[#a06c4b] text-white px-6 py-3 rounded-lg font-bold text-base transition-all duration-200 shadow-md
                                ${processing ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
                            `}
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
                                    Mengirim...
                                </>
                            ) : (
                                <>
                                    Kirim Pesan
                                    <IonIcon name="send" />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>

            {/* Modal Success */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-[#1f2937]/40 z-50">
                    <div className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-xs w-full border border-[#b87d58]/20">
                        <video
                            className="mx-auto mb-3"
                            width="80"
                            height="80"
                            autoPlay
                            muted
                            onEnded={() => setShowModal(false)}
                        >
                            <source src={checkmark} type="video/webm" />
                            Your browser does not support the video tag.
                        </video>
                        <h2 className="text-xl font-bold mb-2 text-[#1f2937]">Pesan Terkirim!</h2>
                        <p className="text-[#1f2937]/80">Terima kasih, kami akan segera menghubungi Anda kembali.</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContactUsForm;
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import react, { useState, useEffect } from 'react';
import moment from 'moment';


export default function Dashboard({ auth }) {
    const [messages, setMessages] = useState([]);

    const fetchMessage = async () => {
        try {
            const response = await fetch('/api/admin/contacts', {
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Accept': 'application/json',
                },
            });
            const data = await response.json();
            setMessages(data.slice(0, 3));
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    useEffect(() => {
        fetchMessage();
    }, []);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-2xl font-semibold leading-tight text-white">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12 px-4">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            Selamat Datang! {auth.user.name}
                        </div>
                    </div>
                    <div className="my-3">
                        <h1 className="text-lg font-bold text-black">Pesan Baru</h1>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {messages.map((item) => (
                            <div
                                key={item.id}
                                className="p-4 bg-white shadow rounded-xl border motion-preset-shrink"
                            >
                                <h2 className="text-sm font-semibold text-gray-700">
                                    {item.name} ({item.email})
                                </h2>
                                <p className="text-sm text-gray-500">
                                    {moment(item.created_at).format('MMMM Do, YYYY, h:mm A')}
                                </p>
                                <p className="mt-2 text-gray-700">{item.message.substring(0, 50) + (item.message.length > 50 ? '...' : '')}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

import React, { useState, useEffect } from 'react'
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons'; 
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(fas, far, fab);

function WhyChoose() {
    const [whyContent, setWhyContent] = useState([]);

    const fetchWhyContent = async () => {
        try {
            const response = await fetch('/api/whycontents');
            const data = await response.json();
            setWhyContent(data)
        } catch (error) {
            console.error('Error fetching "Why Content"', error);
        }
    }
    
    useEffect(() => {
        fetchWhyContent();
    }, []);
    return (
        <div>
            <section class="">
                <div class="py-12 bg-white">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div class="lg:text-center">
                            <h2
                                class="font-heading mb-4 bg-orange-100 text-orange-800 px-4 py-2 rounded-lg md:w-64 md:mx-auto text-xs font-semibold tracking-widest text-black uppercase title-font">
                                Kenapa Memilih Kami?
                            </h2>
                            <p class="font-heading mt-2 text-3xl leading-8 font-semibold tracking-tight text-gray-900 sm:text-4xl">
                                We know tech, we know finance. We are fintech experts.
                            </p>
                            <p class="mt-4 max-w-5xl text-lg text-gray-500 lg:mx-auto">
                                Kami adalah perusahaan yang bergerak di berbagai bidang, mencakup layanan IT dan Non-IT. Dengan keahlian yang luas, kami menyediakan solusi terbaik mulai dari pengembangan teknologi hingga layanan profesional di berbagai sektor. Komitmen kami adalah memberikan pelayanan unggul yang mendukung kebutuhan bisnis Anda.
                            </p>
                        </div>

                        <div class="mt-10">
                            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                                {whyContent.map((content) => (
                                    <div key={content.id} class="relative">
                                        <div>
                                            <div
                                                className="absolute flex items-center justify-center h-12 w-12 rounded-md text-black">
                                                <FontAwesomeIcon 
                                                    icon={`fa-solid ${content.icon_code}`}  
                                                    className='text-[40px]'
                                                />
                                            </div>
                                            <p className="font-heading ml-16 text-lg leading-6 font-bold text-gray-700">{content.title}</p>
                                        </div>
                                        <div className="mt-2 ml-16 text-base text-gray-500">
                                            {content.description}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default WhyChoose
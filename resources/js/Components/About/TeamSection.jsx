import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import IonIcon from '@reacticons/ionicons';

import 'swiper/css';
import 'swiper/css/pagination';

import { Pagination, Navigation } from 'swiper/modules';

const svgImages = import.meta.glob('/public/assets/Images/*.svg', { eager: true });
const pngImages = import.meta.glob('/public/assets/Images/*.png', { eager: true });
const jpgImages = import.meta.glob('/public/assets/Images/*.jpg', { eager: true });

const images = { ...svgImages, ...pngImages, ...jpgImages };

const getImageByName = (name) => {
    const matchingImage = Object.keys(images).find((path) => path.includes(`${name}`));
    return matchingImage ? images[matchingImage].default || images[matchingImage] : null;
};

const pattern = getImageByName('pattern_about_us');

function TeamSection() {
    const swiperRef = useRef(null);
    const [slides, setSlides] = useState([]);
    const [teams, setTeams] = useState([]);

    const fetchTeams = async () => {
        try {
            const response = await fetch('/api/teams');
            const data = await response.json();
            setSlides(data);
        } catch (error) {
            console.error('Error fetching About Us:', error);
        }
    };
    useEffect(() => {
        fetchTeams();
    }, []);

    return (
        <div className="relative flex flex-col mb-10 gap-8">
            {/* Header */}
            <div className="text-left z-20 px-8">
                <h1 className="text-4xl text-black font-bold mb-4">Our Team</h1>
                <p className="text-gray-700">
                    Didukung oleh tim ahli yang berdedikasi, kami selalu siap memberikan pelayanan terbaik dengan fokus pada hasil yang optimal.
                </p>
            </div>

            {/* Swiper Section */}
            <div className="flex items-center gap-4 py-6 z-20 lg:px-20">
                {/* Previous Button */}
                <button
                    className="px-4 py-2 bg-gray-300 rounded-full hover:bg-gray-400"
                    onClick={() => swiperRef.current?.slidePrev()}
                >
                    <IonIcon name="chevron-back-outline" />
                </button>
                {/* Swiper */}
                <Swiper
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    slidesPerView={4}
                    spaceBetween={10}
                    loop={true}
                    navigation={false}
                    pagination={{
                        clickable: true,
                    }}
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                            spaceBetween: 5,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 15,
                        },
                        1440: {
                            slidesPerView: 3,
                            spaceBetween: 20,
                        },
                    }}
                    modules={[Pagination, Navigation]}
                    className="w-full"
                >
                    {slides.map((slide, index) => (
                        <SwiperSlide key={index}>
                            <div
                                className={`group w-full h-[445px] cursor-pointer rounded-[30px] flex items-center justify-center relative`}
                            >
                                <img
                                    className="w-full h-full rounded-[20px] object-cover"
                                    src={`/storage/${slide.image || 'Loading...'}`}
                                    alt={slide.title}
                                />

                                {/* Name and Position */}
                                <div className="absolute inset-0 flex flex-col items-start justify-end hover:motion-preset-blur-up px-4 py-6 group-hover:hidden transition-transform duration-300 group-hover:top-4 group-hover:left-4 group-hover:items-start group-hover:justify-start">
                                    <h2 className="text-white text-2xl font-bold">{slide.name}</h2>
                                    <p className="text-white text-sm">{slide.position}</p>
                                </div>

                                {/* Hover Description */}
                                <div className="absolute inset-0 hover:motion-preset-blur-up bg-black bg-opacity-50 flex flex-col justify-between items-start px-4 py-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[30px]">
                                    <div className='flex flex-col'>
                                        <h2 className="text-white text-2xl font-bold">{slide.name}</h2>
                                        <p className="text-white text-sm">{slide.position}</p>
                                    </div>
                                    <span
                                        className="prose prose-sm max-w-none text-white"
                                        dangerouslySetInnerHTML={{ __html: slide.description.substring(0, 100) + (slide.description.length > 100 ? '...' : '') }}
                                    />
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                {/* Next Button */}
                <button
                    className="px-4 py-2 bg-gray-300 rounded-full hover:bg-gray-400"
                    onClick={() => swiperRef.current?.slideNext()}
                >
                    <IonIcon name="chevron-forward-outline" />
                </button>
            </div>
            <div className='absolute bottom-0 z-0'>
                <img className='opacity-40 blur-[2px]' src={pattern} alt="" />
            </div>
        </div>
    );
}

export default TeamSection;

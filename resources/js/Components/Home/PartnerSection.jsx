import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import { Pagination, Navigation, FreeMode, Autoplay } from 'swiper/modules';
function PartnerSection() {
    const [slides, setSlides] = useState([]);

    const fetchSlides = async () => {
        try {
            const response = await fetch('/api/partnership');
            const data = await response.json();

            const slidesData = data.map((product) => ({
                title: product.title,
                description: product.description,
                image: product.image,
            }));

            setSlides(slidesData);
        } catch (error) {
            console.error('Error fetching About Us data:', error);
        }
    };
    useEffect(() => {
        fetchSlides();
    }, [])

    return (
        <>
            <div className='py-10 px-7'>
                <span className='flex flex-col gap-4'>
                    <h1 className='text-black font-bold text-[40px] md:ml-16'>Partner & Team</h1>
                </span>
                <div className='my-20'>
                    <Swiper
                        loop={true}
                        freeMode={true}
                        autoplay={{
                            delay: 0,
                            disableOnInteraction: false,
                        }}
                        slidesPerView={3}
                        speed={1500}
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
                        modules={[FreeMode, Pagination, Autoplay]}
                        className="h-full"
                    >
                        {slides.map((slide, index) => (
                            <SwiperSlide key={index}>
                                <div className='w-full h-[200px] bg-white flex items-center justify-center'>
                                    <img
                                        className="w-full h-full rounded-[20px] object-contain"
                                        src={`/storage/${slide.image}`}
                                        alt={slide.title}
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </>
    )
}

export default PartnerSection
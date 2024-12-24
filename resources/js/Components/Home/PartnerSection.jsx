import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import { Pagination, Navigation, FreeMode, Autoplay } from 'swiper/modules';
function PartnerSection() {
    const [slides, setSlides] = useState([]);

    const fetchSlides = async () => {
        try {
            const response = await fetch('/partnership');
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
            <div className='py-10'>
                <span className='flex flex-col gap-4'>
                    <h1 className='text-black font-bold text-[40px]'>Partner & Team</h1>
                    <p className='text-black'>
                        Kami percaya bahwa kolaborasi adalah kunci keberhasilan. Bersama dengan mitra strategis dan tim profesional yang berpengalaman, kami membangun solusi inovatif untuk setiap tantangan bisnis Anda.
                        Tim kami terdiri dari individu yang berdedikasi, berbakat, dan memiliki keahlian di berbagai bidang, siap memberikan layanan terbaik dengan komitmen penuh terhadap kualitas dan hasil.
                        Sebagai mitra terpercaya, kami bekerja sama dengan berbagai perusahaan dan organisasi untuk menciptakan sinergi yang saling menguntungkan, membawa dampak positif dan pertumbuhan berkelanjutan.
                    </p>
                </span>
                <div className='my-20'>
                    <Swiper
                        loop={true}
                        freeMode={true}
                        freeModeMomentum={true}  // Tambahkan opsi momentum
                        autoplay={{
                            delay: 0,
                            disableOnInteraction: false,
                        }}
                        loopAddBlankSlides={false}  // Nonaktifkan loopAddBlankSlides
                        cssMode={true}
                        slidesPerView={2}  // Sesuaikan dengan jumlah slide per view
                        speed={1500}  // Kurangi kecepatan transisi
                        grabCursor={true}
                        loopAdditionalSlides={3}  // Sesuaikan jumlah slide tambahan untuk loop
                        pagination={{
                            clickable: true,
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
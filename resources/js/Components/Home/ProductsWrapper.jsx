import IonIcon from '@reacticons/ionicons'
import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import { Pagination, Navigation } from 'swiper/modules';

function ProductsWrapper() {
    const swiperRef = useRef(null);
    const [selectedCategory, setSelectedCategory] = useState('nonIT');
    const [slides, setSlides] = useState([]);

    const fetchSlides = async (category) => {
        try {
            const response = await fetch(`/products?type=${category === 'nonIT' ? 'nonitproduct' : 'itproduct'}`);
            const data = await response.json();

            const slidesData = data.map((product) => ({
                title: product.title,
                description: product.description,
                image: product.image, 
            }));

            setSlides(slidesData);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };
    useEffect(() => {
        fetchSlides(selectedCategory);
    }, [selectedCategory]);

    return (
        <div className='flex lg:flex-row flex-col w-full h-auto py-6 gap-4'>
            {/* product left */}
            <div className='lg:w-1/2 w-full h-auto flex-grow bg-[#E3E3E3] lg:p-10 p-5 rounded-[20px] space-y-6'>
                <div className='bg-white px-10 py-20 rounded-[20px] text-black'>
                    <h1 className='lg:text-[42px] text-[27px] font-bold motion motion-preset-shrink'>
                        Products
                    </h1>
                    <p className='text-black lg:text-[19px] text-[15px] text-justify motion motion-preset-shrink motion-delay-[2000ms]'>
                        Kami hadir sebagai penyedia solusi lengkap untuk memenuhi berbagai kebutuhan bisnis Anda. Dalam kategori non-IT, kami menawarkan layanan yang mencakup procurement untuk pengadaan barang dan jasa, layanan umum yang andal, serta multimedia untuk kebutuhan produksi kreatif. Selain itu, kami juga menyediakan berbagai produk dan layanan berbasis teknologi informasi (IT) yang dirancang untuk mendukung transformasi digital bisnis Anda. Dengan fokus pada kualitas, efisiensi, dan inovasi, kami siap menjadi mitra terpercaya yang membantu mendorong kesuksesan bisnis Anda di berbagai bidang.
                    </p>
                </div>
                <div
                    onClick={() => setSelectedCategory('nonIT')}
                    className="flex justify-between cursor-pointer items-center bg-white px-8 py-3 rounded-[20px] group">
                    <div
                        className="relative text-black hover:font-bold cursor-pointer transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-gray-400 before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-gray-400 after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]">
                        <span>Non IT Products</span>
                    </div>
                    <IonIcon className="text-[20px]" name="arrow-forward-outline" />
                </div>
                <div
                    onClick={() => setSelectedCategory('it')}
                    className="flex justify-between cursor-pointer items-center bg-white px-8 py-3 rounded-[20px] group">
                    <div
                        className="relative text-black hover:font-bold cursor-pointer transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-gray-400 before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-gray-400 after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]">
                        <span>IT Products</span>
                    </div>
                    <IonIcon className="text-[20px]" name="arrow-forward-outline" />
                </div>
            </div>
            {/* content product */}
            <div className='flex flex-col lg:w-1/2 w-full'>
                <div className='lg:w-full h-auto rounded-[20px] flex-grow'>
                    <Swiper
                        onSwiper={(swiper) => (swiperRef.current = swiper)}
                        slidesPerView={4}
                        spaceBetween={1}
                        loop={true}
                        navigation={true}
                        pagination={{
                            clickable: true,
                        }}
                        breakpoints={{
                            '@0.00': {
                                slidesPerView: 2,
                                spaceBetween: 1,
                            },
                            '@0.75': {
                                slidesPerView: 2,
                                spaceBetween: 1,
                            },
                            '@1.00': {
                                slidesPerView: 2,
                                spaceBetween: 1,
                            },
                            '@1.50': {
                                slidesPerView: 3,
                                spaceBetween: 1,
                            },
                        }}
                        modules={[Pagination, Navigation]}
                        className="lg:h-full h-96 w-full"
                    >
                        {slides.map((slide, index) => (
                            <SwiperSlide key={index}>
                                <div className="group w-full h-full rounded-[20px] flex items-center justify-center relative">
                                    <img
                                        className="w-full h-full rounded-[20px] object-cover"
                                        src={`/storage/${slide.image}`} // Pastikan path sesuai dengan yang dihasilkan dari backend
                                        alt={slide.title}
                                    />
                                    {/* Overlay content */}
                                    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-start justify-end rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <h2 className="text-white px-4 text-xl font-bold">{slide.title}</h2>
                                        <p className="text-white w-full text-sm mt-2 px-4 mb-10 overflow-hidden text-ellipsis whitespace-normal">
                                            {slide.description}
                                        </p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                {/* custom next prev */}
                <div className='flex flex-row justify-between mt-2'>
                    <button
                        className='px-6 py-2 bg-[#E3E3E3] rounded-[12px]'
                        onClick={() => swiperRef.current?.slidePrev()}
                    >
                        <IonIcon name='chevron-back-outline' />
                    </button>
                    <button
                        className='px-6 py-2 bg-[#E3E3E3] rounded-[12px]'
                        onClick={() => swiperRef.current?.slideNext()}
                    >
                        <IonIcon name='chevron-forward-outline' />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductsWrapper
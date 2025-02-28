import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { EffectFade, Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Link } from '@inertiajs/react';
import moment from 'moment';

function Carousel() {
    const [slides, setSlides] = useState([]);

    const fetchBlog = async () => {
        try {
            const response = await fetch('/api/blogs');
            const data = await response.json();
            setSlides(data);
        } catch (error) {
            console.error('Error fetching Blogs:', error);
        }
    }

    useEffect(() => {
        fetchBlog();
    }, []);

    return (
        <div>
            <Swiper
                spaceBetween={30}
                effect={'fade'}
                centeredSlides={true}
                loop={true}
                pagination={{
                    clickable: true,
                }}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                modules={[EffectFade, Navigation, Pagination, Autoplay]}
                className="w-full"
            >
                {slides.map((item) => (
                    <SwiperSlide key={item.id}>
                        <div
                            className="flex md:flex-row items-center gap-8 w-full lg:p-8 p-4 flex-col md:h-auto h-full text-black bg-white">
                            <div className="md:w-1/2 w-full">
                                <div className='rounded-lg shadow-lg p-3'>
                                    <img
                                        src={`/storage/${item.images[0]?.path}`}
                                        alt={item.title}
                                        className="md:w-[55vw] w-full md:h-[60vh] h-[40vh] object-cover rounded-lg"
                                    />
                                </div>
                            </div>
                            <div className='md:w-1/2 h-auto mb-4 gap-5 flex flex-col justify-between'>
                                <h1 className='lg:text-[40px] md:text-[30px] text-[23px]'>{item.title}</h1>
                                <div
                                    className="prose prose-sm max-w-none"
                                    dangerouslySetInnerHTML={{ __html: item.description.substring(0, 150) + (item.description.length > 150 ? '...' : '') }}
                                />
                                <div>
                                    <h2>{moment(item.created_at).format('MMMM Do, YYYY, h:mm A')}</h2>
                                    <Link
                                        href={`/blog-page/${item.id}?title=${encodeURIComponent(item.title)}`}
                                        className="text-blue-500 hover:underline"
                                    >
                                        Baca selengkapnya
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default Carousel
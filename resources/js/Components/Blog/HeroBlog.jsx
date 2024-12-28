import IonIcon from '@reacticons/ionicons'
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { EffectFade, Navigation, Pagination, Autoplay } from 'swiper/modules';

function HeroBlog({ isBlogSelected, onBlogSelect }) {
    if (isBlogSelected) return null;

    const [blog, setBlog] = useState([]);
    const [visibleCount, setVisibleCount] = useState(1);

    const fetchBlog = async () => {
        try {
            const response = await fetch('/blogs');
            const data = await response.json();
            setBlog(data);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        }
    };

    useEffect(() => {
        fetchBlog();
    }, []);

    return (
        <>
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
                    className="mySwiper"
                >
                    {blog.map((item) => (
                        <SwiperSlide key={item.id}>
                            <div
                                onClick={() => onBlogSelect(item)}
                                className="relative rounded-[22px] bg-gradient-to-r from-purple-600 to-blue-600 h-[660px] text-white overflow-hidden">
                                <div class="absolute inset-0">
                                    <img
                                        src={`/storage/${item.images?.[0]?.path}`}
                                        alt={item.title}
                                        className="object-cover object-center w-full h-full"
                                    />
                                    <div class="absolute inset-0 bg-black opacity-50"></div>
                                </div>
                                <div class="relative z-10 p-10 flex lg:flex-row flex-col items-center justify-end mx-auto h-full ">
                                    <div className="flex flex-col lg:w-1/2 h-full w-full justify-end">
                                        <div className="text-left">
                                            <div className="relative text-white hover:font-bold cursor-pointer transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-white before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-white after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%] mb-4">
                                                <span className="lg:text-3xl text-lg font-bold leading-tight motion motion-preset-shrink">
                                                    {item.title}
                                                </span>
                                            </div>
                                            <div className="text-sm text-gray-300 mb-8 motion motion-preset-shrink motion-delay-[200ms]">
                                                <div
                                                    dangerouslySetInnerHTML={{ __html: item.description.substring(0, 200) + (item.description.length > 200 ? '...' : '') }}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className='flex lg:w-1/2 lg:h-full h-0 w-full lg:justify-end items-end lg:py-20'>
                                        <p className="lg:text-lg text-[12px] font-bold text-white">
                                            {moment(item.created_at).format('MMMM Do, YYYY, h:mm A')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    )
}

export default HeroBlog
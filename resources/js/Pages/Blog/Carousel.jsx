import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Progress } from "@material-tailwind/react";

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { EffectFade, Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Link } from '@inertiajs/react';
import moment from 'moment';
import { Parallax, ParallaxProvider, ParallaxBanner } from 'react-scroll-parallax';


function Carousel() {
    const [slides, setSlides] = useState([]);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const fetchBlog = async () => {
        try {
            setIsLoading(true);
            let progress = 0;

            const progressInterval = setInterval(() => {
                progress += 10;
                setLoadingProgress(progress);
                if (progress >= 90) {
                    clearInterval(progressInterval);
                }
            }, 300);

            const response = await fetch('/api/blogs');
            const data = await response.json();

            clearInterval(progressInterval);
            setSlides(data);
            setIsLoading(false);
            setLoadingProgress(100);
        } catch (error) {
            console.error('Error fetching Blogs:', error);
            setIsLoading(false);
            clearInterval(progressInterval);
        }
    }

    useEffect(() => {
        fetchBlog();
    }, []);

    const carousel = {
        translateY: [0, 30],
        scale: [1, 1.3, "easeOutCubic"],
        opacity: [1, 0.2],
        shouldAlwaysCompleteAnimation: true,
        expanded: false,
        children: (
            <div className='absolute inset-0 flex items-center justify-center'>
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
                    className="w-full h-full"
                >
                    {slides.map((item) => (
                        <SwiperSlide key={item.id} className='shadow-lg scale-100 hover:scale-110 transition-all ease-in-out bg-[#1A1A1A] overflow-hidden flex flex-col relative items-center justify-center'>
                            <div
                                className="relative z-10 p-10 lg:pt-20 pt-0 flex lg:flex-row flex-col items-center lg:justify-around justify-evenly mx-auto h-full">
                                <div className="relative flex items-center justify-center">
                                    <img
                                        src={`/storage/${item.images[0]?.path}`}
                                        alt={item.title}
                                        className="w-[420px] h-[260px] object-cover rounded-lg"
                                    />
                                </div>
                                <div className='lg:w-1/2 w-full flex flex-col gap-3 font-bold'>
                                    <h1 className='lg:text-[40px] md:text-[30px] text-[23px]'>{item.title}</h1>
                                    <div
                                        className="prose prose-sm max-w-none text-white"
                                        dangerouslySetInnerHTML={{ __html: item.description.substring(0, 150) + (item.description.length > 150 ? '...' : '') }}
                                    />
                                    <div>
                                        <h2>{moment(item.created_at).format('MMMM Do, YYYY, h:mm A')}</h2>
                                        <Link
                                            href={`/blog-page/${item.id}?title=${encodeURIComponent(item.title)}`}
                                            className="text-blue-500 hover:underline"
                                        >
                                            Read more
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className='absolute inset-0 opacity-45'>
                                <img
                                    src={`/storage/${item.images[0]?.path}`}
                                    alt="Manga Cover"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className='absolute inset-0 bg-gradient-to-t from-[#1A1A1A] to-transparent z-0 pointer-events-none'></div>

                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        )
    };


    return (
        <div className='z-30 relative xl:-top-0 lg:-top-0 -top-10'>
            <ParallaxProvider>
                <ParallaxBanner
                    layers={[
                        carousel
                    ]}
                    className="lg:aspect-[3/1] sm: aspect-[1/2] bg-white"
                ></ParallaxBanner>
            </ParallaxProvider>
            {(loadingProgress < 100 || isLoading) && (
                <Progress value={loadingProgress} color="blue" />
            )}
        </div>
    )
}

export default Carousel
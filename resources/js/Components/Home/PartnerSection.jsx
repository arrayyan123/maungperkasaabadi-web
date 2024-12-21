import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import { Pagination, Navigation, FreeMode, Autoplay } from 'swiper/modules';
function PartnerSection() {
    return (
        <>
            <div className='py-10'>
                <span className='flex flex-col gap-4'>
                    <h1 className='text-black font-bold text-[40px]'>Partner & Team</h1>
                    <p className='text-black'>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis praesentium laudantium dolore blanditiis, nam corporis? Aperiam velit inventore placeat tenetur ea libero accusamus eveniet hic at itaque aliquam, alias fuga. Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora ducimus dolorum architecto esse soluta ullam aperiam autem quibusdam veritatis. Reiciendis ipsum quo laborum ad adipisci, sed praesentium ea perferendis? Officiis?
                    </p>
                </span>
                <div className='my-20'>
                    <Swiper
                        slidesPerView={3}
                        spaceBetween={10}
                        loop={true}
                        autoplay={true}
                        freeMode={true}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[FreeMode, Pagination, Autoplay]}
                        className="h-full"
                    >
                        <SwiperSlide>
                            <div className='w-full h-[200px] bg-gray-400 flex items-center justify-center'>
                                <h1 className='text-black text-[30px]'>Slide 1</h1>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='w-full h-[200px] bg-gray-400 flex items-center justify-center'>
                                <h1 className='text-black text-[30px]'>Slide 2</h1>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='w-full h-[200px] bg-gray-400 flex items-center justify-center'>
                                <h1 className='text-black text-[30px]'>Slide 3</h1>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='w-full h-[200px] bg-gray-400 flex items-center justify-center'>
                                <h1 className='text-black text-[30px]'>Slide 4</h1>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='w-full h-[200px] bg-gray-400 flex items-center justify-center'>
                                <h1 className='text-black text-[30px]'>Slide 5</h1>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </>
    )
}

export default PartnerSection
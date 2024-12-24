import React, { useState, useEffect } from 'react';
import IonIcon from '@reacticons/ionicons'

const svgImages = import.meta.glob('/public/assets/Images/*.svg', { eager: true });
const pngImages = import.meta.glob('/public/assets/Images/*.png', { eager: true });
const jpgImages = import.meta.glob('/public/assets/Images/swiper_img/*.jpg', { eager: true });

const images = { ...svgImages, ...pngImages, ...jpgImages };

const getImageByName = (name) => {
    const matchingImage = Object.keys(images).find((path) => path.includes(`${name}`));
    return matchingImage ? images[matchingImage].default || images[matchingImage] : null;
};

const img01 = getImageByName('img_1')


function AboutSection01() {
    return (
        <>
            <div class="relative my-12 rounded-[22px] z-20 md:w-auto bg-gradient-to-r from-purple-600 to-blue-600 h-auto text-white overflow-hidden">
                <div class="absolute inset-0">
                    <img src={img01} alt="Background Image" class="object-cover object-center w-full h-full" />
                    <div class="absolute inset-0 bg-black opacity-50"></div>
                </div>
                <div class="relative z-10 lg:p-10 p-0 flex flex-col justify-center h-full space-y-20">
                    <div className="p-10 flex flex-col justify-center space-y-20 text-center">
                        <div className="text-left md:w-1/2 w-full">
                            <h1 className="lg:text-5xl text-xl font-bold leading-tight mb-4 motion motion-preset-shrink">
                                Bekerja Sama dengan kami
                            </h1>
                            <p className="lg:text-lg text-sm text-gray-300 mb-8 motion motion-preset-shrink motion-delay-[200ms]">
                                Kami di sini untuk membantu Anda mencapai tujuan dengan solusi yang inovatif, dan berkualitas baik Dengan pengalaman luas dan tim profesional yang selalu siap mendukung, kami berkomitmen memberikan layanan terbaik untuk setiap proyek yang kami tangani.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AboutSection01
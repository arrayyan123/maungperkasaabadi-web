import React, { useState, useEffect } from 'react';
import IonIcon from '@reacticons/ionicons'

const svgImages = import.meta.glob('/public/assets/Images/*.svg', { eager: true });
const pngImages = import.meta.glob('/public/assets/Images/*.png', { eager: true });
const jpgImages = import.meta.glob('/public/assets/Images/*.jpg', { eager: true });

const images = { ...svgImages, ...pngImages, ...jpgImages };

const getImageByName = (name) => {
    const matchingImage = Object.keys(images).find((path) => path.includes(`${name}`));
    return matchingImage ? images[matchingImage].default || images[matchingImage] : null;
};

const aboutBG = getImageByName('about_section')

function HeroAbout() {

    return (
        <>
            <div className='flex w-full h-full lg:flex-row flex-col gap-3'>
                <div class="relative rounded-[22px] md:w-auto bg-gradient-to-r from-purple-600 to-blue-600 h-screen text-white overflow-hidden">
                    <div class="absolute inset-0">
                        <img src={aboutBG} alt="Background Image" class="object-cover object-center w-full h-full" />
                        <div class="absolute inset-0 bg-black opacity-50"></div>
                    </div>
                    <div class="relative z-10 lg:p-20 p-0 flex flex-col justify-center h-full space-y-20">
                        <div className="p-20 flex mt-20 flex-col justify-center space-y-20 text-center">
                            <div className="text-left md:w-1/2 w-full">
                                <h1 className="text-5xl font-bold leading-tight mb-4 motion motion-preset-shrink">
                                    About us
                                </h1>
                                <p className="text-lg text-gray-300 mb-8 motion motion-preset-shrink motion-delay-[200ms]">
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque consequuntur neque alias maxime, quis
                                    dolorem nisi repellendus dolor voluptatum quod in harum ad cum distinctio doloremque error praesentium
                                    culpa! Ducimus.
                                </p>
                            </div>
                            <div className="relative mx-auto animate-bounce">
                                <IonIcon className="text-white text-[30px]" name="caret-down-outline" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col h-auto gap-4'>
                    <div className='lg:w-[400px] w-auto h-full rounded-[20px] flex items-center justify-center px-20 py-20 bg-gray-400'>
                        <h1>Testing</h1>
                    </div>
                    <div className='lg:w-[400px] w-auto h-full rounded-[20px] flex items-center justify-center px-20 py-20 bg-gray-700'>
                        <h1>Testing</h1>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HeroAbout
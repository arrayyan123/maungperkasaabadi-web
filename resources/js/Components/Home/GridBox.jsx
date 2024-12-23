import { Link } from '@inertiajs/react';
import IonIcon from '@reacticons/ionicons';
import React from 'react'

const svgImages = import.meta.glob('/public/assets/Images/*.svg', { eager: true });
const pngImages = import.meta.glob('/public/assets/Images/*.png', { eager: true });

const images = { ...svgImages, ...pngImages };

const getImageByName = (name) => {
    const matchingImage = Object.keys(images).find((path) => path.includes(`${name}`));
    return matchingImage ? images[matchingImage].default || images[matchingImage] : null;
};

const abstract01 = getImageByName('abstract_img')
const abstract02 = getImageByName('abstract_img_2')


function GridBox() {
    return (
        <>
            {/* wrapper grid nya */}
            <div className='py-10 h-auto w-auto'>
                <div className='flex lg:flex-row flex-col gap-4'>
                    <div className='flex'>
                        <div className='w-full p-10 relative cursor-pointer overflow-hidden rounded-[40px] lg:h-[695px] h-auto flex bg-gradient-to-b from-[#505050] to-[#191919]'>
                            <h1 className='lg:text-[60px] text-[30px] hover:motion-preset-blur-right w-[70%] z-20 text-white font-bold'>Terdapat banyak hal untuk anda</h1>
                            <img className='absolute hover:motion-preset-blur-right top-[10%] -right-[40%] z-0' src={abstract01} alt="" />
                        </div>
                    </div>
                    <div className='flex flex-col h-full w-full gap-4 justify-end'>
                        <Link href='/blog'>
                            <div className=' rounded-[40px] cursor-pointer lg:h-[345px] h-[245px] overflow-hidden relative flex items-end p-10 justify-start bg-gradient-to-b from-gray-300 to-gray-500'>
                                <div
                                    className="relative text-white hover:font-bold cursor-pointer transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-white before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-white after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]">
                                    <span className='text-[40px]'>Our Blog</span>
                                </div>                                 
                                <IonIcon className='absolute top-5 right-6 ease-in-out text-[40px] rotate-45 ' name='arrow-up' />
                                <img className='absolute hover:motion-preset-blur-left xl:-top-1/4 top-1/4 -rotate-6 left-1/4 z-0' src={abstract02} alt="" />
                            </div>
                        </Link>
                        <div className='flex lg:flex-row flex-col space-x-0 space-y-3 lg:space-y-0 lg:space-x-3'>
                            <div className='w-full h-[335px] rounded-[40px] flex items-end p-10 justify-start text-white bg-pink-400'>
                                <Link href={`/about-us`}>
                                    <div
                                        className="relative text-white hover:font-bold cursor-pointer transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-white before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-white after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]">
                                        <span className='text-[40px] flex items-center space-x-3'><p>About us</p> <IonIcon name='globe' /></span>
                                    </div>
                                </Link>
                            </div>
                            <div className='w-full h-[335px] rounded-[40px] flex items-end p-10 justify-start text-white bg-gray-400'>
                                <Link href={`/`}>
                                    <div
                                        className="relative text-white hover:font-bold cursor-pointer transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-white before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-white after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]">
                                        <span className='text-[40px] flex items-center space-x-3'><p>Contact us</p> <IonIcon name='navigate' /></span>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GridBox
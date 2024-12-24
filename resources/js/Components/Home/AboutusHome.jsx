import IonIcon from '@reacticons/ionicons'
import React, { useState, useEffect } from 'react'
import { Fade } from 'react-awesome-reveal';

const images = import.meta.glob('/public/assets/Images/*.svg', { eager: true });

const getImageByName = (name) => {
    const matchingImage = Object.keys(images).find((path) => path.includes(`${name}.svg`));
    return matchingImage ? images[matchingImage].default || images[matchingImage] : null;
};

const dotGreen = getImageByName('dots-green')

function AboutusHome() {
    const [aboutUsContent, setAboutUsContent] = useState([]);

    const fetchAboutUs = async () => {
        try {
            const response = await fetch('/aboutus'); 
            const data = await response.json();
            setAboutUsContent(data);
        } catch (error) {
            console.error('Error fetching About Us data:', error);
        }
    };

    useEffect(() => {
        fetchAboutUs();
    }, []);
    return (
        <>
            <div className='flex flex-col mt-10 h-auto w-auto items-center'>
                <div className='flex flex-col text-black lg:px-20 px-3'>
                    <h1 className='text-[40px] font-bold'>Why Choose Us</h1>
                    <p className='lg:text-left text-justify'>
                        Dengan keahlian yang luas, kami menyediakan solusi terbaik mulai dari pengembangan teknologi hingga layanan profesional di berbagai sektor. Komitmen kami adalah memberikan pelayanan unggul yang mendukung kebutuhan bisnis Anda.
                    </p>
                </div>
                {/* Konten satu */}
                <div className='flex xl:flex-row flex-col justify-between text-black p-3 lg:p-20 w-full xl:space-y-0 space-y-7 xl:space-x-10'>
                    <div className='flex flex-col'>
                        <Fade direction='left' cascade>
                            <h1 className='text-[40px] font-bold'>{aboutUsContent[0]?.title || 'Loading...'}</h1>
                            <div className='lg:px-10 py-10'>
                                <div className='flex flex-row space-x-16 xl:space-x-20 '>
                                    <span className='flex flex-col justify-center'>
                                        <div className='absolute z-0 h-10 w-10 rounded-full bg-gray-200'></div>
                                        <IonIcon className='text-[25px] ml-4 inset-0 z-20' name='bag' />
                                    </span>
                                    <span className='flex flex-col justify-center'>
                                        <div className='absolute z-0 h-10 w-10 rounded-full bg-gray-200'></div>
                                        <IonIcon className='text-[25px] ml-4 inset-0 z-20' name='bar-chart' />
                                    </span>
                                    <span className='flex flex-col justify-center'>
                                        <div className='absolute z-0 h-10 w-10 rounded-full bg-gray-200'></div>
                                        <IonIcon className='text-[25px] ml-4 inset-0 z-20' name='bag' />
                                    </span>
                                </div>
                            </div>
                            <p className='text-justify'>
                                {aboutUsContent[0]?.description || 'Loading...'}
                            </p>
                        </Fade>
                    </div>
                    <div className='mb-20 xl:mb-0 mx-auto w-full'>
                        <Fade direction='right' cascade>
                            <div className='relative flex flex-col xl:flex-row gap-3 w-full'>
                                <div className='relative bg-gray-200 rounded-[25px] flex items-center justify-center h-[390px] xl:w-[320px] w-full'>
                                    <img
                                        className="w-full h-full rounded-[20px] object-cover"
                                        src={`/storage/${aboutUsContent[0]?.image1 || 'Loading...'}`}
                                        alt={aboutUsContent[0]?.title}
                                    />
                                </div>
                                <div className='relative bg-gray-200 rounded-[25px] flex items-center justify-center h-[98px] xl:w-[220px] w-full'>
                                    <img
                                        className="w-full h-full rounded-[20px] object-cover"
                                        src={`/storage/${aboutUsContent[0]?.image2 || 'Loading...'}`}
                                        alt={aboutUsContent[0]?.title}
                                    />
                                </div>
                                <div className='absolute  xl:right-[0%] right-[0%] top-[27%]  bg-gray-600 rounded-[25px] flex items-center justify-center h-[390px] xl:w-[320px] w-[70%]'>
                                    <img
                                        className="w-full h-full rounded-[20px] object-cover"
                                        src={`/storage/${aboutUsContent[0]?.image3 || 'Loading...'}`}
                                        alt={aboutUsContent[0]?.title}
                                    />
                                </div>
                            </div>
                        </Fade>
                    </div>
                </div>

                {/* garis pembatas */}
                <div className='border-b-2 border-gray-400 mt-20 w-full'></div>

                {/* Konten kedua */}
                <div className='relative flex xl:flex-row w-full flex-col my-20 lg:px-24 px-3 gap-20 items-center'>
                    <img className='absolute -top-12 left-2 z-0' src={dotGreen} alt="" />
                    <div className='w-full z-20'>
                        <div className='flex flex-col text-black gap-4'>
                            <Fade direction='left' cascade>
                                <div className='flex lg:flex-row flex-col gap-5'>
                                    <Fade direction='left' cascade>
                                        <div className='xl:w-[330px] w-full lg:h-[415px] h-[230px] rounded-[20px] bg-gray-400 flex items-center justify-center'>
                                            <img
                                                className="w-full h-full rounded-[20px] object-cover"
                                                src={`/storage/${aboutUsContent[1]?.image1 || 'Loading...'}`}
                                                alt={aboutUsContent[1]?.title}
                                            />
                                        </div>
                                        <div className='xl:w-[180px] w-full lg:h-[415px] h-[230px] rounded-[20px] bg-gray-400 flex items-center justify-center'>
                                            <img
                                                className="w-full h-full rounded-[20px] object-cover"
                                                src={`/storage/${aboutUsContent[1]?.image2 || 'Loading...'}`}
                                                alt={aboutUsContent[1]?.title}
                                            />
                                        </div>
                                    </Fade>
                                </div>
                                <div className='xl:w-[530px] w-full h-[135px] lg:h-[125px] rounded-[20px] bg-gray-400 flex items-center justify-center'>
                                    <img
                                        className="w-full h-full rounded-[20px] object-cover"
                                        src={`/storage/${aboutUsContent[1]?.image3 || 'Loading...'}`}
                                        alt={aboutUsContent[1]?.title}
                                    />
                                </div>
                            </Fade>
                        </div>
                    </div>
                    <div className='flex flex-col text-black space-y-7'>
                        <Fade direction='right' cascade>

                            <h1 className='text-[40px] font-bold'>{aboutUsContent[1]?.title || 'Loading...'}</h1>
                            <div className='flex lg:flex-row flex-col lg:space-y-0 space-y-5 text-justify space-x-0 lg:space-x-5 text-black '>
                                <p>
                                    {aboutUsContent[1]?.description || 'Loading...'}
                                </p>
                            </div>
                        </Fade>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AboutusHome
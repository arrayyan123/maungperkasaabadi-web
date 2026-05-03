import IonIcon from '@reacticons/ionicons'
import React, { useState, useEffect } from 'react'

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
            const response = await fetch('/api/aboutus');
            const data = await response.json();
            setAboutUsContent(data);
        } catch (error) {
            console.error('Error fetching About Us data:', error);
        }
    };

    useEffect(() => {
        fetchAboutUs();
    }, []);

    // Komponen gambar untuk pola ganjil (pola konten 1)
    const OddImages = ({ image1, image2, image3, title }) => (
        <div className='mb-20 xl:mb-0 mx-auto w-full'>
            <div className='relative flex flex-col xl:flex-row gap-3 w-full'>
                <div className='relative bg-gray-200 rounded-[25px] flex items-center justify-center h-[390px] xl:w-[320px] w-full'>
                    <img
                        className="w-full h-full rounded-[20px] object-cover"
                        src={`/storage/${image1 || 'Loading...'}`}
                        alt={title}
                    />
                </div>
                <div className='relative bg-gray-200 rounded-[25px] flex items-center justify-center h-[98px] xl:w-[220px] w-full'>
                    <img
                        className="w-full h-full rounded-[20px] object-cover"
                        src={`/storage/${image2 || 'Loading...'}`}
                        alt={title}
                    />
                </div>
                <div className='absolute  xl:right-[0%] right-[0%] top-[27%]  bg-gray-600 rounded-[25px] flex items-center justify-center h-[390px] xl:w-[320px] w-[70%]'>
                    <img
                        className="w-full h-full rounded-[20px] object-cover"
                        src={`/storage/${image3 || 'Loading...'}`}
                        alt={title}
                    />
                </div>
            </div>
        </div>
    );

    // Komponen gambar untuk pola genap (pola konten 2)
    const EvenImages = ({ image1, image2, image3, title }) => (
        <div className='flex flex-col text-black gap-4 w-full z-20'>
            <div className='flex lg:flex-row flex-col gap-5'>
                <div className='xl:w-[330px] w-full lg:h-[415px] h-[230px] rounded-[20px] bg-gray-400 flex items-center justify-center'>
                    <img
                        className="w-full h-full rounded-[20px] object-cover"
                        src={`/storage/${image1 || 'Loading...'}`}
                        alt={title}
                    />
                </div>
                <div className='xl:w-[180px] w-full lg:h-[415px] h-[230px] rounded-[20px] bg-gray-400 flex items-center justify-center'>
                    <img
                        className="w-full h-full rounded-[20px] object-cover"
                        src={`/storage/${image2 || 'Loading...'}`}
                        alt={title}
                    />
                </div>
            </div>
            <div className='xl:w-[530px] w-full h-[135px] lg:h-[125px] rounded-[20px] bg-gray-400 flex items-center justify-center'>
                <img
                    className="w-full h-full rounded-[20px] object-cover"
                    src={`/storage/${image3 || 'Loading...'}`}
                    alt={title}
                />
            </div>
        </div>
    );

    return (
        <div className='flex flex-col h-auto w-auto items-center'>
            <div className='flex flex-col text-black lg:px-20 px-3'>
                <h1 className='text-[40px] font-bold'>Kenapa memilih kami</h1>
                <p className='lg:text-left text-justify'>
                    Dengan keahlian yang luas, kami menyediakan solusi terbaik mulai dari pengembangan teknologi hingga layanan profesional di berbagai sektor. Komitmen kami adalah memberikan pelayanan unggul yang mendukung kebutuhan bisnis Anda.
                </p>
            </div>

            {aboutUsContent.length === 0 && (
                <div className="text-center py-10">Loading...</div>
            )}

            {aboutUsContent.map((content, i) => (
                <React.Fragment key={i}>
                    {i % 2 === 0 ? (
                        // Konten ganjil (mulai dari i=0)
                        <div className='flex xl:flex-row flex-col justify-between text-black p-3 lg:p-20 w-full xl:space-y-0 space-y-7 xl:space-x-10'>
                            <div className='flex flex-col'>
                                <h1 className='text-[40px] font-bold'>{content.title}</h1>
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
                                    {content.description}
                                </p>
                            </div>
                            <OddImages
                                image1={content.image1}
                                image2={content.image2}
                                image3={content.image3}
                                title={content.title}
                            />
                        </div>
                    ) : (
                        // Konten genap
                        <div className='relative flex xl:flex-row w-full flex-col my-20 lg:px-24 px-3 gap-20 items-center'>
                            <img className='absolute -top-12 left-2 z-0' src={dotGreen} alt="" />
                            <div className='w-full z-20'>
                                <EvenImages
                                    image1={content.image1}
                                    image2={content.image2}
                                    image3={content.image3}
                                    title={content.title}
                                />
                            </div>
                            <div className='flex flex-col text-black space-y-7'>
                                <h1 className='text-[40px] font-bold'>{content.title}</h1>
                                <div className='flex lg:flex-row flex-col lg:space-y-0 space-y-5 text-justify space-x-0 lg:space-x-5 text-black '>
                                    <p>
                                        {content.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* garis pembatas antar konten */}
                    {i !== aboutUsContent.length - 1 && (
                        <div className='border-b-2 border-gray-400 mt-20 w-full'></div>
                    )}
                </React.Fragment>
            ))}
        </div>
    )
}

export default AboutusHome
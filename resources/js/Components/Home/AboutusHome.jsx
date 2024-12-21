import IonIcon from '@reacticons/ionicons'
import React from 'react'

const images = import.meta.glob('/public/assets/Images/*.svg', { eager: true });

const getImageByName = (name) => {
    const matchingImage = Object.keys(images).find((path) => path.includes(`${name}.svg`));
    return matchingImage ? images[matchingImage].default || images[matchingImage] : null;
};

const dotGreen = getImageByName('dots-green')

function AboutusHome() {
    return (
        <>
            <div className='flex flex-col mt-10 h-auto w-auto items-center'>
                <div className='flex flex-col text-black lg:px-20 px-3'>
                    <h1 className='text-[40px] font-bold'>Why Choose Us</h1>
                    <p className='lg:text-left text-justify'>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus sequi temporibus reiciendis, pariatur beatae qui officiis dicta saepe ipsa expedita sapiente in nostrum repellat hic incidunt quas eos corporis exercitationem!≈
                    </p>
                </div>
                {/* Konten satu */}
                <div className='flex xl:flex-row flex-col text-black p-3 lg:p-20 w-full xl:space-y-0 space-y-7 xl:space-x-10'>
                    <div className='flex flex-col'>
                        <h1 className='text-[40px] font-bold'>We Help You with the solution</h1>
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
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque consequuntur neque alias maxime, quis dolorem nisi repellendus dolor voluptatum quod in harum ad cum distinctio doloremque error praesentium culpa! Ducimus. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque consequuntur neque alias maxime, quis dolorem nisi repellendus dolor voluptatum quod in harum ad cum distinctio doloremque error praesentium culpa! Ducimus.
                        </p>
                    </div>
                    <div className='mb-20 xl:mb-0 mx-auto w-full'>
                        <div className='relative flex flex-col xl:flex-row gap-3 w-full'>
                            <div className='relative bg-gray-200 rounded-[25px] flex items-center justify-center px-10 h-[390px] xl:w-[320px] w-full'>
                                <h1>Testing Background</h1>
                            </div>
                            <div className='relative bg-gray-200 rounded-[25px] flex items-center justify-center px-10 h-[98px] xl:w-[220px] w-full'>
                                <h1>Testing Background</h1>
                            </div>
                            <div className='absolute  xl:right-[0%] right-[0%] top-[27%]  bg-gray-600 rounded-[25px] flex items-center justify-center px-10 h-[390px] xl:w-[320px] w-[70%]'>
                                <h1>Testing Background</h1>
                            </div>
                        </div>
                    </div>
                </div>

                {/* garis pembatas */}
                <div className='border-b-2 border-gray-400 mt-20 w-full'></div>

                {/* Konten kedua */}
                <div className='relative flex xl:flex-row w-full flex-col my-20 lg:px-24 px-3 gap-20 items-center'>
                    <img className='absolute -top-12 left-2 z-0' src={dotGreen} alt="" />
                    <div className='w-full z-20'>
                        <div className='flex flex-col text-black gap-4'>
                            <div className='flex lg:flex-row flex-col gap-5'>
                                <div className='xl:w-[330px] w-full lg:h-[415px] h-[230px] rounded-[20px] bg-gray-400 flex items-center justify-center'>
                                    <h1>testing background</h1>
                                </div>
                                <div className='xl:w-[180px] w-full lg:h-[415px] h-[230px] rounded-[20px] bg-gray-400 flex items-center justify-center'>
                                    <h1>testing background</h1>
                                </div>
                            </div>
                            <div className='xl:w-[530px] w-full h-[135px] lg:h-[125px] rounded-[20px] bg-gray-400 flex items-center justify-center'>
                                <h1>testing background</h1>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col text-black space-y-7'>
                        <h1 className='text-[40px] font-bold'>We Help You with the solution</h1>
                        <div className='flex lg:flex-row flex-col lg:space-y-0 space-y-5 text-justify space-x-0 lg:space-x-5 text-black '>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, explicabo? Debitis consequuntur tempora sed, beatae quaerat, ipsum odit consectetur voluptas fugit velit quas at temporibus facere dignissimos cumque totam rem.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur provident ab laboriosam ipsum eligendi. Ratione reiciendis in consequatur? Mollitia, amet fuga quam quasi aliquam molestiae assumenda ad voluptatum nesciunt totam.
                            </p>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, explicabo? Debitis consequuntur tempora sed, beatae quaerat, ipsum odit consectetur voluptas fugit velit quas at temporibus facere dignissimos cumque totam rem.
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat officiis iste nobis velit nihil dolores fugit recusandae esse ea maxime, corporis aliquam. Quam at ut debitis recusandae. Excepturi, velit tempore.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AboutusHome
import IonIcon from '@reacticons/ionicons'
import React, { useState, useEffect } from 'react';
import { Fade } from 'react-awesome-reveal';

function Hero() {
  return (
    <>
      <section className="bg-white dark:bg-gray-900 max-h-screen">
        <div className='flex'>
          <div className='grid max-w-screen-xl px-4 pt-10 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-20'>
            <div className="mr-auto place-self-center lg:col-span-7">
              <h1
                className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl dark:text-white motion motion-preset-shrink text-black">
                Maung Perkasa Abadi
              </h1>
              <p className="max-w-2xl mb-6 font-light text-gray-800 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400 motion motion-preset-shrink motion-delay-[200ms]">
                Kami adalah perusahaan yang bergerak di berbagai bidang, mencakup layanan IT dan Non-IT. Dengan keahlian yang luas, kami menyediakan solusi terbaik mulai dari pengembangan teknologi hingga layanan profesional di berbagai sektor. Komitmen kami adalah memberikan pelayanan unggul yang mendukung kebutuhan bisnis Anda.
              </p>
            </div>
            <div className="lg:mt-0 lg:col-span-5 lg:flex">
              <img
                src="https://demo.themesberg.com/landwind/images/hero.png"
                alt="Hero"
              />
            </div>
          </div>
          <div>

          </div>
        </div>
      </section>
    </>
  )
}

export default Hero
import IonIcon from '@reacticons/ionicons'
import React, { useState, useEffect } from 'react';
import { Fade } from 'react-awesome-reveal';

function Hero() {
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <div class="relative rounded-[22px] bg-gradient-to-r from-purple-600 to-blue-600 h-screen text-white overflow-hidden">
        <div class="absolute inset-0">
          <img src="https://images7.alphacoders.com/103/thumb-1920-1037113.jpg" alt="Background Image" class="object-cover object-center w-full h-full" />
          <div class="absolute inset-0 bg-black opacity-50"></div>
        </div>
        <div class="relative z-10 lg:p-20 p-0 flex flex-col justify-center h-full space-y-20">
          {showWelcome ? (
            <div
              className="lg:p-0 p-10 lg:text-5xl text-xl motion motion-preset-shrink font-bold transition-opacity duration-1000 opacity-100"
              style={{ opacity: showWelcome ? 1 : 0 }}
            >
              WELCOME
            </div>
          ) : (
            <div className="lg:p-20 p-10 flex mt-20 flex-col justify-center space-y-20 text-center">
              <div className="text-left lg:w-1/2 w-full">
                <h1 className="lg:text-5xl text-3xl font-bold leading-tight mb-4 motion motion-preset-shrink">
                  Maung Perkasa Abadi
                </h1>
                <p className="lg:text-lg text-sm text-gray-300 mb-8 motion motion-preset-shrink motion-delay-[200ms]">
                  Kami adalah perusahaan yang bergerak di berbagai bidang, mencakup layanan IT dan Non-IT. Dengan keahlian yang luas, kami menyediakan solusi terbaik mulai dari pengembangan teknologi hingga layanan profesional di berbagai sektor. Komitmen kami adalah memberikan pelayanan unggul yang mendukung kebutuhan bisnis Anda.
                </p>
              </div>
              <div className="relative mx-auto animate-bounce">
                <IonIcon className="text-white text-[30px]" name="caret-down-outline" />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Hero
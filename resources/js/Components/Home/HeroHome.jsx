import React, { useState, useEffect } from 'react';
import { Parallax, ParallaxProvider, ParallaxBanner } from 'react-scroll-parallax';

const svgImages = import.meta.glob('/public/assets/Images/*.svg', { eager: true });
const pngImages = import.meta.glob('/public/assets/Images/*.png', { eager: true });
const jpgImages = import.meta.glob('/public/assets/Images/*.jpg', { eager: true });

const images = { ...svgImages, ...pngImages, ...jpgImages };

const getImageByName = (name) => {
    const matchingImage = Object.keys(images).find((path) => path.includes(`${name}`));
    return matchingImage ? images[matchingImage].default || images[matchingImage] : null;
};

const aboutBG = getImageByName('about_section')
const logo = getImageByName('Logo_maung');
const backgroundOffice = getImageByName('Office_Building_Logo')

function HeroHome() {
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

    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setFadeOut(true);
        }, 1300);

        return () => clearTimeout(timer);
    }, []);

    const background = {
        image: backgroundOffice,
        translateY: [20, 50],
        translateX: [0,20],
        opacity: [1, 0.3],
        scale: [1, 1.4, "easeOutCubic"],
        shouldAlwaysCompleteAnimation: true,
    };

    return (
        <div className='z-30 relative xl:-top-40 lg:-top-0 -top-10'>
            <ParallaxProvider>
                <ParallaxBanner
                    layers={[background]}
                    className="lg:aspect-[3/2] aspect-[1/2] lg:-mb-20 mb-10 bg-gray-900"
                />
            </ParallaxProvider>
        </div>
    )
}

export default HeroHome
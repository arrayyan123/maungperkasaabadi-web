import React, { useState, useEffect } from 'react';
import { Parallax, ParallaxProvider, ParallaxBanner } from 'react-scroll-parallax';
import IonIcon from '@reacticons/ionicons'

const svgImages = import.meta.glob('/public/assets/Images/parallaxImg/*.svg', { eager: true });
const pngImages = import.meta.glob('/public/assets/Images/parallaxImg/*.png', { eager: true });
const jpgImages = import.meta.glob('/public/assets/Images/parallaxImg/*.jpg', { eager: true });

const images = { ...svgImages, ...pngImages, ...jpgImages };

const getImageByName = (name) => {
    const matchingImage = Object.keys(images).find((path) => path.includes(`${name}`));
    return matchingImage ? images[matchingImage].default || images[matchingImage] : null;
};

const sky = getImageByName('sky')
const building = getImageByName('city');

function HeroAbout() {
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
        image:
            sky,
        translateY: [0, 50],
        opacity: [1, 0.3],
        scale: [1.05, 1, "easeOutCubic"],
        shouldAlwaysCompleteAnimation: true,
    };

    const headline = {
        translateY: [0, 30],
        scale: [1, 1.05, "easeOutCubic"],
        shouldAlwaysCompleteAnimation: true,
        expanded: false,
        children: (
            <div className="absolute inset-0 mt-32 flex items-center justify-center">
                <h1 className="text-4xl lg:text-8xl motion-preset-slide-up-lg text-white font-black">
                    Tentang Kami
                </h1>
            </div>
        ),
    };

    const foreground = {
        image:
            building,
        translateY: [20, 15],
        scale: [1, 1.1, "easeOutCubic"],
        shouldAlwaysCompleteAnimation: true,
    };

    const gradientOverlay = {
        opacity: [0, 1],
        shouldAlwaysCompleteAnimation: true,
        expanded: false,
        children: (
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-blue-900" />
        ),
    };

    return (
        <div className='z-30 relative xl:-top-40 lg:-top-0 -top-40'>
            <ParallaxProvider>
                <ParallaxBanner
                    layers={[background, foreground, headline, gradientOverlay]}
                    className="lg:aspect-[3/2] aspect-[1/2] -mb-20 bg-gray-900"
                />
            </ParallaxProvider>
        </div>
    )
}

export default HeroAbout
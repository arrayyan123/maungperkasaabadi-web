import React, { useState, useEffect } from 'react';
import { Parallax, ParallaxProvider, ParallaxBanner } from 'react-scroll-parallax';
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
const logo = getImageByName('Logo_maung');

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
            "https://s3-us-west-2.amazonaws.com/s.cdpn.io/105988/banner-background.jpg",
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
            <div className="absolute lg:-top-40 -top-20 inset-0 flex items-center justify-center">
                <h1 className="text-3xl lg:text-8xl motion-preset-slide-up-lg md:text-4xl text-white font-thin">
                    Tentang Kami
                </h1>
            </div>
        ),
    };

    const foreground = {
        image:
            "https://s3-us-west-2.amazonaws.com/s.cdpn.io/105988/banner-foreground.png",
        translateY: [0, 15],
        scale: [1, 1.1, "easeOutCubic"],
        shouldAlwaysCompleteAnimation: true,
    };

    const gradientOverlay = {
        opacity: [0, 0.9],
        shouldAlwaysCompleteAnimation: true,
        expanded: false,
        children: (
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-blue-900" />
        ),
    };

    return (
        <div className='z-30 relative lg:-top-40 top-0'>
            <ParallaxProvider>
                <ParallaxBanner
                    layers={[background, headline, foreground, gradientOverlay]}
                    className="lg:aspect-[3/2] aspect-[1/2] -mb-20 bg-gray-900"
                />
            </ParallaxProvider>
        </div>
    )
}

export default HeroAbout
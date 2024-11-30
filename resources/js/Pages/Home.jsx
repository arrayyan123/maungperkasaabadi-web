import React from "react";
import AboutSection from "../Components/Home/AboutSection";
import Carousel from "../Components/Home/Carousel";
import ContentSection from "../Components/Home/ContentSection";
import Hero from "../Components/Home/Hero";
import MarqueeWrapper from "../Components/Home/MarqueeWrapper";
import SmallSection from "../Components/Home/SmallSection";
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
//import BlogManager from "./BlogManager";

const Home = () => {
  return (
    <div>
        <Navbar/>
      <Hero />
      <AboutSection />
      <ContentSection />
      <MarqueeWrapper />
      <SmallSection />
      <Carousel />
      <Footer/>
    </div>
  );
};

export default Home;

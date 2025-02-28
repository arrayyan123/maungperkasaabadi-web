import AboutusHome from '@/Components/Home/AboutusHome'
import GridBox from '@/Components/Home/GridBox'
import HeroHome from '@/Components/Home/HeroHome'
import PartnerSection from '@/Components/Home/PartnerSection'
import ProductsWrapper from '@/Components/Home/ProductsWrapper'
import WhyChoose from '@/Components/Home/WhyChoose'
import WebsiteLayout from '@/Layouts/WebsiteLayout'
import { Head } from '@inertiajs/react'
import React from 'react'

function Home() {
  return (
    <>
      <WebsiteLayout>
        <Head title='Home' />
        <HeroHome />
        <AboutusHome />
        <PartnerSection />
        <WhyChoose />
        <ProductsWrapper />
        <GridBox />
      </WebsiteLayout>
    </>
  )
}

export default Home
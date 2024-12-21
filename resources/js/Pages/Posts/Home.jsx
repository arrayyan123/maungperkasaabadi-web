import AboutusHome from '@/Components/Home/AboutusHome'
import GridBox from '@/Components/Home/GridBox'
import Hero from '@/Components/Home/Hero'
import PartnerSection from '@/Components/Home/PartnerSection'
import ProductsWrapper from '@/Components/Home/ProductsWrapper'
import WebsiteLayout from '@/Layouts/WebsiteLayout'
import { Head } from '@inertiajs/react'
import React from 'react'

function Home() {
  return (
    <>
      <WebsiteLayout>
        <Head title='Home' />
        <Hero />
        <ProductsWrapper />
        <AboutusHome />
        <GridBox />
        <PartnerSection />
      </WebsiteLayout>
    </>
  )
}

export default Home
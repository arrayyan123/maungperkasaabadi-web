import AboutSection01 from '@/Components/About/AboutSection01'
import HeroAbout from '@/Components/About/HeroAbout'
import Service_Section from '@/Components/About/Service_Section'
import TeamSection from '@/Components/About/TeamSection'
import AboutusHome from '@/Components/Home/AboutusHome'
import WebsiteLayout from '@/Layouts/WebsiteLayout'
import { Head } from '@inertiajs/react'
import React from 'react'


function AboutUs() {
  return (
    <>
        <WebsiteLayout>
            <Head title='about us' />
            <HeroAbout />
            <TeamSection />
            <AboutusHome />
            <Service_Section />
        </WebsiteLayout>
    </>
  )
}

export default AboutUs
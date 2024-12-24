import MainService from '@/Components/OurService/MainService'
import WebsiteLayout from '@/Layouts/WebsiteLayout'
import { Head } from '@inertiajs/react'
import React from 'react'

function OurService() {
  return (
    <div>
        <WebsiteLayout>
            <Head title='our services' />
            <MainService />
        </WebsiteLayout>
    </div>
  )
}

export default OurService
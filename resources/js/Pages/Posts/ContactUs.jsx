import React from 'react'
import { Head } from '@inertiajs/react'
import WebsiteLayout from '@/Layouts/WebsiteLayout'
import ContactUsForm from '@/Components/Contact/ContactUsForm'

function ContactUs() {
  return (
    <div>
        <WebsiteLayout>
            <Head title='Contact Us' />
            <ContactUsForm />
        </WebsiteLayout>
    </div>
  )
}

export default ContactUs
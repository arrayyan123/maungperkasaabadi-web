import MainBlog from '@/Components/Blog/MainBlog'
import WebsiteLayout from '@/Layouts/WebsiteLayout'
import React from 'react'

function Blog() {
  return (
    <>
        <WebsiteLayout>
            <MainBlog />
        </WebsiteLayout>
    </>
  )
}

export default Blog
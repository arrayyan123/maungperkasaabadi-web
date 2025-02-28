import MainBlog from '@/Components/Blog/MainBlog';
import WebsiteLayout from '@/Layouts/WebsiteLayout';
import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import HeroBlog from '@/Components/Blog/HeroBlog';
import Index from '../Blog/Index';
import Carousel from '../Blog/Carousel';

function Blog() {
  return (
    <>
      <WebsiteLayout>
        <Head title="Blog" />
        <div>
          <Carousel />
          <Index />
        </div>
      </WebsiteLayout>
    </>
  );
}

export default Blog;
import MainBlog from '@/Components/Blog/MainBlog';
import WebsiteLayout from '@/Layouts/WebsiteLayout';
import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import HeroBlog from '@/Components/Blog/HeroBlog';

function Blog() {
  const [isBlogSelected, setIsBlogSelected] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const handleBlogSelect = (blog) => {
    setIsBlogSelected(true);
    setSelectedBlog(blog);
  };

  const handleBlogDeselect = () => {
    setIsBlogSelected(false);
    setSelectedBlog(null); 
  };

  return (
    <>
      <WebsiteLayout>
        <Head title="Blog" />
        {!isBlogSelected && <HeroBlog onBlogSelect={handleBlogSelect} />}        
        <MainBlog
          isBlogSelected={isBlogSelected}
          selectedBlog={selectedBlog}
          onBlogSelect={handleBlogSelect}
          onBlogDeselect={handleBlogDeselect}
        />
      </WebsiteLayout>
    </>
  );
}

export default Blog;
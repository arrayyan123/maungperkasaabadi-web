import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import IonIcon from '@reacticons/ionicons';
import moment from 'moment';

function MainBlog({ isBlogSelected, selectedBlog, onBlogSelect, onBlogDeselect }) {
  //const [selectedBlog, setSelectedBlog] = useState(null); 
  const [blog, setBlog] = useState([]);

  const fetchBlog = async () => {
    try {
      const response = await fetch('/blogs');
      const data = await response.json();
      setBlog(data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const fetchBlogById = async (blogId) => {
    try {
      const response = await fetch(`/blogs/${blogId}`);
      const data = await response.json();
      setSelectedBlog(data);
    } catch (error) {
      console.error('Error fetching blog by ID:', error);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  return (
    <div>
      <section className="py-6 sm:py-12 dark:bg-gray-100 dark:text-gray-800">
        <div className="container lg:p-6 p-2 mx-auto space-y-8">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold">Blog Terakhir</h2>
          </div>

          {/* Daftar Blog */}
          {!isBlogSelected && (
            <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
              {blog.map((item) => (
                <article
                  key={item.id}
                  className="flex flex-col dark:bg-gray-50 cursor-pointer"
                  onClick={() => onBlogSelect(item)}
                >
                  <a
                    rel="noopener noreferrer"
                    href="#"
                    aria-label={`Buka blog ${item.title}`}
                  >
                    <img
                      alt={item.title}
                      className="object-cover w-full h-52 dark:bg-gray-500"
                      src={`/storage/${item.image}`}
                    />
                  </a>
                  <div className="flex flex-col flex-1 p-6">
                    <h3 className="flex-1 py-2 text-lg font-semibold leading-snug">
                      {item.title}
                    </h3>
                    <div className="flex flex-wrap justify-between pt-3 space-x-2 text-xs dark:text-gray-600">
                      <span>
                        {moment(item.created_at).format('MMMM Do, YYYY, h:mm A')}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Tampilan Blog yang Dipilih */}
          {isBlogSelected && selectedBlog && (
            <div className="lg:p-6 p-2 bg-white shadow-md dark:bg-gray-50">
              <button
                onClick={onBlogDeselect}
                className="mb-4 text-sm text-gray-600 underline"
              >
                Kembali ke daftar blog
              </button>
              <h2 className="text-2xl font-bold mb-4">{selectedBlog.title}</h2>
              <img
                alt={selectedBlog.title}
                className="object-cover w-full h-64 mb-4 dark:bg-gray-500"
                src={`/storage/${selectedBlog.image}`}
              />
              <p className="text-gray-800">
                <div
                  dangerouslySetInnerHTML={{ __html: selectedBlog.description }}
                />
              </p>
              <p className="mt-4 text-sm text-gray-600">
                Dipublikasikan pada: {moment(selectedBlog.created_at).format('MMMM Do, YYYY, h:mm A')}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default MainBlog;

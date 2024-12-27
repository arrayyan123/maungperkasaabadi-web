import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import IonIcon from '@reacticons/ionicons';
import moment from 'moment';

function MainBlog({ isBlogSelected, selectedBlog, onBlogSelect, onBlogDeselect }) {
  const [blog, setBlog] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  const fetchBlog = async () => {
    try {
      const response = await fetch('/blogs');
      const data = await response.json();
      setBlog(data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBlogs = blog.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(blog.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
  };

  return (
    <div>
      <section className="py-6 sm:py-12 dark:bg-gray-100 dark:text-gray-800">
        <div className="container lg:p-6 p-2 mx-auto space-y-8">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold">Blog</h2>
          </div>

          {/* Daftar Blog */}
          {!isBlogSelected && (
            <div>
              <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
                {currentBlogs.map((item) => (
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
                      <div className="relative text-black hover:font-bold cursor-pointer transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-black before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-black after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%] mb-2">
                        <span className="text-xl font-bold leading-tight motion motion-preset-shrink">
                          {item.title}
                        </span>
                      </div>
                      <div className="flex flex-wrap justify-between pt-3 space-x-2 text-xs dark:text-gray-600">
                        <span>
                          {moment(item.created_at).format('MMMM Do, YYYY, h:mm A')}
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
              <div className="flex justify-center mt-4">
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => handlePageChange(index + 1)}
                    className={`mx-1 px-3 py-1 rounded ${currentPage === index + 1
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-700 text-gray-300'
                      }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
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
                  className="prose prose-sm max-w-none"
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

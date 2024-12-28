import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import IonIcon from '@reacticons/ionicons';
import moment from 'moment';
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from "@material-tailwind/react";


function MainProduct({ isProductSelected, selectedProduct, onProductSelect, onProductDeselect }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [modalImage, setModalImage] = useState(null);

  const openModal = (imagePath) => {
    setModalImage(imagePath);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  const fetchProduct = async () => {
    try {
      const response = await fetch('/product_details');
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const handleFilterChange = (type) => {
    setFilterType(type);
    setCurrentPage(1);
    let filtered;
    if (type === 'all') {
      filtered = products;
    } else {
      filtered = products.filter((product) => product.type_product === type);
    }
    const searched = filtered.filter((product) =>
      product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(searched);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
    let filtered;

    if (filterType === 'all') {
      filtered = products;
    } else {
      filtered = products.filter((product) => product.type_product === filterType);
    }
    const searched = filtered.filter((product) =>
      product.product_name.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredProducts(searched);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <section className="py-6 sm:py-12 dark:bg-gray-100 dark:text-gray-800">
        <div className="container lg:p-6 p-2 mx-auto space-y-8">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold">Product</h2>
          </div>

          <div className="flex flex-col gap-5 items-center justify-center mb-4 w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search by product name..."
              className="w-full md:w-1/2 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
            />

            <Tabs value={filterType} className="w-full ">
              <TabsHeader>
                <Tab value="all" onClick={() => handleFilterChange('all')}>
                  All Products
                </Tab>
                <Tab value="itproduct" onClick={() => handleFilterChange('itproduct')}>
                  IT Products
                </Tab>
                <Tab value="nonitproduct" onClick={() => handleFilterChange('nonitproduct')}>
                  Non-IT Products
                </Tab>
              </TabsHeader>
            </Tabs>
          </div>

          {/* Daftar Blog */}
          {!isProductSelected && (
            <div>
              <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
                {currentProducts.map((item) => (
                  <article
                    key={item.id}
                    className="flex flex-col dark:bg-gray-50 cursor-pointer"
                    onClick={() => onProductSelect(item)}
                  >
                    <a
                      rel="noopener noreferrer"
                      href="#"
                      aria-label={`Buka Product Detail ${item.product_name}`}
                    >
                      <div className="w-full h-full">
                        <span className="text-[13px] relative z-40 top-10 left-3 font-bold bg-opacity-55 text-white bg-gray-800 px-3 py-2 rounded-3xl leading-tight motion motion-preset-shrink">
                          {item.type_product === 'nonitproduct' ? 'Non IT Product' : 'IT Product'}                        
                        </span>
                        <div className="">
                          <img
                            alt={item.title}
                            className="object-cover w-full h-52 dark:bg-gray-500"
                            src={`/storage/${item.images?.[0]?.path}`}
                          />
                        </div>
                      </div>
                    </a>
                    <div className="flex flex-col flex-1 p-6">
                      <div className="relative text-black hover:font-bold cursor-pointer transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-black before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-black after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%] mb-2">
                        <span className="text-xl font-bold leading-tight motion motion-preset-shrink">
                          {item.product_name}
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
          {isProductSelected && selectedProduct && (
            <div className="lg:p-6 p-2 bg-white shadow-md dark:bg-gray-50">
              <button
                onClick={onProductDeselect}
                className="mb-4 text-sm text-gray-600 underline"
              >
                Kembali ke Product
              </button>
              <h2 className="text-2xl font-bold mb-4">{selectedProduct.product_name}</h2>
              <p className="my-4 text-sm text-gray-600">
                Dipublikasikan pada: {moment(selectedProduct.created_at).format('MMMM Do, YYYY, h:mm A')}
              </p>
              <img
                src={`/storage/${selectedProduct.images?.[0]?.path}`}
                alt={selectedProduct.title}
                className="object-cover object-center w-full h-full"
              />
              <div className="space-y-6 mt-4">
                {(() => {
                  const paragraphs = selectedProduct.product_description.split('\n\n');
                  const images = selectedProduct.images || [];

                  return Array.from({ length: Math.max(paragraphs.length, images.length) }).map((_, i) => (
                    <React.Fragment key={i}>
                      {/* Render Deskripsi */}
                      {i < paragraphs.length && (
                        <div
                          className="prose prose-sm max-w-none"
                          dangerouslySetInnerHTML={{ __html: paragraphs[i] }}
                        />
                      )}
                    </React.Fragment>
                  ));
                })()}
              </div>
              <div className="bg-white dark:bg-gray-800  h-full py-6 sm:py-8 lg:py-12">
                <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
                  <div className="mb-4 flex items-center justify-between gap-8 sm:mb-8 md:mb-12">
                    <div className="flex items-center gap-12">
                      <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl dark:text-white">Gallery</h2>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6 xl:gap-8">
                    {selectedProduct.images && selectedProduct.images.map((image, index) => {
                      const isFirstInRow = (Math.floor(index / 2) % 2 === 0); // Menentukan pola selang-seling berdasarkan baris
                      const isLeftImage = index % 2 === 0; // Menentukan gambar kiri (kecil) dan kanan (besar)
                      return (
                        <a
                          key={index}
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            openModal(`/storage/${image.path}`);
                          }}
                          className={`group relative flex items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg ${
                            isFirstInRow
                            ? isLeftImage
                              ? 'h-80'
                              : 'md:col-span-2 col-span-1 h-80'
                            : isLeftImage
                            ? 'md:col-span-2 col-span-1 h-80'
                            : 'h-80'
                          }`}
                        >
                          <img
                            src={`/storage/${image.path}`}
                            loading="lazy"
                            alt={`Gallery Image ${index + 1}`}
                            className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                          />

                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>

                          <span className="relative ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg">
                            {image.title || 'foto'}
                          </span>
                        </a>
                      );
                    })}
                  </div>
                </div>
                {modalImage && (
                  <div
                    className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
                    onClick={closeModal} 
                  >
                    <div className="relative">
                      <img
                        src={modalImage}
                        alt="Preview"
                        className="max-w-[90vw] motion-preset-blur-up mx-auto max-h-[90vh] object-contain bg-white"
                      />
                      <p className='text-white mx-3'>{selectedProduct.product_name}</p>
                      <button
                        className="absolute top-0 md:block hidden right-0 p-4 text-white text-3xl"
                        onClick={closeModal} 
                      >
                        &times;
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default MainProduct;

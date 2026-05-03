import React, { useEffect, useState } from 'react';
import { ParallaxProvider, ParallaxBanner } from 'react-scroll-parallax';
import { motion, AnimatePresence } from 'framer-motion';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/scrollbar';
import { FreeMode, Mousewheel } from 'swiper/modules';

function MainProduct({ isProductSelected, selectedProduct, onProductSelect, onProductDeselect, productId }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    if (productId) {
      fetch(`/api/products/${productId}`)
        .then((response) => response.json())
        .then((data) => {
          setProduct(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching product details:', error);
          setLoading(false);
        });
    }
  }, [productId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <span className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></span>
      </div>
    );
  }

  if (!product) {
    return <p className="text-center py-12 text-gray-500">No product selected.</p>;
  }

  const background = {
    image: product.image ? `/storage/${product.image}` : '/default-banner.jpg',
    translateY: [20, 50],
    opacity: [1, 0.3],
    scale: [1, 1.4, "easeOutCubic"],
    shouldAlwaysCompleteAnimation: true,
  };

  const headline = {
    translateY: [0, 30],
    scale: [1, 1.05, "easeOutCubic"],
    shouldAlwaysCompleteAnimation: true,
    expanded: false,
    children: (
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/60 via-transparent to-black/20">
        <motion.h1
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 80, delay: 0.2 }}
          className="text-3xl md:text-5xl text-white font-extrabold text-center tracking-wide drop-shadow-lg"
        >
          {product.type_product}
        </motion.h1>
      </div>
    ),
  };

  // Animasi transisi
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      {/* Header Produk */}
      <div className='z-30 relative lg:-top-0 -top-40'>
        <ParallaxProvider>
          <ParallaxBanner
            layers={[{ ...background }, headline]}
            className="aspect-[2/1] lg:aspect-[2.5/1] shadow-lg overflow-hidden"
          />
        </ParallaxProvider>
      </div>

      {/* Detail Produk / Gallery */}
      <div className="max-w-7xl mx-auto px-4 my-8">
        <AnimatePresence>
          {selectedDetail ? (
            // Detail Produk
            <motion.div
              key="detail-view"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.4 }}
              className="bg-white/90 dark:bg-gray-900/90 rounded-2xl shadow-xl p-6 md:p-10 relative"
            >
              <button
                onClick={() => setSelectedDetail(null)}
                className="absolute top-4 right-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md shadow transition font-semibold z-20"
              >
                Close
              </button>
              <div className="md:flex gap-6">
                <div className="md:w-1/3 w-full mb-4 md:mb-0">
                  <img
                    src={selectedDetail.images[0]?.path ? `/storage/${selectedDetail.images[0].path}` : '/default-thumbnail.png'}
                    alt={selectedDetail.product_detail_name}
                    className="rounded-xl shadow-lg object-cover w-full aspect-square"
                  />
                </div>
                <div className="md:w-2/3 w-full">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{selectedDetail.product_detail_name}</h2>
                  <div
                    className="prose prose-sm md:prose-base dark:prose-invert text-gray-700 dark:text-gray-200 max-w-none"
                    dangerouslySetInnerHTML={{ __html: selectedDetail.product_detail_description }}
                  />
                </div>
              </div>
              {/* Gallery */}
              <div className="mt-8">
                <h3 className="text-lg font-bold mb-3 text-gray-800 dark:text-white">Gallery</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {selectedDetail.images.map((img, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.06 }}
                      className="cursor-pointer group rounded-xl overflow-hidden shadow-md bg-gray-100 dark:bg-gray-800 relative"
                      onClick={() => setModalImage(`/storage/${img.path}`)}
                    >
                      <img
                        src={`/storage/${img.path}`}
                        alt={`Gallery ${idx + 1}`}
                        className="object-cover w-full h-36 group-hover:brightness-90 transition"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 pointer-events-none"></div>
                    </motion.div>
                  ))}
                </div>
              </div>
              {/* Modal Gambar */}
              <AnimatePresence>
                {modalImage && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
                    onClick={() => setModalImage(null)}
                  >
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0.7 }}
                      transition={{ type: 'spring', stiffness: 120 }}
                      className="relative"
                      onClick={e => e.stopPropagation()}
                    >
                      <img
                        src={modalImage}
                        alt="Preview"
                        className="max-w-[90vw] max-h-[80vh] object-contain rounded-xl shadow-2xl bg-white"
                      />
                      <button
                        className="absolute -top-4 -right-4 bg-red-500 text-white text-2xl w-10 h-10 rounded-full shadow-lg flex items-center justify-center"
                        onClick={() => setModalImage(null)}
                      >
                        &times;
                      </button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            // Grid Produk
            <motion.div
              key="swiper-view"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <Swiper
                direction="horizontal"
                slidesPerView={2}
                spaceBetween={16}
                freeMode={true}
                mousewheel={true}
                modules={[FreeMode, Mousewheel]}
                breakpoints={{
                  0: {
                    slidesPerView: 1.1,
                    spaceBetween: 10,
                  },
                  480: {
                    slidesPerView: 1.5,
                    spaceBetween: 14,
                  },
                  768: {
                    slidesPerView: 2.2,
                    spaceBetween: 16,
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                  },
                  1440: {
                    slidesPerView: 4,
                    spaceBetween: 24,
                  },
                }}
                className="!pb-6"
                style={{ overflow: 'visible' }}
              >
                {product.details.map((detail, i) => (
                  <SwiperSlide key={detail.id} className="h-auto">
                    <motion.div
                      whileHover={{ y: -6, scale: 1.03, boxShadow: "0 10px 28px rgba(0,0,0,0.08)" }}
                      transition={{ type: "spring", stiffness: 120 }}
                      className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 cursor-pointer group overflow-hidden"
                      onClick={() => setSelectedDetail(detail)}
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={detail.images[0]?.path ? `/storage/${detail.images[0].path}` : '/default-thumbnail.png'}
                          alt={detail.product_detail_name}
                          className="w-full h-40 object-cover object-center transition group-hover:scale-105 duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 pointer-events-none"></div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white truncate">
                          {detail.product_detail_name}
                        </h3>
                      </div>
                    </motion.div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Info Produk */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.7, delay: 0.1 }}
        className="max-w-7xl mx-auto mt-8 px-4"
      >
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white text-center mb-3">
          {product.type_product}
        </h1>
        <div
          className="prose prose-sm md:prose-base dark:prose-invert mx-auto text-gray-700 dark:text-gray-200 max-w-none"
          dangerouslySetInnerHTML={{ __html: product.description_product }}
        />
      </motion.div>
    </div>
  );
}

export default MainProduct;
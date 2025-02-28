import React, { useEffect, useState } from 'react';
import { Parallax, ParallaxProvider, ParallaxBanner } from 'react-scroll-parallax';

function MainProduct({ isProductSelected, selectedProduct, onProductSelect, onProductDeselect, productId }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [modalImage, setModalImage] = useState(null);
  const [image, setImage] = useState(null);

  const openModal = (imagePath) => {
    setModalImage(imagePath);
  };

  const closeModal = () => {
    setModalImage(null);
  };

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

  const handleCloseDetail = () => {
    setSelectedDetail(null);
  };

  if (loading) {
    return <p>Loading product details...</p>;
  }

  if (!product) {
    return <p>No product selected.</p>;
  }

  const background = {
    image: product.image ? `/storage/${product.image}` : '/default-banner.jpg',
    translateY: [20, 50],
    translateX: [0, 20],
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
        <div className="absolute inset-0 bg-gray-700 bg-opacity-25 flex items-center justify-center">
            <h1 className="text-3xl lg:text-6xl text-center motion-preset-slide-up-lg md:text-4xl text-white font-thin">
                {product.type_product}
            </h1>
        </div>
    ),
};

  return (
    <div className="min-h-80">
      {/* Header utama produk */}
      {!selectedDetail && (
        <div className='flex flex-col'>
          <div className=''>
            {/* <img
              src={`/storage/${product.image}`}
              alt={product.title}
              className="object-cover object-center w-full h-full"
            /> */}
            <ParallaxProvider>
              <ParallaxBanner
                layers={[{ image: background.image, ...background }, headline]}
                className="lg:aspect-[4/1] aspect-[1/2] bg-gray-900"
              />
            </ParallaxProvider>
          </div>
          <div className='p-6 mx-auto'>
            <h1 className="text-2xl font-bold text-black text-center">{product.type_product}</h1>
            <div
              className="prose prose-sm mt-2 text-black max-w-none"
              dangerouslySetInnerHTML={{ __html: product.description_product }}
            />
          </div>
        </div>
      )}

      {/* Grid untuk produk detail */}
      {selectedDetail ? ( // Menampilkan detail jika ada yang dipilih
        <div className="mt-8 p-4 border rounded-lg">
          <button
            onClick={handleCloseDetail}
            className="mb-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Close
          </button>
          <h2 className="text-xl font-bold text-black">{selectedDetail.product_detail_name}</h2>
          <div
            className="prose prose-sm text-black max-w-none"
            dangerouslySetInnerHTML={{ __html: selectedDetail.product_detail_description }}
          />
          <div className="bg-white dark:bg-gray-800  h-full py-6 sm:py-8 lg:py-12">
            <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
              <div className="mb-4 flex items-center justify-between gap-8 sm:mb-8 md:mb-12">
                <div className="flex items-center gap-12">
                  <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl dark:text-white">Gallery</h2>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6 xl:gap-8">
                {selectedDetail.images && selectedDetail.images.map((image, index) => {
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
                      className={`group relative flex items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg ${isFirstInRow
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
                  <p className='text-white mx-3'>{selectedDetail.product_detail_name}</p>
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
      ) : (
        <>
          <div className="grid p-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            {product.details.map((detail) => (
              <div
                key={detail.id}
                className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition"
                onClick={() => setSelectedDetail(detail)}
              >
                <img
                  src={detail.images[0]?.path ? `/storage/${detail.images[0].path}` : '/default-thumbnail.png'}
                  alt={detail.product_detail_name}
                  className="w-full h-32 object-cover rounded-md"
                />
                <h3 className="mt-2 text-lg font-bold">{detail.product_detail_name}</h3>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default MainProduct;

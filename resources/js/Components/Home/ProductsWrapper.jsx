import IonIcon from '@reacticons/ionicons'
import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import { Pagination, Navigation } from 'swiper/modules';
import { Link } from '@inertiajs/react';

function ProductsWrapper() {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Fetch daftar produk
    useEffect(() => {
        fetch('/api/products')
            .then((response) => response.json())
            .then((data) => setProducts(data))
            .catch((error) => console.error('Error fetching products:', error));
    }, []);

    const handleProductSelect = (productId) => {
        setSelectedProduct(productId);
        window.location.href = `/produk-kami?product_id=${productId}`;
    };

    return (
        <div>
            <div className='flex flex-col items-center justify-center my-9'>
                <h1 className='md:text-[45px] text-[30px] font-bold'>Produk Kami</h1>
                <h2 className='md:text-[25px] text-[16px] font-bold'></h2>
                <div className='grid lg:grid-cols-3 w-full md:grid-cols-2 gap-3 grid-cols-1 md:p-10 p-5'>
                    {products.map((product) => (
                        <div
                            className={`group w-full h-[255px] cursor-pointer rounded-[20px] flex items-center justify-center relative bg-[#517EBD]`}
                        >
                            {/* <img
                                className="w-full h-full rounded-[20px] object-cover"
                                src=''
                                alt=''
                            /> */}
                            <div className="absolute inset-0 flex flex-col items-start justify-end hover:motion-preset-blur-up px-4 py-6 group-hover:hidden transition-transform duration-300 group-hover:top-4 group-hover:left-4 group-hover:items-start group-hover:justify-start">
                                <h2 className="text-white lg:text-2xl md:text-xl text-lg font-bold">{product.type_product}</h2>
                            </div>

                            {/* Hover Description */}
                            <div className="absolute inset-0 hover:motion-preset-blur-up bg-black bg-opacity-50 flex flex-col justify-between px-4 py-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[20px] gap-2 items-center">
                                <div className='flex flex-col'>
                                    <h2 className="text-white lg:text-2xl md:text-xl text-lg font-bold">{product.type_product}</h2>
                                </div>
                                <div
                                    className="prose text-white prose-sm max-w-none"
                                    dangerouslySetInnerHTML={{ __html: product.description_product.substring(0, 80) + (product.description_product.length > 80 ? '...' : '') }}
                                />
                                <button
                                    className="bg-[#FBB039] px-4 py-2 rounded-2xl text-white font-bold"
                                    onClick={() => handleProductSelect(product.id)}
                                >
                                    Learn More
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProductsWrapper
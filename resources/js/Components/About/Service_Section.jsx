import React, { useState, useEffect } from 'react'

function Service_Section() {
    const [products, setProducts] = useState([]);
    const [currentTab, setCurrentTab] = useState("");
    const [descriptionProduct, setDescriptionProduct] = useState("");

    // Fetch daftar produk
    useEffect(() => {
        fetch('/api/products') // Endpoint API untuk mengambil data produk
            .then((response) => response.json()) // Mengubah respons menjadi JSON
            .then((data) => {
                setProducts(data); // Menyimpan data produk ke dalam state
                if (data.length > 0) {
                    const firstProduct = data[0];
                    setCurrentTab(firstProduct.type_product); // Mengatur tab default
                    setDescriptionProduct(firstProduct.description_product); // Mengatur deskripsi default
                }
            })
            .catch((error) => console.error('Error fetching products:', error)); // Menangani error jika terjadi
    }, []);

    const handleTabClick = (product) => {
        setCurrentTab(product.type_product); // Mengatur tab yang sedang aktif
        setDescriptionProduct(product.description_product); // Mengatur deskripsi produk yang dipilih
    };

    return (
        <div>
            <div className='flex flex-col items-center justify-center my-9'>
                <h1 className='md:text-[45px] text-[30px] font-bold text-black'>Produk Kami</h1>
                <div className="flex md:flex-row flex-col lg:max-w-6xl w-full p-5">
                    <div className="flex flex-col md:w-1/4 w-full">
                        {/* Menampilkan tabs berdasarkan data produk */}
                        <div className="flex md:flex-col flex-row md:overflow-x-hidden md:overflow-y-auto overflow-y-hidden overflow-x-auto border-gray-200">
                            {products.map((product) => (
                                <button
                                    key={product.type_product} // Gunakan type_product sebagai key
                                    onClick={() => handleTabClick(product)} // Mengatur tab yang sedang aktif
                                    className={`py-2 px-4 text-sm text-left font-medium ${currentTab === product.type_product
                                        ? "border-b-2 border-blue-500 text-blue-500" // Gaya untuk tab yang aktif
                                        : "text-gray-500 hover:text-blue-500" // Gaya untuk tab yang tidak aktif
                                        }`}
                                >
                                    {product.type_product} {/* Menampilkan label dari tab */}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="p-4 w-full min-h-80">
                        {currentTab && (
                            
                            <div className="motion-preset-slide-right-sm">
                                {/* Menampilkan deskripsi produk sesuai dengan tab yang dipilih */}
                                <h3 className="font-bold text-lg motion-preset-slide-right-sm">{currentTab}</h3>
                                <div
                                    className="prose text-black prose-sm max-w-none motion-preset-slide-right-sm motion-delay-200"
                                    dangerouslySetInnerHTML={{ __html: descriptionProduct }}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Service_Section
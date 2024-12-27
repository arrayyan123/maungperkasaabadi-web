import WebsiteLayout from '@/Layouts/WebsiteLayout';
import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import MainProduct from '@/Components/Product/MainProduct';
import HeroProduct from '@/Components/Product/HeroProduct';
import ProductSection01 from '@/Components/Product/ProductSection01';


function ProductDetails() {
  const [isProductSelected, setIsProductSelected] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductSelect = (product) => {
    setIsProductSelected(true);
    setSelectedProduct(product);
  };

  const handleProductDeselect = () => {
    setIsProductSelected(false);
    setSelectedProduct(null); 
  };

  return (
    <>
      <WebsiteLayout>
        <Head title="Product" />
        <ProductSection01 />
        {!isProductSelected && <HeroProduct onProductSelect={handleProductSelect} />}        
        <MainProduct
          isProductSelected={isProductSelected}
          selectedProduct={selectedProduct}
          onProductSelect={handleProductSelect}
          onProductDeselect={handleProductDeselect}
        />
      </WebsiteLayout>
    </>
  );
}

export default ProductDetails;
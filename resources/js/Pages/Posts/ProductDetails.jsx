import WebsiteLayout from '@/Layouts/WebsiteLayout';
import React, { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import MainProduct from '@/Components/Product/MainProduct';
import HeroProduct from '@/Components/Product/HeroProduct';
import ProductSection01 from '@/Components/Product/ProductSection01';

function ProductDetails() {
  const [isProductSelected, setIsProductSelected] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  const { product_id } = usePage().props;

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
        {/* {!isProductSelected &&
          <HeroProduct
            onProductSelect={handleProductSelect}
          />
        } */}
        <MainProduct
          isProductSelected={isProductSelected}
          selectedProduct={selectedProduct}
          onProductSelect={handleProductSelect}
          onProductDeselect={handleProductDeselect}
          productId={product_id}
        />
      </WebsiteLayout>
    </>
  );
}

export default ProductDetails;
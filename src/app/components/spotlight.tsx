import React from 'react';
import type { Product } from '../lib/types';

interface SpotlightProps {
  product: Product;
}

const SpotlightProduct: React.FC<SpotlightProps> = ({ product }) => {
  return (
    <section className="max-w-5xl mx-auto my-12 px-6 py-6 bg-white rounded-xl shadow-md flex flex-col md:flex-row items-center gap-6 relative">
      
      {/* Label top-right */}
      <span className="absolute top-4 right-4 px-3 py-1 bg-green-600 text-white rounded-full text-xs font-semibold tracking-wide z-10">
        Recommended Product
      </span>

      {/* Image on the left */}
      <div className="md:w-1/2">
        <img
          src={product.image_url}          
          alt={product.name}
          className="rounded-lg object-cover w-full h-[300px] md:h-full"
        />
      </div>

      {/* Text content on the right */}
      <div className="md:w-1/2">
        <h2 className="text-3xl font-extrabold mb-3 text-gray-900">{product.name}</h2>
        <p className="text-base text-gray-700 mb-4">{product.description}</p> {/* changed from details */}
        <p className="text-xl font-bold text-green-700">${product.price}</p>
      </div>
    </section>
  );
};

export default SpotlightProduct;

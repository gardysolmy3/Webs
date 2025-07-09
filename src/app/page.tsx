'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from './lib/supabaseClient';
import SpotlightProduct from './components/spotlight';
import { Product } from './lib/types';

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [recommendedProduct, setRecommendedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        console.log('Fetching products from Supabase...');
        const { data, error } = await supabase
          .from('Products')
          .select('*')
          .order('created_at', { ascending: true });

        console.log('Supabase response data:', data);
        console.log('Supabase response error:', error);

        if (error) throw error;
        if (!data || data.length === 0) {
          setError('No products found.');
          setProducts([]);
          setRecommendedProduct(null);
        } else {
          const typedData = data as Product[];
          setProducts(typedData);
          setRecommendedProduct(typedData[3] ?? typedData[0]);
          setError(null);
        }
      } catch (err) {
        setError('Failed to load products.');
        setProducts([]);
        setRecommendedProduct(null);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <main>
      {/* Hero Section */}
      <section className="text-center py-16 px-4 bg-[#f8fafc]">
        <p className="text-xl italic text-gray-600 mb-6">
          “Elevate your presence. One scent at a time.”
        </p>
        <p className="max-w-xl mx-auto text-base text-gray-700">
          Smell-Alta brings you handpicked, high-quality fragrances and wellness products designed
          to help you feel confident, refreshed, and unforgettable. Crafted for those who care
          about style, presence, and self-care.
        </p>
      </section>

      {/* Spotlight Product */}
      {recommendedProduct && <SpotlightProduct product={recommendedProduct} />}

      {/* Loading & Error Messages */}
      {loading && (
        <p className="text-center py-8 text-gray-500" role="status" aria-live="polite">
          Loading products...
        </p>
      )}
      {error && !loading && (
        <p className="text-center py-8 text-red-500" role="alert">
          {error}
        </p>
      )}

      {/* Products Grid */}
      {!loading && !error && (
        <section className="py-10 px-4">
          <h2 className="text-2xl font-bold mb-6">All Products</h2>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/product_list/${product.id}`}
                className="no-underline"
                passHref
              >
                <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-40 object-contain rounded-lg mb-4"
                    loading="lazy"
                  />
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{product.overview}</p>
                  <p className="font-bold text-green-700">${product.price.toFixed(2)}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Why Shop Section */}
      <section className="bg-white py-10 px-4">
        <h2 className="text-2xl font-bold text-center mb-8">Why Shop with Smell-Alta?</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 text-center">
          <div>
            <div className="text-3xl mb-2" aria-hidden="true">🚚</div>
            <h3 className="font-semibold text-lg">Fast Shipping</h3>
            <p className="text-sm text-gray-600">We deliver your scent in 3–5 days max.</p>
          </div>
          <div>
            <div className="text-3xl mb-2" aria-hidden="true">🌿</div>
            <h3 className="font-semibold text-lg">Natural Ingredients</h3>
            <p className="text-sm text-gray-600">Only clean, skin-friendly materials.</p>
          </div>
          <div>
            <div className="text-3xl mb-2" aria-hidden="true">💯</div>
            <h3 className="font-semibold text-lg">Satisfaction Guaranteed</h3>
            <p className="text-sm text-gray-600">If you don’t love it, return it.</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;

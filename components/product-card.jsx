'use client';

import { motion } from 'framer-motion';
import { urlFor } from '@/lib/sanity';

export default function ProductCard({ product }) {
  const handlePurchase = async () => {
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: product.stripePriceId,
          productName: product.name,
        }),
      });

      const { url } = await response.json();
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <motion.div
      className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      {product.image && (
        <img
          src={urlFor(product.image).width(400).height(300).url()}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold">${product.price}</span>
          <button
            onClick={handlePurchase}
            className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Buy Now
          </button>
        </div>
      </div>
    </motion.div>
  );
}

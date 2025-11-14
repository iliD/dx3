import { client } from '@/lib/sanity';
import ProductCard from '@/components/product-card';

export default async function ProductsPage() {
  const products = await client.fetch(`*[_type == "product"] | order(_createdAt desc)`);

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8">Digital Products</h1>
      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600 mb-4">No products available yet.</p>
          <p className="text-gray-500">
            Add products through the{' '}
            <a href="/studio" className="text-black underline">
              CMS Studio
            </a>
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

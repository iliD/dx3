import { client } from '@/lib/sanity';
import ProductCard from '@/components/product-card';

export default async function ProductsPage() {
  const products = await client.fetch(`*[_type == "product"] | order(_createdAt desc)`);

  return (
    <div className="py-12" style={{ marginLeft: 'clamp(1.5rem, 8vw, 6rem)', marginRight: 'clamp(1.5rem, 4vw, 1.5rem)' }}>
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl mb-4">Pricing</h1>
        <p className="text-xl text-gray-600">
          Explore our digital products with instant delivery and lifetime access
        </p>
      </header>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600 mb-4">No products available yet.</p>
          <p className="text-gray-500">
            Check back soon for new offerings.
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

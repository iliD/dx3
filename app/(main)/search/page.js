import { client } from '@/lib/sanity';
import Link from 'next/link';
import { urlFor } from '@/lib/sanity';
import { format } from 'date-fns';

export const metadata = {
  title: 'Search - designDesignsDesign',
  description: 'Search for products, articles, and frameworks',
};

export default async function SearchPage({ searchParams }) {
  const params = await searchParams;
  const query = params?.q || '';

  let results = {
    products: [],
    posts: [],
    frameworks: [],
  };

  if (query) {
    // Search products
    const products = await client.fetch(
      `*[_type == "product" && (name match $query || description match $query)] | order(_createdAt desc)`,
      { query: `${query}*` }
    );

    // Search blog posts
    const posts = await client.fetch(
      `*[_type == "article" && (title match $query || excerpt match $query)] | order(publishedAt desc)`,
      { query: `${query}*` }
    );

    results = {
      products,
      posts,
      frameworks: [], // Framework pages are static, we'll handle separately
    };
  }

  const totalResults = results.products.length + results.posts.length + results.frameworks.length;

  return (
    <div className="py-12" style={{ marginLeft: 'clamp(1.5rem, 8vw, 6rem)', marginRight: 'clamp(1.5rem, 4vw, 1.5rem)' }}>
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl mb-4">Search results</h1>
        {query ? (
          <p className="text-xl text-gray-600">
            {totalResults === 0
              ? `No results found for \u2018${query}\u2019`
              : `${totalResults} ${totalResults === 1 ? 'result' : 'results'} for \u2018${query}\u2019`
            }
          </p>
        ) : (
          <p className="text-xl text-gray-600">
            Enter a search query to find products, articles, and frameworks
          </p>
        )}
      </header>

      {/* Search Form */}
      <form action="/search" method="get" className="mb-12">
        <div className="relative max-w-2xl">
          <input
            type="search"
            name="q"
            defaultValue={query}
            placeholder="Search for products, articles, frameworks..."
            aria-label="Search"
            className="w-full h-12 px-4 pr-12 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded transition-colors"
            aria-label="Search"
          >
            <svg
              className="w-5 h-5 text-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </form>

      {query && totalResults === 0 && (
        <div className="py-12">
          <p className="text-xl text-gray-600">No results found for &lsquo;{query}&rsquo;. Try different keywords.</p>
        </div>
      )}

      {/* Products Results */}
      {results.products.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl mb-6">Products ({results.products.length})</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.products.map((product) => (
              <Link
                key={product._id}
                href={`/products/${product.slug.current}`}
                className="border rounded-lg p-6 hover:shadow-lg transition-shadow bg-white"
              >
                {product.image && (
                  <div className="relative h-48 mb-4 overflow-hidden rounded">
                    <img
                      src={urlFor(product.image).width(400).height(300).url()}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <h3 className="text-xl mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                <p className="text-2xl font-bold">${product.price}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Blog Posts Results */}
      {results.posts.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl mb-6">Articles ({results.posts.length})</h2>
          <div className="space-y-12">
            {results.posts.map((post) => (
              <article key={post._id} className="border-b border-gray-200 pb-12 last:border-b-0">
                <Link href={`/blog/${post.slug.current}`} className="group">
                  <div className="flex items-center gap-4 mb-3">
                    {post.category && (
                      <span className="text-xs font-semibold px-3 py-1 bg-white text-black border border-gray-200 rounded-full">
                        {post.category}
                      </span>
                    )}
                    {post.publishedAt && (
                      <time className="text-sm text-gray-500">
                        {format(new Date(post.publishedAt), 'MMMM dd, yyyy')}
                      </time>
                    )}
                  </div>
                  <h3 className="text-3xl mb-4 group-hover:opacity-70 transition-opacity">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>
                  )}
                  {post.author && (
                    <p className="text-sm text-gray-500">By {post.author}</p>
                  )}
                </Link>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

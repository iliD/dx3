import { client } from '@/lib/sanity';
import BlogCard from '@/components/blog-card';

export const metadata = {
  title: 'Articles - designDesignsDesign',
  description: 'Read our latest articles about digital products, marketing, and business.',
};

export default async function BlogPage({ searchParams }) {
  const params = await searchParams;
  const category = params?.category;

  let query = `*[_type == "blogPost"] | order(publishedAt desc)`;

  if (category) {
    query = `*[_type == "blogPost" && category == "${category}"] | order(publishedAt desc)`;
  }

  const posts = await client.fetch(query);
  const categories = await client.fetch(
    `*[_type == "blogPost" && defined(category)]{category}`
  );

  // Get unique categories
  const uniqueCategories = [...new Set(categories.map((c) => c.category).filter(Boolean))];

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Articles</h1>
        <p className="text-xl text-gray-600">
          Insights, tutorials, and updates about digital products and e-commerce
        </p>
      </div>

      {/* Category Filter */}
      {uniqueCategories.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-3">
          <a
            href="/blog"
            className={`px-4 py-2 rounded-lg transition-colors ${
              !category
                ? 'bg-black text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Posts
          </a>
          {uniqueCategories.map((cat) => (
            <a
              key={cat}
              href={`/blog?category=${cat}`}
              className={`px-4 py-2 rounded-lg transition-colors capitalize ${
                category === cat
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat}
            </a>
          ))}
        </div>
      )}

      {/* Blog Posts Grid */}
      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600 mb-4">No blog posts available yet.</p>
          <p className="text-gray-500">
            Add blog posts through the{' '}
            <a href="/studio" className="text-black underline">
              CMS Studio
            </a>
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}

import { client } from '@/lib/sanity';
import Link from 'next/link';
import { format } from 'date-fns';

export const metadata = {
  title: 'Articles - designDesignsDesign',
  description: 'Read our latest articles about digital products, marketing, and business.',
};

export default async function BlogPage({ searchParams }) {
  const params = await searchParams;
  const category = params?.category;

  let query = `*[_type == "article"] | order(publishedAt desc)`;

  if (category) {
    query = `*[_type == "article" && "${category}" in categories] | order(publishedAt desc)`;
  }

  const posts = await client.fetch(query);
  const categories = await client.fetch(
    `*[_type == "article" && defined(categories)]{categories}`
  );

  // Get unique categories
  const uniqueCategories = [...new Set(categories.flatMap((c) => c.categories || []).filter(Boolean))];

  return (
    <div className="py-12" style={{ marginLeft: 'clamp(1.5rem, 8vw, 6rem)', marginRight: 'clamp(1.5rem, 4vw, 1.5rem)' }}>
      <div className="mb-8">
        <h1 className="text-4xl mb-4">Articles</h1>
        <p className="text-xl text-white">
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
            All posts
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

      {/* Blog Posts List */}
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
        <div className="space-y-12">
          {posts.map((post) => (
            <article key={post._id} className="border-b border-gray-200 pb-12 last:border-b-0">
              <Link href={`/blog/${post.slug.current}`} className="group">
                <div className="flex items-center gap-4 mb-3">
                  {post.category && (
                    <span className="text-xs font-semibold px-3 py-1 bg-white text-black border border-gray-200 rounded-full">
                      {post.category}
                    </span>
                  )}
                  <time className="text-sm text-white">
                    {format(new Date(post.publishedAt), 'MMMM dd, yyyy')}
                  </time>
                </div>
                <h2 className="text-3xl mb-4 text-white group-hover:opacity-70 transition-opacity">
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p className="text-lg text-white mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                )}
                {post.author && (
                  <p className="text-sm text-white">By {post.author}</p>
                )}
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

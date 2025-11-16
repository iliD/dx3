import { client, urlFor } from '@/lib/sanity';
import { PortableText } from '@portabletext/react';
import { format } from 'date-fns';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Portable Text components for custom rendering
const portableTextComponents = {
  types: {
    image: ({ value }) => (
      <div className="my-8">
        <img
          src={urlFor(value).width(800).url()}
          alt={value.alt || 'Blog image'}
          className="rounded-lg w-full"
        />
      </div>
    ),
  },
  block: {
    h1: ({ children }) => <h1 className="text-4xl mt-8 mb-4">{children}</h1>,
    h2: ({ children }) => <h2 className="text-3xl mt-8 mb-4">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl mt-6 mb-3">{children}</h3>,
    h4: ({ children }) => <h4 className="text-xl mt-6 mb-3">{children}</h4>,
    normal: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-black pl-4 my-6 italic text-gray-700">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a href={value.href} className="text-black underline hover:text-gray-700" target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
    code: ({ children }) => (
      <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">{children}</code>
    ),
  },
};

export async function generateMetadata({ params }) {
  const post = await client.fetch(
    `*[_type == "blogPost" && slug.current == $slug][0]`,
    { slug: params.slug }
  );

  if (!post) return {};

  return {
    title: `${post.title} - designDesignsDesign`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }) {
  const post = await client.fetch(
    `*[_type == "blogPost" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      author,
      publishedAt,
      excerpt,
      mainImage,
      category,
      tags,
      body
    }`,
    { slug: params.slug }
  );

  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto px-6 py-12 max-w-4xl">
      {/* Back Button */}
      <Link
        href="/blog"
        className="inline-flex items-center text-gray-600 hover:text-black mb-8 transition-colors"
      >
        ← Back to Articles
      </Link>

      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          {post.category && (
            <span className="text-xs font-semibold px-3 py-1 bg-black text-white rounded-full capitalize">
              {post.category}
            </span>
          )}
          <time className="text-sm text-gray-500">
            {format(new Date(post.publishedAt), 'MMMM dd, yyyy')}
          </time>
        </div>
        <h1 className="text-5xl mb-4">{post.title}</h1>
        <p className="text-xl text-gray-600 mb-4">{post.excerpt}</p>
        <div className="flex items-center text-gray-600">
          <span>By {post.author}</span>
        </div>
      </header>

      {/* Featured Image */}
      {post.mainImage && (
        <div className="mb-12">
          <img
            src={urlFor(post.mainImage).width(1200).height(600).url()}
            alt={post.title}
            className="w-full rounded-lg"
          />
        </div>
      )}

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        <PortableText value={post.body} components={portableTextComponents} />
      </div>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="mt-12 pt-8 border-t">
          <h3 className="text-lg mb-3">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Footer CTA */}
      <div className="mt-12 pt-8 border-t text-center">
        <h3 className="text-2xl mb-4">Ready to get started?</h3>
        <p className="text-gray-600 mb-6">
          Check out our digital products and start your journey today.
        </p>
        <Link
          href="/products"
          className="inline-block bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Browse Products
        </Link>
      </div>
    </article>
  );
}

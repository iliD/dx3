import { client, urlFor } from '@/lib/sanity';
import { PortableText } from '@portabletext/react';
import { format } from 'date-fns';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await client.fetch(
    `*[_type == "article" && slug.current == $slug][0]`,
    { slug }
  );

  if (!post) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: `${post.title} - designDesignsDesign`,
    description: post.excerpt || post.title,
  };
}

const portableTextComponents = {
  types: {
    image: ({ value }) => (
      <div className="my-8">
        <img
          src={urlFor(value).width(800).url()}
          alt={value.alt || 'Article image'}
          className="w-full rounded-lg"
        />
        {value.alt && (
          <p className="text-sm text-gray-500 text-center mt-2">{value.alt}</p>
        )}
      </div>
    ),
  },
  block: {
    h1: ({ children }) => <h1 className="text-4xl font-bold mt-8 mb-4">{children}</h1>,
    h2: ({ children }) => <h2 className="text-3xl font-bold mt-8 mb-4">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl font-bold mt-6 mb-3">{children}</h3>,
    h4: ({ children }) => <h4 className="text-xl font-bold mt-6 mb-3">{children}</h4>,
    normal: ({ children }) => <p className="mb-4 text-lg leading-relaxed font-serif">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 my-6 italic text-gray-700 dark:text-gray-300">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-2 font-serif">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-2 font-serif">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="ml-4 font-serif">{children}</li>,
    number: ({ children }) => <li className="ml-4 font-serif">{children}</li>,
  },
  marks: {
    link: ({ children, value }) => (
      <a href={value.href} className="text-black dark:text-white underline hover:opacity-70" target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono">
        {children}
      </code>
    ),
  },
};

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const post = await client.fetch(
    `*[_type == "article" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      author,
      publishedAt,
      excerpt,
      mainImage,
      body,
      categories
    }`,
    { slug }
  );

  if (!post) {
    notFound();
  }

  return (
    <article className="py-12" style={{ marginLeft: 'clamp(1.5rem, 8vw, 6rem)', marginRight: 'clamp(1.5rem, 4vw, 1.5rem)', maxWidth: '65ch' }}>
      {/* Header */}
      <header className="mb-8">
        {post.categories && post.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.categories.map((category) => (
              <span
                key={category}
                className="text-xs font-semibold px-3 py-1 bg-black dark:bg-white text-white dark:text-black rounded-full capitalize"
              >
                {category}
              </span>
            ))}
          </div>
        )}
        <h1 className="text-5xl mb-4">{post.title}</h1>
        <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
          {post.author && <span>By {post.author}</span>}
          <span>•</span>
          <time>{format(new Date(post.publishedAt), 'MMMM dd, yyyy')}</time>
        </div>
      </header>

      {/* Featured Image */}
      {post.mainImage && (
        <div className="mb-8">
          <img
            src={urlFor(post.mainImage).width(1200).url()}
            alt={post.mainImage.alt || post.title}
            className="w-full rounded-lg"
          />
        </div>
      )}

      {/* Excerpt */}
      {post.excerpt && (
        <div className="text-xl text-gray-700 dark:text-gray-300 mb-8 font-serif">
          {post.excerpt}
        </div>
      )}

      {/* Body */}
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <PortableText value={post.body} components={portableTextComponents} />
      </div>

      {/* Back to blog */}
      <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
        <a
          href="/blog"
          className="inline-flex items-center text-black dark:text-white hover:opacity-70 transition-opacity"
        >
          ← Back to articles
        </a>
      </div>
    </article>
  );
}

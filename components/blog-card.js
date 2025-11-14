'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { urlFor } from '@/lib/sanity';

export default function BlogCard({ post }) {
  return (
    <motion.article
      className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow bg-white"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={`/blog/${post.slug.current}`}>
        {post.mainImage && (
          <div className="relative h-48 overflow-hidden">
            <img
              src={urlFor(post.mainImage).width(600).height(400).url()}
              alt={post.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <div className="p-6">
          <div className="flex items-center gap-3 mb-3">
            {post.category && (
              <span className="text-xs font-semibold px-3 py-1 bg-black text-white rounded-full">
                {post.category}
              </span>
            )}
            <time className="text-sm text-gray-500">
              {format(new Date(post.publishedAt), 'MMM dd, yyyy')}
            </time>
          </div>
          <h3 className="text-xl font-bold mb-2 hover:text-gray-700 transition-colors">
            {post.title}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">By {post.author}</span>
            <span className="text-black font-semibold hover:underline">Read more →</span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

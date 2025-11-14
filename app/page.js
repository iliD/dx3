import Link from 'next/link';
import { client } from '@/lib/sanity';
import BlogCard from '@/components/blog-card';

export default async function Home() {
  // Fetch latest 3 blog posts
  const latestPosts = await client.fetch(
    `*[_type == "blogPost"] | order(publishedAt desc)[0...3]`
  );
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="font-bold mb-6 leading-tight text-center" style={{ fontSize: 'clamp(1.5rem, 6vw, 3rem)' }}>
            Welcome to<br />designDesignsDesign
          </h1>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto" style={{ fontSize: 'clamp(1rem, 3vw, 1.25rem)' }}>
            Discover premium digital products with instant delivery. Built with Next.js, Sanity CMS,
            and Stripe.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-300">
            <Link
              href="/products"
              className="bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-300 whitespace-nowrap w-[50vw] sm:w-auto text-center"
              style={{
                fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
                padding: 'clamp(0.5rem, 2vw, 0.75rem) clamp(1rem, 4vw, 2rem)'
              }}
            >
              View Pricing
            </Link>
            <Link
              href="/studio"
              className="border border-black rounded-lg hover:bg-gray-50 transition-all duration-300 whitespace-nowrap w-[50vw] sm:w-auto text-center"
              style={{
                fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
                padding: 'clamp(0.5rem, 2vw, 0.75rem) clamp(1rem, 4vw, 2rem)'
              }}
            >
              CMS Studio
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="font-bold text-center mb-12" style={{ fontSize: 'clamp(1.25rem, 4vw, 1.875rem)' }}>Tech stack features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 border rounded-lg">
              <h3 className="text-xl font-bold mb-3">Next.js 14+</h3>
              <p className="text-gray-600">
                Modern React framework with App Router, server components, and optimized performance.
              </p>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="text-xl font-bold mb-3">Sanity CMS</h3>
              <p className="text-gray-600">
                Headless CMS for managing products and content with real-time collaboration.
              </p>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="text-xl font-bold mb-3">Stripe Payments</h3>
              <p className="text-gray-600">
                Secure payment processing with support for one-time purchases and subscriptions.
              </p>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="text-xl font-bold mb-3">Vercel Hosting</h3>
              <p className="text-gray-600">
                Zero-config deployment with automatic scaling and edge functions.
              </p>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="text-xl font-bold mb-3">Resend Email</h3>
              <p className="text-gray-600">
                Beautiful transactional emails with React Email templates.
              </p>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="text-xl font-bold mb-3">shadcn/ui</h3>
              <p className="text-gray-600">
                Beautiful, accessible UI components built with Tailwind CSS.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Blog Posts Section */}
      {latestPosts.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl font-bold mb-2">Latest Articles</h2>
                <p className="text-gray-600">
                  Insights, tutorials, and updates about digital products
                </p>
              </div>
              <Link
                href="/blog"
                className="text-black font-semibold hover:underline"
              >
                View all articles →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestPosts.map((post) => (
                <BlogCard key={post._id} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-black text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-bold mb-4" style={{ fontSize: 'clamp(1.25rem, 4vw, 1.875rem)' }}>Ready to get started?</h2>
          <p className="mb-8 text-gray-300" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)' }}>
            Start selling your digital products today with zero monthly fees.
          </p>
          <Link
            href="/studio"
            className="bg-white text-black px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors inline-block"
          >
            Open CMS Studio
          </Link>
        </div>
      </section>
    </div>
  );
}

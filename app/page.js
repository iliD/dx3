import Link from 'next/link';
import { client } from '@/lib/sanity';
import BlogCard from '@/components/blog-card';
import AnimatedWelcome from '@/components/AnimatedWelcome';
import GradientHeading from '@/components/GradientHeading';

export default async function Home() {
  // Fetch latest 3 blog posts
  const latestPosts = await client.fetch(
    `*[_type == "blogPost"] | order(publishedAt desc)[0...3]`
  );
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white dark:from-[#0f0f0f] dark:to-[#1a1a1a] py-20">
        <div className="text-center" style={{ marginLeft: 'clamp(1.5rem, 8vw, 6rem)', marginRight: 'clamp(1.5rem, 4vw, 1.5rem)' }}>
          <GradientHeading className="mb-6 leading-tight text-center" style={{ fontSize: 'clamp(1.5rem, 6vw, 3rem)' }}>
            <AnimatedWelcome /><br />designDesignsDesign
          </GradientHeading>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto" style={{ fontSize: 'clamp(1rem, 3vw, 1.25rem)' }}>
            Discover premium digital products with instant delivery. Built with Next.js, Sanity CMS,
            and Stripe.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-300">
            <Link
              href="/products"
              className="bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-300 whitespace-nowrap w-[50vw] sm:w-auto text-center cursor-pointer"
              style={{
                fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
                padding: 'clamp(0.5rem, 2vw, 0.75rem) clamp(1rem, 4vw, 2rem)'
              }}
            >
              View Pricing
            </Link>
            <Link
              href="/studio"
              className="border border-black dark:border-white rounded-lg hover:bg-gray-50 dark:hover:bg-[#2a2a2a] transition-all duration-300 whitespace-nowrap w-[50vw] sm:w-auto text-center cursor-pointer"
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
        <div style={{ marginLeft: 'clamp(1.5rem, 8vw, 6rem)', marginRight: 'clamp(1.5rem, 4vw, 1.5rem)' }}>
          <h2 className="text-center mb-12" style={{ fontSize: 'clamp(1.25rem, 4vw, 1.875rem)' }}>Tech stack features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 border border-gray-200 dark:border-[#2a2a2a] rounded-lg">
              <h3 className="text-xl mb-3"><a href="https://nextjs.org" target="_blank" rel="noopener noreferrer" className="underline decoration-gray-400/50 dark:decoration-gray-500/50 hover:decoration-gray-700 dark:hover:decoration-gray-300 hover:text-black dark:hover:text-white transition-all cursor-pointer">Next.js</a> 14+</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Modern React framework with App Router, server components, and optimised performance.
              </p>
            </div>
            <div className="p-6 border border-gray-200 dark:border-[#2a2a2a] rounded-lg">
              <h3 className="text-xl mb-3"><a href="https://www.sanity.io" target="_blank" rel="noopener noreferrer" className="underline decoration-gray-400/50 dark:decoration-gray-500/50 hover:decoration-gray-700 dark:hover:decoration-gray-300 hover:text-black dark:hover:text-white transition-all cursor-pointer">Sanity CMS</a></h3>
              <p className="text-gray-600 dark:text-gray-400">
                Headless CMS for managing products and content with real-time collaboration.
              </p>
            </div>
            <div className="p-6 border border-gray-200 dark:border-[#2a2a2a] rounded-lg">
              <h3 className="text-xl mb-3"><a href="https://stripe.com" target="_blank" rel="noopener noreferrer" className="underline decoration-gray-400/50 dark:decoration-gray-500/50 hover:decoration-gray-700 dark:hover:decoration-gray-300 hover:text-black dark:hover:text-white transition-all cursor-pointer">Stripe</a> payments</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Secure payment processing with support for one-time purchases and subscriptions.
              </p>
            </div>
            <div className="p-6 border border-gray-200 dark:border-[#2a2a2a] rounded-lg">
              <h3 className="text-xl mb-3"><a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="underline decoration-gray-400/50 dark:decoration-gray-500/50 hover:decoration-gray-700 dark:hover:decoration-gray-300 hover:text-black dark:hover:text-white transition-all cursor-pointer">Vercel</a> hosting</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Zero-config deployment with automatic scaling and edge functions.
              </p>
            </div>
            <div className="p-6 border border-gray-200 dark:border-[#2a2a2a] rounded-lg">
              <h3 className="text-xl mb-3"><a href="https://resend.com" target="_blank" rel="noopener noreferrer" className="underline decoration-gray-400/50 dark:decoration-gray-500/50 hover:decoration-gray-700 dark:hover:decoration-gray-300 hover:text-black dark:hover:text-white transition-all cursor-pointer">Resend</a> email</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Beautiful transactional emails with React Email templates.
              </p>
            </div>
            <div className="p-6 border border-gray-200 dark:border-[#2a2a2a] rounded-lg">
              <h3 className="text-xl mb-3"><a href="https://ui.shadcn.com" target="_blank" rel="noopener noreferrer" className="underline decoration-gray-400/50 dark:decoration-gray-500/50 hover:decoration-gray-700 dark:hover:decoration-gray-300 hover:text-black dark:hover:text-white transition-all cursor-pointer">shadcn/ui</a></h3>
              <p className="text-gray-600 dark:text-gray-400">
                Beautiful, accessible UI components built with Tailwind CSS.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Blog Posts Section */}
      {latestPosts.length > 0 && (
        <section className="py-20 bg-gray-50 dark:bg-[#0f0f0f]">
          <div style={{ marginLeft: 'clamp(1.5rem, 8vw, 6rem)', marginRight: 'clamp(1.5rem, 4vw, 1.5rem)' }}>
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl mb-2">Latest articles</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Insights, tutorials, and updates about digital products
                </p>
              </div>
              <Link
                href="/blog"
                className="text-black dark:text-white font-semibold underline decoration-gray-400/50 dark:decoration-gray-500/50 hover:decoration-gray-700 dark:hover:decoration-gray-300 transition-all cursor-pointer"
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
      <section className="bg-black dark:bg-white text-white dark:text-black py-20">
        <div className="text-center" style={{ marginLeft: 'clamp(1.5rem, 8vw, 6rem)', marginRight: 'clamp(1.5rem, 4vw, 1.5rem)' }}>
          <h2 className="mb-4" style={{ fontSize: 'clamp(1.25rem, 4vw, 1.875rem)' }}>Ready to get started?</h2>
          <p className="mb-8 text-gray-300 dark:text-gray-700" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)' }}>
            Start selling your digital products today with zero monthly fees.
          </p>
          <Link
            href="/studio"
            className="bg-white dark:bg-black text-black dark:text-white px-8 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-[#0a0a0a] transition-colors inline-block cursor-pointer"
          >
            Open CMS Studio
          </Link>
        </div>
      </section>
    </div>
  );
}

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">Welcome to Your Digital Products Shop</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover premium digital products with instant delivery. Built with Next.js, Sanity CMS,
            and Stripe.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/products"
              className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Browse Products
            </Link>
            <Link
              href="/studio"
              className="border border-black px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              CMS Studio
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Tech Stack Features</h2>
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

      {/* CTA Section */}
      <section className="bg-black text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-gray-300">
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

import Link from 'next/link';

export const metadata = {
  title: 'Frameworks - designDesignsDesign',
  description: 'Explore the frameworks and tools we use to build modern digital products.',
};

export default function FrameworksPage() {
  return (
    <div className="container mx-auto px-6 py-12 max-w-6xl">
      {/* Back Button */}
      <Link
        href="/"
        className="inline-flex items-center text-gray-600 hover:text-black mb-8 transition-colors"
      >
        ← Back to Home
      </Link>

      {/* Header */}
      <header className="mb-12">
        <h1 className="text-5xl font-bold mb-4">Frameworks</h1>
        <p className="text-xl text-gray-600">
          Discover the modern frameworks and tools that power our digital products.
        </p>
      </header>

      {/* Frameworks Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
          <h3 className="text-2xl font-bold mb-3">Next.js</h3>
          <p className="text-gray-600 mb-4">
            The React framework for production with server-side rendering, static site generation, and more.
          </p>
          <a
            href="https://nextjs.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black font-semibold hover:underline"
          >
            Learn more →
          </a>
        </div>

        <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
          <h3 className="text-2xl font-bold mb-3">React</h3>
          <p className="text-gray-600 mb-4">
            A JavaScript library for building user interfaces with component-based architecture.
          </p>
          <a
            href="https://react.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black font-semibold hover:underline"
          >
            Learn more →
          </a>
        </div>

        <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
          <h3 className="text-2xl font-bold mb-3">Tailwind CSS</h3>
          <p className="text-gray-600 mb-4">
            A utility-first CSS framework for rapidly building custom user interfaces.
          </p>
          <a
            href="https://tailwindcss.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black font-semibold hover:underline"
          >
            Learn more →
          </a>
        </div>

        <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
          <h3 className="text-2xl font-bold mb-3">Sanity</h3>
          <p className="text-gray-600 mb-4">
            Headless CMS platform for structured content with real-time collaboration.
          </p>
          <a
            href="https://www.sanity.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black font-semibold hover:underline"
          >
            Learn more →
          </a>
        </div>

        <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
          <h3 className="text-2xl font-bold mb-3">Stripe</h3>
          <p className="text-gray-600 mb-4">
            Payment processing platform for online businesses with powerful APIs.
          </p>
          <a
            href="https://stripe.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black font-semibold hover:underline"
          >
            Learn more →
          </a>
        </div>

        <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
          <h3 className="text-2xl font-bold mb-3">Vercel</h3>
          <p className="text-gray-600 mb-4">
            Platform for frontend developers with zero-configuration deployments.
          </p>
          <a
            href="https://vercel.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black font-semibold hover:underline"
          >
            Learn more →
          </a>
        </div>
      </div>

      {/* Additional Section */}
      <section className="mt-20 pt-12 border-t">
        <h2 className="text-3xl font-bold mb-6">Why These Frameworks?</h2>
        <div className="space-y-4 text-gray-700">
          <p>
            We've carefully selected these frameworks and tools to ensure the best developer experience
            and end-user performance. Each technology in our stack is chosen for its reliability,
            community support, and ability to scale.
          </p>
          <p>
            From Next.js's powerful server-side rendering capabilities to Sanity's flexible content
            management, our tech stack enables us to build fast, modern, and maintainable digital products.
          </p>
        </div>
      </section>
    </div>
  );
}

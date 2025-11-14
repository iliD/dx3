'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden flex flex-col justify-center items-center w-10 h-10 space-y-1.5 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        <span
          className={`block h-0.5 w-6 bg-black transition-all duration-300 ease-out ${
            isOpen ? 'rotate-45 translate-y-2' : ''
          }`}
        />
        <span
          className={`block h-0.5 w-6 bg-black transition-all duration-300 ease-out ${
            isOpen ? 'opacity-0' : ''
          }`}
        />
        <span
          className={`block h-0.5 w-6 bg-black transition-all duration-300 ease-out ${
            isOpen ? '-rotate-45 -translate-y-2' : ''
          }`}
        />
      </button>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 ease-out md:hidden ${
          isOpen ? 'opacity-50 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
        style={{ top: '60px' }}
      />

      {/* Mobile Menu Panel */}
      <div
        className={`fixed right-0 top-0 h-full bg-white border-l shadow-xl transition-transform duration-300 ease-out md:hidden flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          width: 'clamp(280px, 75vw, 400px)',
          top: '60px',
        }}
      >
        <nav className="flex flex-col p-8 space-y-6">
          <Link
            href="/products"
            className="text-xl font-medium hover:text-gray-600 hover:underline transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Pricing
          </Link>
          <Link
            href="/frameworks"
            className="text-xl font-medium hover:text-gray-600 hover:underline transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Frameworks
          </Link>
          <Link
            href="/blog"
            className="text-xl font-medium hover:text-gray-600 hover:underline transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Articles
          </Link>
          <Link
            href="/studio"
            className="text-xl font-medium hover:text-gray-600 hover:underline transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Studio
          </Link>
        </nav>

        {/* Search Section */}
        <div className="px-8 pb-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (query.trim()) {
                router.push(`/search?q=${encodeURIComponent(query.trim())}`);
                setIsOpen(false);
                setQuery('');
              }
            }}
            className="relative"
          >
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              aria-label="Search"
              className="w-full h-10 px-4 pr-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4"
              aria-label="Submit search"
            >
              <svg
                className="w-4 h-4 text-black"
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
          </form>
        </div>
      </div>
    </>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setIsSearchOpen(false);
      setQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-gray-800">
      <div style={{ marginLeft: 'clamp(1.5rem, 8vw, 6rem)', marginRight: 'clamp(1.5rem, 8vw, 6rem)' }}>
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="font-mono text-lg font-bold hover:opacity-70 transition-opacity"
          >
            dDD
          </Link>

          {/* Desktop Navigation - Right aligned, order from right: Search, Theme, Articles, Process */}
          <div className="hidden md:flex items-center gap-6 transition-all duration-200 ease-out">
            <Link
              href="/frameworks"
              className="text-sm font-medium hover:opacity-70 transition-opacity"
            >
              Process
            </Link>
            <Link
              href="/blog"
              className="text-sm font-medium hover:opacity-70 transition-opacity"
            >
              Articles
            </Link>
            <ThemeToggle />

            {/* Search Icon/Input */}
            <div className="relative flex items-center" style={{ width: isSearchOpen ? '12rem' : '18px', transition: 'width 200ms ease-out' }}>
              <div className="absolute right-0 flex items-center">
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="hover:opacity-70 transition-opacity"
                  aria-label="Open search"
                  style={{ opacity: isSearchOpen ? 0 : 1, pointerEvents: isSearchOpen ? 'none' : 'auto' }}
                >
                  <Search className="w-[18px] h-[18px]" />
                </button>
              </div>
              {isSearchOpen && (
                <form onSubmit={handleSearch} className="w-full relative">
                  <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onBlur={() => {
                      if (!query.trim()) {
                        setTimeout(() => setIsSearchOpen(false), 150);
                      }
                    }}
                    placeholder="Search..."
                    autoFocus
                    className="w-full h-9 pl-3 pr-9 text-sm border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-[#2a2a2a] focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100"
                    aria-label="Search"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 hover:opacity-70 transition-opacity"
                    aria-label="Submit search"
                  >
                    <Search className="w-[18px] h-[18px]" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex flex-col justify-center items-center w-10 h-10 space-y-1.5 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100 focus:ring-offset-2 rounded"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              <span
                className={`block h-0.5 w-6 bg-gray-900 dark:bg-gray-100 transition-all duration-300 ease-out ${
                  isOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-gray-900 dark:bg-gray-100 transition-all duration-300 ease-out ${
                  isOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-gray-900 dark:bg-gray-100 transition-all duration-300 ease-out ${
                  isOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 ease-out md:hidden ${
          isOpen ? 'opacity-50 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
        style={{ top: '64px' }}
      />

      {/* Mobile Menu Panel */}
      <div
        className={`fixed right-0 top-0 h-full bg-white dark:bg-[#1a1a1a] border-l border-gray-200 dark:border-gray-800 shadow-xl transition-transform duration-300 ease-out md:hidden flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          width: 'clamp(280px, 75vw, 400px)',
          top: '64px',
        }}
      >
        <nav className="flex flex-col p-8 space-y-6">
          <Link
            href="/blog"
            className="text-xl font-medium hover:opacity-70 transition-opacity"
            onClick={() => setIsOpen(false)}
          >
            Articles
          </Link>
          <Link
            href="/frameworks"
            className="text-xl font-medium hover:opacity-70 transition-opacity"
            onClick={() => setIsOpen(false)}
          >
            Process
          </Link>
        </nav>

        {/* Mobile Search Section */}
        <div className="px-8 pb-8">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              aria-label="Search"
              className="w-full h-10 px-4 pr-10 text-sm border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-[#2a2a2a] focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100 transition-all"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2"
              aria-label="Submit search"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}

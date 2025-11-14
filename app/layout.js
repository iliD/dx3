import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import MobileNav from '@/components/MobileNav';
import DesktopSearch from '@/components/DesktopSearch';
import ThemeToggle from '@/components/ThemeToggle';
import CommandPalette from '@/components/CommandPalette';
import { ThemeProvider } from '@/components/ThemeProvider';
import { IBM_Plex_Sans, IBM_Plex_Serif, IBM_Plex_Mono } from 'next/font/google';

const ibmPlexSans = IBM_Plex_Sans({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-ibm-plex-sans',
  display: 'swap',
});

const ibmPlexSerif = IBM_Plex_Serif({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-ibm-plex-serif',
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
});

export const metadata = {
  title: 'designDesignsDesign',
  description: 'Premium digital products with instant delivery',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${ibmPlexSans.variable} ${ibmPlexSerif.variable} ${ibmPlexMono.variable}`} suppressHydrationWarning>
      <body className="bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-gray-100 transition-colors">
        <ThemeProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:bg-white dark:focus:bg-[#2a2a2a] focus:p-4 focus:underline"
          >
            Skip to main content
          </a>
          <nav className="border-b border-gray-200 dark:border-[#2a2a2a]">
            <div className="py-4 flex justify-between items-center" style={{ marginLeft: 'clamp(1.5rem, 8vw, 6rem)', marginRight: 'clamp(1.5rem, 4vw, 1.5rem)' }}>
              <a href="/" className="text-xl font-bold cursor-pointer">
                dDD
              </a>

              {/* Desktop Navigation */}
              <div className="hidden md:flex gap-6 items-center">
                <a href="/products" className="hover:underline cursor-pointer">
                  Pricing
                </a>
                <a href="/frameworks" className="hover:underline cursor-pointer">
                  Frameworks
                </a>
                <a href="/blog" className="hover:underline cursor-pointer">
                  Articles
                </a>
                <a href="/studio" className="hover:underline cursor-pointer">
                  Studio
                </a>
                <DesktopSearch />
                <ThemeToggle />
              </div>

              {/* Mobile Navigation */}
              <MobileNav />
            </div>
          </nav>
          <main id="main-content">
            {children}
          </main>
          <footer className="border-t border-gray-200 dark:border-[#2a2a2a] mt-20 bg-gray-50 dark:bg-[#0f0f0f]">
            <div className="py-12" style={{ marginLeft: 'clamp(1.5rem, 8vw, 6rem)', marginRight: 'clamp(1.5rem, 4vw, 1.5rem)' }}>
              <div className="grid md:grid-cols-3 gap-12 mb-8">
                {/* Company Info */}
                <div>
                  <h2 className="mb-4 text-base">designDesignsDesign</h2>
                  <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                    <p>London, United Kingdom</p>
                    <p>+44 20 1234 5678</p>
                    <p>hello@designdesignsdesign.com</p>
                    <p className="mt-2">Monday – Friday: <span className="whitespace-nowrap">9:00 AM – 6:00 PM GMT</span></p>
                  </div>
                </div>

                {/* Quick Links */}
                <div>
                  <h2 className="mb-4 text-base">Quick links</h2>
                  <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <li>
                      <a href="/products" className="underline decoration-gray-400/50 dark:decoration-gray-500/50 hover:decoration-gray-700 dark:hover:decoration-gray-300 hover:text-black dark:hover:text-white transition-all cursor-pointer">
                        Pricing
                      </a>
                    </li>
                    <li>
                      <a href="/frameworks" className="underline decoration-gray-400/50 dark:decoration-gray-500/50 hover:decoration-gray-700 dark:hover:decoration-gray-300 hover:text-black dark:hover:text-white transition-all cursor-pointer">
                        Frameworks
                      </a>
                    </li>
                    <li>
                      <a href="/blog" className="underline decoration-gray-400/50 dark:decoration-gray-500/50 hover:decoration-gray-700 dark:hover:decoration-gray-300 hover:text-black dark:hover:text-white transition-all cursor-pointer">
                        Articles
                      </a>
                    </li>
                    <li>
                      <a href="/studio" className="underline decoration-gray-400/50 dark:decoration-gray-500/50 hover:decoration-gray-700 dark:hover:decoration-gray-300 hover:text-black dark:hover:text-white transition-all cursor-pointer">
                        Studio
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Legal & Info */}
                <div>
                  <h2 className="mb-4 text-base">Information</h2>
                  <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <li>
                      <a href="/contact" className="underline decoration-gray-400/50 dark:decoration-gray-500/50 hover:decoration-gray-700 dark:hover:decoration-gray-300 hover:text-black dark:hover:text-white transition-all cursor-pointer">
                        Contact Us
                      </a>
                    </li>
                    <li>
                      <a href="/colophon" className="underline decoration-gray-400/50 dark:decoration-gray-500/50 hover:decoration-gray-700 dark:hover:decoration-gray-300 hover:text-black dark:hover:text-white transition-all cursor-pointer">
                        Colophon
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Bottom Bar */}
              <div className="border-t border-gray-200 dark:border-[#2a2a2a] pt-8 text-center text-sm text-gray-700 dark:text-gray-300">
                <div className="flex flex-col items-center justify-center gap-2">
                  <p>&copy; 2025 designDesignsDesign.</p>
                  <p>
                    Made with{' '}
                    <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer" className="underline decoration-gray-400/50 dark:decoration-gray-500/50 hover:decoration-gray-700 dark:hover:decoration-gray-300 hover:text-black dark:hover:text-white transition-all cursor-pointer">
                      Next.js<span className="sr-only"> (opens in new tab)</span>
                    </a>
                    {' + '}
                    <a href="https://www.sanity.io" target="_blank" rel="noopener noreferrer" className="underline decoration-gray-400/50 dark:decoration-gray-500/50 hover:decoration-gray-700 dark:hover:decoration-gray-300 hover:text-black dark:hover:text-white transition-all cursor-pointer">
                      Sanity<span className="sr-only"> (opens in new tab)</span>
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </footer>
          <CommandPalette />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}

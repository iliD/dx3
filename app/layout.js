import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import MobileNav from '@/components/MobileNav';
import DesktopSearch from '@/components/DesktopSearch';
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
    <html lang="en" className={`${ibmPlexSans.variable} ${ibmPlexSerif.variable} ${ibmPlexMono.variable}`}>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:bg-white focus:p-4 focus:underline"
        >
          Skip to main content
        </a>
        <nav className="border-b">
          <div className="py-4 flex justify-between items-center" style={{ marginLeft: 'clamp(1.5rem, 8vw, 6rem)', marginRight: 'clamp(1.5rem, 4vw, 1.5rem)' }}>
            <a href="/" className="text-xl font-bold">
              designDesignsDesign
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex gap-6 items-center">
              <a href="/products" className="hover:underline">
                Pricing
              </a>
              <a href="/frameworks" className="hover:underline">
                Frameworks
              </a>
              <a href="/blog" className="hover:underline">
                Articles
              </a>
              <a href="/studio" className="hover:underline">
                Studio
              </a>
              <DesktopSearch />
            </div>

            {/* Mobile Navigation */}
            <MobileNav />
          </div>
        </nav>
        <main id="main-content">
          {children}
        </main>
        <footer className="border-t mt-20 bg-gray-50">
          <div className="py-12" style={{ marginLeft: 'clamp(1.5rem, 8vw, 6rem)', marginRight: 'clamp(1.5rem, 4vw, 1.5rem)' }}>
            <div className="grid md:grid-cols-3 gap-12 mb-8">
              {/* Company Info */}
              <div>
                <h2 className="mb-4 text-base">designDesignsDesign</h2>
                <div className="space-y-1 text-sm text-gray-700">
                  <p>London, United Kingdom</p>
                  <p>+44 20 1234 5678</p>
                  <p>hello@designdesignsdesign.com</p>
                  <p className="mt-2">Monday - Friday: <span className="whitespace-nowrap">9:00 AM - 6:00 PM GMT</span></p>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h2 className="mb-4 text-base">Quick links</h2>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>
                    <a href="/products" className="underline hover:no-underline hover:text-black transition-colors">
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a href="/frameworks" className="underline hover:no-underline hover:text-black transition-colors">
                      Frameworks
                    </a>
                  </li>
                  <li>
                    <a href="/blog" className="underline hover:no-underline hover:text-black transition-colors">
                      Articles
                    </a>
                  </li>
                  <li>
                    <a href="/studio" className="underline hover:no-underline hover:text-black transition-colors">
                      Studio
                    </a>
                  </li>
                </ul>
              </div>

              {/* Legal & Info */}
              <div>
                <h2 className="mb-4 text-base">Information</h2>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>
                    <a href="/contact" className="underline hover:no-underline hover:text-black transition-colors">
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <a href="/colophon" className="underline hover:no-underline hover:text-black transition-colors">
                      Colophon
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t pt-8 text-center text-sm text-gray-700">
              <div className="flex flex-col items-center justify-center gap-2">
                <p>&copy; 2025 designDesignsDesign.</p>
                <p>
                  Made with{' '}
                  <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline hover:text-black transition-colors">
                    Next.js<span className="sr-only"> (opens in new tab)</span>
                  </a>
                  {' + '}
                  <a href="https://www.sanity.io" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline hover:text-black transition-colors">
                    Sanity<span className="sr-only"> (opens in new tab)</span>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}

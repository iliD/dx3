import './globals.css';
import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: 'designDesignsDesign',
  description: 'Premium digital products with instant delivery',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav className="border-b">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <a href="/" className="text-xl font-bold">
              designDesignsDesign
            </a>
            <div className="flex gap-6">
              <a href="/products" className="hover:underline">
                Pricing
              </a>
              <a href="/blog" className="hover:underline">
                Articles
              </a>
              <a href="/studio" className="hover:underline">
                Studio
              </a>
            </div>
          </div>
        </nav>
        {children}
        <footer className="border-t mt-20 bg-gray-50">
          <div className="container mx-auto px-6 py-12">
            <div className="grid md:grid-cols-3 gap-12 mb-8">
              {/* Company Info */}
              <div>
                <h3 className="text-xl font-bold mb-4">designDesignsDesign</h3>
                <p className="text-gray-600 mb-4 italic">
                  "Crafting digital experiences that inspire and convert"
                </p>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>London, United Kingdom</p>
                  <p>+44 20 1234 5678</p>
                  <p>hello@designdesignsdesign.com</p>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>
                    <a href="/products" className="hover:text-black transition-colors">
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a href="/blog" className="hover:text-black transition-colors">
                      Articles
                    </a>
                  </li>
                  <li>
                    <a href="/studio" className="hover:text-black transition-colors">
                      Studio
                    </a>
                  </li>
                </ul>
              </div>

              {/* Legal & Info */}
              <div>
                <h4 className="font-semibold mb-4">Information</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>
                    <a href="/contact" className="hover:text-black transition-colors">
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <a href="/colophon" className="hover:text-black transition-colors">
                      Colophon
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t pt-8 text-center text-sm text-gray-600">
              <p>&copy; 2025 designDesignsDesign. Built with Next.js & Sanity.</p>
            </div>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}

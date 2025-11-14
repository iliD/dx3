import './globals.css';
import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: 'Digital Products Shop',
  description: 'Premium digital products with instant delivery',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav className="border-b">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <a href="/" className="text-xl font-bold">
              Digital Shop
            </a>
            <div className="flex gap-6">
              <a href="/products" className="hover:underline">
                Products
              </a>
              <a href="/studio" className="hover:underline">
                Studio
              </a>
            </div>
          </div>
        </nav>
        {children}
        <footer className="border-t mt-20">
          <div className="container mx-auto px-6 py-8 text-center text-gray-600">
            <p>&copy; 2024 Digital Products Shop. Built with Next.js & Sanity.</p>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}

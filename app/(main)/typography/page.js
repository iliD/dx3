import CodeBlock from '@/components/CodeBlock';

export const metadata = {
  title: 'Typography - designDesignsDesign',
  description: 'A showcase of our typography system using IBM Plex typeface family.',
};

export default function TypographyPage() {
  return (
    <div className="py-12 bg-white dark:bg-[#1a1a1a]" style={{ marginLeft: 'clamp(1.5rem, 8vw, 6rem)', marginRight: 'clamp(1.5rem, 4vw, 1.5rem)' }}>
      {/* Hero Section */}
      <section className="mb-20">
        <div className="max-w-4xl">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight text-gray-900 dark:text-gray-100">
            IBM Plex
          </h1>
          <p className="text-2xl md:text-3xl text-gray-600 dark:text-gray-400 mb-8">
            A typeface carefully designed to meet IBM's needs as a global technology company and express their brand spirit, beliefs and design principles.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://fonts.google.com/specimen/IBM+Plex+Sans"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors inline-block cursor-pointer font-semibold"
            >
              View on Google Fonts
            </a>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="mb-20">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl">
          <div className="border border-gray-200 dark:border-[#2a2a2a] rounded-lg p-6">
            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">Sans Serif</h3>
            <p className="text-gray-600 dark:text-gray-400">
              A versatile sans serif with a neutral yet friendly appearance. Perfect for UI, body text, and headlines.
            </p>
          </div>
          <div className="border border-gray-200 dark:border-[#2a2a2a] rounded-lg p-6">
            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">Serif</h3>
            <p className="text-gray-600 dark:text-gray-400 font-serif">
              A contemporary serif with excellent readability. Ideal for editorial content and long-form reading.
            </p>
          </div>
          <div className="border border-gray-200 dark:border-[#2a2a2a] rounded-lg p-6">
            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">Mono</h3>
            <p className="text-gray-600 dark:text-gray-400 font-mono">
              A monospaced variant designed for code. Clear distinction between similar characters like 0 and O.
            </p>
          </div>
        </div>
      </section>

      {/* Type Specimen - Sans */}
      <section className="mb-20 py-12 border-t border-gray-200 dark:border-[#2a2a2a]">
        <h2 className="text-3xl font-bold mb-12 text-gray-900 dark:text-gray-100">IBM Plex Sans</h2>

        {/* Weights */}
        <div className="space-y-8 mb-12">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-500 mb-2">Regular (400)</p>
            <p className="text-4xl">The quick brown fox jumps over the lazy dog</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-500 mb-2">Bold (700)</p>
            <p className="text-4xl font-bold">The quick brown fox jumps over the lazy dog</p>
          </div>
        </div>

        {/* Size Scale */}
        <div className="space-y-6">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-500 mb-2">48px / 3rem</p>
            <p className="text-5xl">Design with purpose</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-500 mb-2">40px / 2.5rem</p>
            <p className="text-4xl">Design with purpose</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-500 mb-2">32px / 2rem</p>
            <p className="text-3xl">Design with purpose</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-500 mb-2">24px / 1.5rem</p>
            <p className="text-2xl">Design with purpose</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-500 mb-2">20px / 1.25rem</p>
            <p className="text-xl">Design with purpose</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-500 mb-2">16px / 1rem</p>
            <p className="text-base">Design with purpose</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-500 mb-2">14px / 0.875rem</p>
            <p className="text-sm">Design with purpose</p>
          </div>
        </div>
      </section>

      {/* Type Specimen - Serif */}
      <section className="mb-20 py-12 border-t border-gray-200 dark:border-[#2a2a2a]">
        <h2 className="text-3xl font-bold mb-12 text-gray-900 dark:text-gray-100">IBM Plex Serif</h2>

        <div className="space-y-8 mb-12 font-serif">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-500 mb-2">Regular (400)</p>
            <p className="text-4xl">The quick brown fox jumps over the lazy dog</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-500 mb-2">Bold (700)</p>
            <p className="text-4xl font-bold">The quick brown fox jumps over the lazy dog</p>
          </div>
        </div>

        <div className="max-w-3xl font-serif">
          <p className="text-xl leading-relaxed text-gray-700 dark:text-gray-300">
            IBM Plex Serif is a sophisticated typeface that brings warmth and elegance to digital experiences.
            With its balanced proportions and excellent readability, it's perfect for editorial content,
            long-form articles, and anywhere you need to create a sense of authority and trustworthiness.
          </p>
        </div>
      </section>

      {/* Type Specimen - Mono */}
      <section className="mb-20 py-12 border-t border-gray-200 dark:border-[#2a2a2a]">
        <h2 className="text-3xl font-bold mb-12 text-gray-900 dark:text-gray-100">IBM Plex Mono</h2>

        <div className="space-y-8 mb-12 font-mono">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-500 mb-2">Regular (400)</p>
            <p className="text-4xl">The quick brown fox jumps over the lazy dog</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-500 mb-2">Bold (700)</p>
            <p className="text-4xl font-bold">The quick brown fox jumps over the lazy dog</p>
          </div>
        </div>

        {/* Code Example */}
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">Code sample</p>
          <CodeBlock
            language="javascript"
            code={`function calculateTotal(items) {
  return items.reduce((sum, item) => {
    return sum + (item.price * item.quantity);
  }, 0);
}

const cart = [
  { name: 'Product A', price: 29.99, quantity: 2 },
  { name: 'Product B', price: 49.99, quantity: 1 }
];

const total = calculateTotal(cart);
console.log(\`Total: $\${total.toFixed(2)}\`);`}
          />
        </div>
      </section>

      {/* Character Set */}
      <section className="mb-20 py-12 border-t border-gray-200 dark:border-[#2a2a2a]">
        <h2 className="text-3xl font-bold mb-12 text-gray-900 dark:text-gray-100">Character Set</h2>

        <div className="space-y-12">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">Uppercase</p>
            <p className="text-3xl tracking-wider">
              ABCDEFGHIJKLMNOPQRSTUVWXYZ
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">Lowercase</p>
            <p className="text-3xl tracking-wider">
              abcdefghijklmnopqrstuvwxyz
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">Numbers</p>
            <p className="text-3xl tracking-wider">
              0123456789
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">Special Characters</p>
            <p className="text-3xl tracking-wider">
              !@#$%^&*()_+-=[]{}|;':",./&lt;&gt;?
            </p>
          </div>
        </div>
      </section>

      {/* Usage Guidelines */}
      <section className="mb-20 py-12 border-t border-gray-200 dark:border-[#2a2a2a]">
        <h2 className="text-3xl font-bold mb-12 text-gray-900 dark:text-gray-100">Usage Guidelines</h2>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl">
          <div>
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Do</h3>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400">
              <li className="before:content-['✓_'] before:text-gray-500 dark:before:text-gray-500 before:mr-2">
                Use IBM Plex Sans for UI elements and body text
              </li>
              <li className="before:content-['✓_'] before:text-gray-500 dark:before:text-gray-500 before:mr-2">
                Maintain consistent line heights for readability
              </li>
              <li className="before:content-['✓_'] before:text-gray-500 dark:before:text-gray-500 before:mr-2">
                Use appropriate font weights to establish hierarchy
              </li>
              <li className="before:content-['✓_'] before:text-gray-500 dark:before:text-gray-500 before:mr-2">
                Pair IBM Plex Mono with code examples
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Don't</h3>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400">
              <li className="before:content-['✗_'] before:text-gray-500 dark:before:text-gray-500 before:mr-2">
                Mix multiple typeface families in the same context
              </li>
              <li className="before:content-['✗_'] before:text-gray-500 dark:before:text-gray-500 before:mr-2">
                Use font sizes below 14px for body text
              </li>
              <li className="before:content-['✗_'] before:text-gray-500 dark:before:text-gray-500 before:mr-2">
                Apply excessive letter spacing to body text
              </li>
              <li className="before:content-['✗_'] before:text-gray-500 dark:before:text-gray-500 before:mr-2">
                Use all caps for long passages of text
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Pairing Examples */}
      <section className="py-12 border-t border-gray-200 dark:border-[#2a2a2a]">
        <h2 className="text-3xl font-bold mb-12 text-gray-900 dark:text-gray-100">Type Pairing</h2>

        <div className="space-y-16 max-w-3xl">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">Heading + Body</p>
            <h3 className="text-4xl font-bold mb-4">Design Systems at Scale</h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Building and maintaining design systems requires careful consideration of typography,
              colour, spacing, and component architecture. IBM Plex provides the foundation for
              creating cohesive digital experiences that scale across platforms and teams.
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">Serif Heading + Sans Body</p>
            <h3 className="text-4xl font-bold font-serif mb-4">The Art of Typography</h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Typography is more than selecting fonts — it's about creating hierarchies,
              establishing rhythm, and guiding readers through content. The combination of
              serif headlines with sans-serif body text creates visual interest while
              maintaining excellent readability.
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">Technical Content</p>
            <h3 className="text-4xl font-bold mb-4">Installation Guide</h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
              Install IBM Plex using npm or link directly from Google Fonts:
            </p>
            <CodeBlock
              language="bash"
              code="npm install @ibm/plex"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

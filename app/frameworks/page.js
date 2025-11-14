import Link from 'next/link';

export const metadata = {
  title: 'Frameworks - designDesignsDesign',
  description: 'Explore the frameworks and tools we use to build modern digital products.',
};

export default function FrameworksPage() {
  return (
    <div className="py-12 max-w-6xl" style={{ marginLeft: 'clamp(1.5rem, 8vw, 6rem)', marginRight: 'clamp(1.5rem, 4vw, 1.5rem)' }}>
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl mb-4">Frameworks</h1>
        <p className="text-xl text-gray-600">
          Discover the modern frameworks and tools that power our digital products.
        </p>
      </header>

      {/* Framework Categories */}
      <div className="space-y-4">
        <div>
          <Link href="/frameworks/process" className="text-2xl font-bold underline hover:no-underline cursor-pointer">
            Process
          </Link>
        </div>

        <div>
          <Link href="/frameworks/guardrails" className="text-2xl font-bold underline hover:no-underline cursor-pointer">
            Guardrails
          </Link>
        </div>

        <div>
          <Link href="/frameworks/documentation" className="text-2xl font-bold underline hover:no-underline cursor-pointer">
            Documentation
          </Link>
        </div>

        <div>
          <div className="text-2xl font-bold mb-3">Toolchain</div>
          <div className="ml-6 space-y-2">
            <div>
              <Link href="/frameworks/environments" className="text-lg text-gray-700 dark:text-gray-300 underline hover:no-underline hover:text-black dark:hover:text-white transition-colors cursor-pointer">
                Environments
              </Link>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

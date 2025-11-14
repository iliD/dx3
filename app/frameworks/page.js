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
        <h1 className="text-4xl font-bold mb-4">Frameworks</h1>
        <p className="text-xl text-gray-600">
          Discover the modern frameworks and tools that power our digital products.
        </p>
      </header>

      {/* Framework Categories */}
      <div className="space-y-4">
        <div>
          <Link href="/frameworks/process" className="text-2xl font-bold underline hover:no-underline">
            Process
          </Link>
        </div>

        <div>
          <Link href="/frameworks/guardrails" className="text-2xl font-bold underline hover:no-underline">
            Guardrails
          </Link>
        </div>

        <div>
          <Link href="/frameworks/documentation" className="text-2xl font-bold underline hover:no-underline">
            Documentation
          </Link>
        </div>

        <div>
          <Link href="/frameworks/toolchain" className="text-2xl font-bold underline hover:no-underline">
            Toolchain
          </Link>
        </div>
      </div>

    </div>
  );
}

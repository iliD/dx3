import Link from 'next/link';

export const metadata = {
  title: 'Process - designDesignsDesign',
  description: 'Explore the frameworks and tools we use to build modern digital products.',
};

export default function FrameworksPage() {
  return (
    <div className="py-12 max-w-6xl" style={{ marginLeft: 'clamp(1.5rem, 8vw, 6rem)', marginRight: 'clamp(1.5rem, 4vw, 1.5rem)' }}>
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl mb-4">Process</h1>
        <p className="text-xl text-gray-600">
          Discover the modern frameworks and tools that power our digital products.
        </p>
      </header>

      {/* Framework Categories */}
      <div className="space-y-3">
        <div>
          <div className="text-sm text-gray-900 dark:text-gray-100 mb-2">Process</div>
          <div className="space-y-2">
            <div className="before:content-['–_'] before:text-gray-400">
              <Link href="/frameworks/process/originating" className="text-sm text-gray-700 dark:text-gray-300 underline decoration-gray-400/50 dark:decoration-gray-500/50 hover:decoration-gray-700 dark:hover:decoration-gray-300 hover:text-black dark:hover:text-white transition-all cursor-pointer">
                Originating
              </Link>
            </div>
            <div className="before:content-['–_'] before:text-gray-400">
              <Link href="/frameworks/process/building-deploying" className="text-sm text-gray-700 dark:text-gray-300 underline decoration-gray-400/50 dark:decoration-gray-500/50 hover:decoration-gray-700 dark:hover:decoration-gray-300 hover:text-black dark:hover:text-white transition-all cursor-pointer">
                Building and deploying
              </Link>
            </div>
            <div className="before:content-['–_'] before:text-gray-400">
              <Link href="/frameworks/process/decisioning" className="text-sm text-gray-700 dark:text-gray-300 underline decoration-gray-400/50 dark:decoration-gray-500/50 hover:decoration-gray-700 dark:hover:decoration-gray-300 hover:text-black dark:hover:text-white transition-all cursor-pointer">
                Decisioning
              </Link>
            </div>
          </div>
        </div>

        <div>
          <div className="text-sm text-gray-900 dark:text-gray-100 mb-2">Guardrails</div>
          <div className="space-y-2">
            <div className="before:content-['–_'] before:text-gray-400">
              <Link href="/frameworks/guardrails/directives-principles" className="text-sm text-gray-700 dark:text-gray-300 underline decoration-gray-400/50 dark:decoration-gray-500/50 hover:decoration-gray-700 dark:hover:decoration-gray-300 hover:text-black dark:hover:text-white transition-all cursor-pointer">
                Directives and principles
              </Link>
            </div>
            <div className="before:content-['–_'] before:text-gray-400">
              <Link href="/frameworks/guardrails/better-outcomes" className="text-sm text-gray-700 dark:text-gray-300 underline decoration-gray-400/50 dark:decoration-gray-500/50 hover:decoration-gray-700 dark:hover:decoration-gray-300 hover:text-black dark:hover:text-white transition-all cursor-pointer">
                Better outcomes with principles
              </Link>
            </div>
            <div className="before:content-['–_'] before:text-gray-400">
              <Link href="/frameworks/guardrails/moving-a11y-left" className="text-sm text-gray-700 dark:text-gray-300 underline decoration-gray-400/50 dark:decoration-gray-500/50 hover:decoration-gray-700 dark:hover:decoration-gray-300 hover:text-black dark:hover:text-white transition-all cursor-pointer">
                Moving a11y left
              </Link>
            </div>
          </div>
        </div>

        <div>
          <div className="text-sm text-gray-900 dark:text-gray-100 mb-2">Documentation</div>
          <div className="space-y-2">
            <div className="before:content-['–_'] before:text-gray-400">
              <Link href="/frameworks/documentation/shared-vocabulary" className="text-sm text-gray-700 dark:text-gray-300 underline decoration-gray-400/50 dark:decoration-gray-500/50 hover:decoration-gray-700 dark:hover:decoration-gray-300 hover:text-black dark:hover:text-white transition-all cursor-pointer">
                A shared vocabulary
              </Link>
            </div>
            <div className="before:content-['–_'] before:text-gray-400">
              <Link href="/frameworks/documentation/documenting-when-we-sleep" className="text-sm text-gray-700 dark:text-gray-300 underline decoration-gray-400/50 dark:decoration-gray-500/50 hover:decoration-gray-700 dark:hover:decoration-gray-300 hover:text-black dark:hover:text-white transition-all cursor-pointer">
                Documenting when we sleep
              </Link>
            </div>
            <div className="before:content-['–_'] before:text-gray-400">
              <Link href="/frameworks/documentation/static-site-generators" className="text-sm text-gray-700 dark:text-gray-300 underline decoration-gray-400/50 dark:decoration-gray-500/50 hover:decoration-gray-700 dark:hover:decoration-gray-300 hover:text-black dark:hover:text-white transition-all cursor-pointer">
                Static site generators
              </Link>
            </div>
          </div>
        </div>

        <div>
          <div className="text-sm text-gray-900 dark:text-gray-100 mb-2">Toolchain</div>
          <div className="space-y-2">
            <div className="before:content-['–_'] before:text-gray-400">
              <Link href="/frameworks/environments" className="text-sm text-gray-700 dark:text-gray-300 underline decoration-gray-400/50 dark:decoration-gray-500/50 hover:decoration-gray-700 dark:hover:decoration-gray-300 hover:text-black dark:hover:text-white transition-all cursor-pointer">
                Environments
              </Link>
            </div>
            <div className="before:content-['–_'] before:text-gray-400">
              <Link href="/frameworks/toolchain/design" className="text-sm text-gray-700 dark:text-gray-300 underline decoration-gray-400/50 dark:decoration-gray-500/50 hover:decoration-gray-700 dark:hover:decoration-gray-300 hover:text-black dark:hover:text-white transition-all cursor-pointer">
                Design
              </Link>
            </div>
            <div className="before:content-['–_'] before:text-gray-400">
              <Link href="/frameworks/toolchain/development" className="text-sm text-gray-700 dark:text-gray-300 underline decoration-gray-400/50 dark:decoration-gray-500/50 hover:decoration-gray-700 dark:hover:decoration-gray-300 hover:text-black dark:hover:text-white transition-all cursor-pointer">
                Development
              </Link>
            </div>
            <div className="before:content-['–_'] before:text-gray-400">
              <Link href="/frameworks/toolchain/workflow" className="text-sm text-gray-700 dark:text-gray-300 underline decoration-gray-400/50 dark:decoration-gray-500/50 hover:decoration-gray-700 dark:hover:decoration-gray-300 hover:text-black dark:hover:text-white transition-all cursor-pointer">
                Workflow
              </Link>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

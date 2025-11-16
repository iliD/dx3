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

      {/* Process Stages */}
      <div>
        <h2 className="text-sm text-gray-900 dark:text-gray-100 mb-4">On this page</h2>
        <div className="space-y-6">
          <div>
            <Link href="/frameworks/intake-triage" className="text-sm text-gray-700 dark:text-gray-300 underline decoration-gray-400/50 dark:decoration-gray-500/50 hover:decoration-gray-700 dark:hover:decoration-gray-300 hover:text-black dark:hover:text-white transition-all cursor-pointer">
              Intake and triage
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Evaluate and classify requests</p>
          </div>
          <div>
            <Link href="/frameworks/discovery-research" className="text-sm text-gray-700 dark:text-gray-300 underline decoration-gray-400/50 dark:decoration-gray-500/50 hover:decoration-gray-700 dark:hover:decoration-gray-300 hover:text-black dark:hover:text-white transition-all cursor-pointer">
              Discovery and research
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Gather requirements and validate need</p>
          </div>
          <div>
            <Link href="/frameworks/design-specification" className="text-sm text-gray-700 dark:text-gray-300 underline decoration-gray-400/50 dark:decoration-gray-500/50 hover:decoration-gray-700 dark:hover:decoration-gray-300 hover:text-black dark:hover:text-white transition-all cursor-pointer">
              Design and specification
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Create solutions and detailed specs</p>
          </div>
          <div>
            <Link href="/frameworks/build-development" className="text-sm text-gray-700 dark:text-gray-300 underline decoration-gray-400/50 dark:decoration-gray-500/50 hover:decoration-gray-700 dark:hover:decoration-gray-300 hover:text-black dark:hover:text-white transition-all cursor-pointer">
              Build and development
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Implement in code</p>
          </div>
          <div>
            <Link href="/frameworks/documentation" className="text-sm text-gray-700 dark:text-gray-300 underline decoration-gray-400/50 dark:decoration-gray-500/50 hover:decoration-gray-700 dark:hover:decoration-gray-300 hover:text-black dark:hover:text-white transition-all cursor-pointer">
              Documentation
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Create user guidance</p>
          </div>
          <div>
            <Link href="/frameworks/qa-testing" className="text-sm text-gray-700 dark:text-gray-300 underline decoration-gray-400/50 dark:decoration-gray-500/50 hover:decoration-gray-700 dark:hover:decoration-gray-300 hover:text-black dark:hover:text-white transition-all cursor-pointer">
              Quality assurance and testing
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Validate implementation</p>
          </div>
          <div>
            <Link href="/frameworks/release-deployment" className="text-sm text-gray-700 dark:text-gray-300 underline decoration-gray-400/50 dark:decoration-gray-500/50 hover:decoration-gray-700 dark:hover:decoration-gray-300 hover:text-black dark:hover:text-white transition-all cursor-pointer">
              Release and deployment
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Publish and make available</p>
          </div>
          <div>
            <Link href="/frameworks/adoption-support" className="text-sm text-gray-700 dark:text-gray-300 underline decoration-gray-400/50 dark:decoration-gray-500/50 hover:decoration-gray-700 dark:hover:decoration-gray-300 hover:text-black dark:hover:text-white transition-all cursor-pointer">
              Adoption and support
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Enable implementation</p>
          </div>
          <div>
            <Link href="/frameworks/maintenance-iteration" className="text-sm text-gray-700 dark:text-gray-300 underline decoration-gray-400/50 dark:decoration-gray-500/50 hover:decoration-gray-700 dark:hover:decoration-gray-300 hover:text-black dark:hover:text-white transition-all cursor-pointer">
              Maintenance and iteration
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Ongoing health</p>
          </div>
        </div>
      </div>

    </div>
  );
}

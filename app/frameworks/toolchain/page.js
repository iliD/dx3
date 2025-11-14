export const metadata = {
  title: 'Toolchain - Frameworks - designDesignsDesign',
  description: 'Tools and technologies in our development toolchain.',
};

export default function ToolchainPage() {
  return (
    <div className="py-12 max-w-6xl" style={{ marginLeft: 'clamp(1.5rem, 8vw, 6rem)', marginRight: 'clamp(1.5rem, 4vw, 1.5rem)' }}>
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl mb-4">Toolchain</h1>
      </header>

      {/* Sections */}
      <div className="space-y-12">
        <section>
          <h2 className="text-3xl mb-4"><a href="https://www.figma.com" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">Figma</a></h2>
        </section>

        <section>
          <h2 className="text-3xl mb-4">IDEs</h2>
        </section>

        <section>
          <h2 className="text-3xl mb-4">Accessibility tools</h2>
        </section>

        <section>
          <h2 className="text-3xl mb-4">APIs and integrations</h2>
        </section>
      </div>
    </div>
  );
}

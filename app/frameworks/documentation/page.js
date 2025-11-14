export const metadata = {
  title: 'Documentation - Frameworks - designDesignsDesign',
  description: 'Documentation framework and standards.',
};

export default function DocumentationPage() {
  return (
    <div className="py-12 max-w-6xl" style={{ marginLeft: 'clamp(1.5rem, 8vw, 6rem)', marginRight: 'clamp(1.5rem, 4vw, 1.5rem)' }}>
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl mb-4">Documentation</h1>
      </header>

      {/* Sections */}
      <div className="space-y-12">
        <section>
          <h2 className="text-3xl mb-4">Design intent</h2>
        </section>

        <section>
          <h2 className="text-3xl mb-4">Data structures</h2>
        </section>

        <section>
          <h2 className="text-3xl mb-4">Build specifications</h2>
        </section>

        <section>
          <h2 className="text-3xl mb-4">User guidance</h2>
        </section>
      </div>
    </div>
  );
}

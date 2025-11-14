export const metadata = {
  title: 'Process - Frameworks - designDesignsDesign',
  description: 'Our development process framework and methodology.',
};

export default function ProcessPage() {
  return (
    <div className="py-12 max-w-6xl" style={{ marginLeft: 'clamp(1.5rem, 8vw, 6rem)', marginRight: 'clamp(1.5rem, 4vw, 1.5rem)' }}>
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl mb-4">Process</h1>
      </header>

      {/* Sections */}
      <div className="space-y-12">
        <section>
          <h2 className="text-3xl mb-4">Proposal</h2>
        </section>

        <section>
          <h2 className="text-3xl mb-4">Functional spec</h2>
        </section>

        <section>
          <h2 className="text-3xl mb-4">Candidate review</h2>
        </section>

        <section>
          <h2 className="text-3xl mb-4">Decision</h2>
        </section>

        <section>
          <h2 className="text-3xl mb-4">Data mapping</h2>
        </section>

        <section>
          <h2 className="text-3xl mb-4">Documentation</h2>
        </section>

        <section>
          <h2 className="text-3xl mb-4">Build</h2>
        </section>

        <section>
          <h2 className="text-3xl mb-4">Release</h2>
        </section>

        <section>
          <h2 className="text-3xl mb-4">Maintenance</h2>
        </section>
      </div>
    </div>
  );
}

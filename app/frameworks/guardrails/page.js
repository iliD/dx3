export const metadata = {
  title: 'Guardrails - Frameworks - designDesignsDesign',
  description: 'Directives, thresholds and principles that guide our development.',
};

export default function GuardrailsPage() {
  return (
    <div className="py-12 max-w-6xl" style={{ marginLeft: 'clamp(1.5rem, 8vw, 6rem)', marginRight: 'clamp(1.5rem, 4vw, 1.5rem)' }}>
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Guardrails</h1>
      </header>

      {/* Sections */}
      <div className="space-y-12">
        <section>
          <h2 className="text-3xl font-bold mb-4">Directives, thresholds and principles</h2>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4">Better outcomes with principles</h2>
        </section>
      </div>
    </div>
  );
}

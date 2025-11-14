export const metadata = {
  title: 'Colophon - designDesignsDesign',
  description: 'Technical details, design system, and credits for designDesignsDesign',
};

export default function ColophonPage() {
  return (
    <div className="py-12 max-w-4xl" style={{ marginLeft: 'clamp(1.5rem, 8vw, 6rem)', marginRight: 'clamp(1.5rem, 4vw, 1.5rem)' }}>
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl mb-4">Colophon</h1>
        <p className="text-xl text-gray-600">
          Technical details, design system, and the tools that power designDesignsDesign
        </p>
      </header>

      {/* Tech Stack Section */}
      <section className="mb-12">
        <h2 className="text-3xl mb-6">Technology stack</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl mb-4">Core framework</h3>
            <ul className="space-y-2 text-gray-700">
              <li><a href="https://nextjs.org" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">Next.js</a> 16 - React framework with App Router and server components</li>
              <li><a href="https://react.dev" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">React</a> 18+ - JavaScript library for building user interfaces</li>
              <li><a href="https://nodejs.org" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">Node.js</a> 18+ - JavaScript runtime environment</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl mb-4">Content management</h3>
            <ul className="space-y-2 text-gray-700">
              <li><a href="https://www.sanity.io" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">Sanity CMS</a> - Headless content management system</li>
              <li><a href="https://www.sanity.io/studio" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">Sanity Studio</a> - Real-time collaborative editing environment</li>
              <li><a href="https://www.sanity.io/docs/groq" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">GROQ</a> - Graph-Relational Object Queries for content fetching</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl mb-4">Infrastructure</h3>
            <ul className="space-y-2 text-gray-700">
              <li><a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">Vercel</a> - Hosting and serverless deployment</li>
              <li><a href="https://vercel.com/storage/blob" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">Vercel Blob</a> - File storage for digital products</li>
              <li><a href="https://vercel.com/analytics" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">Vercel Analytics</a> - Performance monitoring and insights</li>
              <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">GitHub</a> - Version control and continuous deployment</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Design System Section */}
      <section className="mb-12">
        <h2 className="text-3xl mb-6">Design system</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl mb-4">Styling framework</h3>
            <ul className="space-y-2 text-gray-700">
              <li><a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">Tailwind CSS</a> v4 - Utility-first CSS framework</li>
              <li><a href="https://postcss.org" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">PostCSS</a> - CSS transformation and optimisation</li>
              <li><a href="https://ui.shadcn.com" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">shadcn/ui</a> - Accessible, customisable component library</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl mb-4">Typography</h3>
            <ul className="space-y-2 text-gray-700">
              <li><a href="https://fonts.google.com/specimen/IBM+Plex+Sans" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">IBM Plex</a> - Primary typeface with system font fallbacks for optimal performance</li>
              <li className="pl-6 text-sm font-mono text-gray-600">
                IBM Plex Sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif
              </li>
              <li>Font sizes - Responsive scale from 14px to 48px</li>
              <li>Line heights - Optimised for readability (1.5 for body, 1.2 for headings)</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl mb-4">Animation and motion</h3>
            <ul className="space-y-2 text-gray-700">
              <li><a href="https://www.framer.com/motion/" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">Framer Motion</a> - Declarative animations and gestures</li>
              <li>Transition duration - 150-300ms for micro-interactions</li>
              <li>Easing - Cubic bezier curves for natural motion</li>
            </ul>
          </div>

        </div>
      </section>

      {/* Accessibility Statement */}
      <section className="mb-12 border-t pt-8">
        <h2 className="text-3xl mb-6">Accessibility statement</h2>
        <div className="space-y-4 text-gray-700">
          <p>
            designDesignsDesign is committed to ensuring digital accessibility for all users,
            including those with disabilities. We are continually improving the user experience
            for everyone and applying the relevant accessibility standards.
          </p>

          <h3 className="text-xl mt-6 mb-3">Conformance status</h3>
          <p>
            This website strives to conform to the <a href="https://www.w3.org/WAI/WCAG21/quickref/" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">Web Content Accessibility Guidelines (WCAG) 2.1</a> Level AA. These guidelines explain how to make web content more accessible for people
            with disabilities and user-friendly for everyone.
          </p>

          <h3 className="text-xl mt-6 mb-3">Technical specifications</h3>
          <p>
            Accessibility of designDesignsDesign relies on the following technologies to work
            with the particular combination of web browser and any assistive technologies or
            plugins installed on your computer:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li><a href="https://html.spec.whatwg.org/" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">HTML5</a></li>
            <li><a href="https://www.w3.org/Style/CSS/" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">CSS</a></li>
            <li><a href="https://tc39.es/ecma262/" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">JavaScript</a></li>
            <li><a href="https://www.w3.org/WAI/standards-guidelines/aria/" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">WAI-ARIA</a></li>
          </ul>

          <h3 className="text-xl mt-6 mb-3">Accessibility features</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Semantic HTML markup with proper heading hierarchy and landmarks</li>
            <li>Full keyboard navigation support throughout the site</li>
            <li>Minimum colour contrast ratio of 4.5:1 for normal text</li>
            <li>Responsive design that works across devices and screen sizes</li>
            <li>Alternative text for images</li>
            <li>Clear focus indicators for interactive elements</li>
          </ul>

          <h3 className="text-xl mt-6 mb-3">Feedback</h3>
          <p>
            We welcome your feedback on the accessibility of designDesignsDesign. If you encounter
            accessibility barriers or have suggestions for improvement, please contact us through
            our website or GitHub repository.
          </p>
        </div>
      </section>
    </div>
  );
}

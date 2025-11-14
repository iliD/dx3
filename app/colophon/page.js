export const metadata = {
  title: 'Colophon - designDesignsDesign',
  description: 'Technical details, design system, and credits for designDesignsDesign',
};

export default function ColophonPage() {
  return (
    <div className="py-12 max-w-4xl" style={{ marginLeft: 'clamp(1.5rem, 8vw, 6rem)', marginRight: 'clamp(1.5rem, 4vw, 1.5rem)' }}>
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Colophon</h1>
        <p className="text-xl text-gray-600">
          Technical details, design system, and the tools that power designDesignsDesign
        </p>
      </header>

      {/* Tech Stack Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Technology Stack</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-4">Core Framework</h3>
            <ul className="space-y-2 text-gray-700">
              <li><strong>Next.js 16</strong> - React framework with App Router and server components</li>
              <li><strong>React 18+</strong> - JavaScript library for building user interfaces</li>
              <li><strong>Node.js 18+</strong> - JavaScript runtime environment</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Content Management</h3>
            <ul className="space-y-2 text-gray-700">
              <li><strong>Sanity CMS</strong> - Headless content management system</li>
              <li><strong>Sanity Studio</strong> - Real-time collaborative editing environment</li>
              <li><strong>GROQ</strong> - Graph-Relational Object Queries for content fetching</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Infrastructure</h3>
            <ul className="space-y-2 text-gray-700">
              <li><strong>Vercel</strong> - Hosting and serverless deployment</li>
              <li><strong>Vercel Blob</strong> - File storage for digital products</li>
              <li><strong>Vercel Analytics</strong> - Performance monitoring and insights</li>
              <li><strong>GitHub</strong> - Version control and continuous deployment</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Design System Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Design System</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-4">Styling Framework</h3>
            <ul className="space-y-2 text-gray-700">
              <li><strong>Tailwind CSS v4</strong> - Utility-first CSS framework</li>
              <li><strong>PostCSS</strong> - CSS transformation and optimization</li>
              <li><strong>shadcn/ui</strong> - Accessible, customizable component library</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Typography</h3>
            <ul className="space-y-2 text-gray-700">
              <li><strong>System Font Stack</strong> - Native system fonts for optimal performance</li>
              <li className="pl-6 text-sm font-mono text-gray-600">
                -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
              </li>
              <li><strong>Font Sizes</strong> - Responsive scale from 14px to 48px</li>
              <li><strong>Line Heights</strong> - Optimized for readability (1.5 for body, 1.2 for headings)</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Animation & Motion</h3>
            <ul className="space-y-2 text-gray-700">
              <li><strong>Framer Motion</strong> - Declarative animations and gestures</li>
              <li><strong>Transition Duration</strong> - 150-300ms for micro-interactions</li>
              <li><strong>Easing</strong> - Cubic bezier curves for natural motion</li>
            </ul>
          </div>

        </div>
      </section>

      {/* Credits Section */}
      <section className="mb-12 border-t pt-8">
        <h2 className="text-3xl font-bold mb-6">Credits & Acknowledgments</h2>
        <p className="text-gray-700 mb-4">
          This site was built with open-source technologies and modern web standards.
        </p>
        <div className="space-y-2 text-sm text-gray-600">
          <p>Built with Next.js by Vercel</p>
          <p>Powered by Sanity CMS</p>
          <p>Styled with Tailwind CSS</p>
          <p>Components from shadcn/ui</p>
          <p>Payments by Stripe</p>
          <p>Emails by Resend</p>
          <p>Hosted on Vercel</p>
        </div>
      </section>

      {/* Accessibility Statement */}
      <section className="mb-12 border-t pt-8">
        <h2 className="text-3xl font-bold mb-6">Accessibility Statement</h2>
        <div className="space-y-4 text-gray-700">
          <p>
            designDesignsDesign is committed to ensuring digital accessibility for all users,
            including those with disabilities. We are continually improving the user experience
            for everyone and applying the relevant accessibility standards.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Conformance Status</h3>
          <p>
            This website strives to conform to the Web Content Accessibility Guidelines (WCAG) 2.1
            Level AA. These guidelines explain how to make web content more accessible for people
            with disabilities and user-friendly for everyone.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Technical Specifications</h3>
          <p>
            Accessibility of designDesignsDesign relies on the following technologies to work
            with the particular combination of web browser and any assistive technologies or
            plugins installed on your computer:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>HTML5</li>
            <li>CSS</li>
            <li>JavaScript</li>
            <li>WAI-ARIA</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">Accessibility Features</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Semantic HTML markup with proper heading hierarchy and landmarks</li>
            <li>Full keyboard navigation support throughout the site</li>
            <li>Minimum color contrast ratio of 4.5:1 for normal text</li>
            <li>Responsive design that works across devices and screen sizes</li>
            <li>Alternative text for images</li>
            <li>Clear focus indicators for interactive elements</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">Feedback</h3>
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

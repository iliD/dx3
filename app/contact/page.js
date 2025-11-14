export const metadata = {
  title: 'Contact Us - designDesignsDesign',
  description: 'Get in touch with designDesignsDesign. We\'d love to hear from you.',
};

export default function ContactPage() {
  return (
    <div className="py-12 max-w-4xl" style={{ marginLeft: 'clamp(1.5rem, 8vw, 6rem)', marginRight: 'clamp(1.5rem, 4vw, 1.5rem)' }}>
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl mb-4">Contact us</h1>
        <p className="text-xl text-gray-600">
          Have a question or want to work together? We'd love to hear from you.
        </p>
      </header>

      {/* Contact Form */}
      <div className="max-w-2xl mx-auto">
        <form className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="name" className="text-base font-semibold">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                autoComplete="name"
                required
                className="flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-base font-semibold">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                required
                className="flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="text-base font-semibold">
              Phone <span className="text-gray-500 font-normal">(optional)</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              autoComplete="tel"
              className="flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="subject" className="text-base font-semibold">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              required
              className="flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-base font-semibold">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows="5"
              className="flex min-h-[120px] w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-none"
            ></textarea>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="flex h-10 w-full items-center justify-center rounded-lg border border-black bg-black px-3 py-2 text-sm text-white hover:bg-gray-800 transition-colors font-semibold"
            >
              Send message
            </button>
          </div>
        </form>
      </div>

      {/* Additional Information */}
      <div className="mt-20 pt-12 border-t">
        <ul className="space-y-3 text-sm text-gray-700">
          <li>
            <strong>Response:</strong> We typically respond to all inquiries within 24-48 hours
          </li>
          <li>
            <strong>Privacy First:</strong> Your information is secure in accordance with UK GDPR and will never be shared with third parties
          </li>
          <li>
            <strong>Follow the Sun:</strong> Based in London, working with clients worldwide
          </li>
        </ul>
      </div>
    </div>
  );
}

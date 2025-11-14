import Link from 'next/link';

export const metadata = {
  title: 'Contact Us - designDesignsDesign',
  description: 'Get in touch with designDesignsDesign. We\'d love to hear from you.',
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-6 py-12 max-w-4xl">
      {/* Back Button */}
      <Link
        href="/"
        className="inline-flex items-center text-gray-600 hover:text-black mb-8 transition-colors"
      >
        ← Back to Home
      </Link>

      {/* Header */}
      <header className="mb-12">
        <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
        <p className="text-xl text-gray-600">
          Have a question or want to work together? We'd love to hear from you.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-16">
        {/* Contact Information */}
        <div>
          <h2 className="text-2xl font-bold mb-8">Get in Touch</h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-1">Location</h3>
              <p className="text-gray-700">London, United Kingdom</p>
            </div>

            <div>
              <h3 className="font-semibold mb-1">Phone</h3>
              <p className="text-gray-700">+44 20 1234 5678</p>
            </div>

            <div>
              <h3 className="font-semibold mb-1">Email</h3>
              <p className="text-gray-700">hello@designdesignsdesign.com</p>
            </div>

            <div>
              <h3 className="font-semibold mb-1">Hours</h3>
              <p className="text-gray-700">Monday - Friday</p>
              <p className="text-gray-700">9:00 AM - 6:00 PM GMT</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div>
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
                  required
                  className="flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="Your name"
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
                  required
                  className="flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="your.email@example.com"
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
                className="flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                placeholder="+44 20 1234 5678"
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
                placeholder="How can we help?"
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
                placeholder="Tell us more about your project or inquiry..."
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

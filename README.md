# Digital Products Shop - Marketing Site & E-Commerce

A modern, full-stack marketing site and digital products shop built with Next.js, Sanity CMS, Stripe, and more. This setup provides everything you need to sell digital products with zero monthly infrastructure costs.

## Tech Stack

### Core Framework
- **Next.js 14+** with App Router
- **React 18+**
- **JavaScript** (no TypeScript required)
- **Node.js 18+**

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible component library
- **PostCSS** - Auto-included with Tailwind

### Content Management
- **Sanity CMS** - Headless CMS for managing products and content
- **Sanity Studio** - Built-in CMS editor at `/studio`
- **GROQ** - Query language for fetching content

### Payments & E-Commerce
- **Stripe Checkout** - One-time payments & subscriptions
- **Stripe Customer Portal** - Self-service subscription management
- **Stripe Webhooks** - Payment event notifications
- **Stripe CLI** - Local webhook testing

### Email & Delivery
- **Resend** - Email API for transactional emails
- **React Email** - Beautiful email templates with React

### File Storage
- **Vercel Blob** - Digital product file storage
- *Alternatives: AWS S3 or Cloudflare R2*

### Hosting & Deployment
- **Vercel** - Hosting with serverless functions
- **GitHub** - Version control with auto-deploy

### Forms & Validation
- **React Hook Form** - Performant form handling
- **Zod** - Schema validation

### Analytics
- **Vercel Analytics** - Built-in performance monitoring

### Optional Enhancements
- **next-seo** - SEO optimization
- **Framer Motion** - Smooth animations
- **date-fns** - Date formatting utilities

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Git

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Copy `.env.example` to `.env.local` and fill in your credentials:

```bash
cp .env.example .env.local
```

Required environment variables:

```env
# Next.js
NEXT_PUBLIC_URL=http://localhost:3000

# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-api-token

# Stripe
STRIPE_SECRET_KEY=sk_test_your_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Resend
RESEND_API_KEY=re_your_api_key
RESEND_FROM_EMAIL=noreply@yourdomain.com

# Vercel Blob
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_your_token
```

### 3. Set Up Sanity CMS

1. Create a Sanity account at [sanity.io](https://www.sanity.io/)
2. Run `npx sanity init` or log in via the Studio at `http://localhost:3000/studio`
3. Copy your Project ID and add it to `.env.local`
4. Create a token with Editor permissions in your Sanity project settings

### 4. Set Up Stripe

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get your API keys from the Stripe Dashboard
3. Add products and prices in Stripe Dashboard
4. Copy the Price IDs to your Sanity products
5. Set up webhook endpoint: `/api/webhooks/stripe`

For local testing:
```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login and forward webhooks
stripe login
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

### 5. Set Up Resend

1. Create a Resend account at [resend.com](https://resend.com)
2. Get your API key from the dashboard
3. Verify your sending domain (or use the test domain)
4. Add credentials to `.env.local`

### 6. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

Access Sanity Studio at [http://localhost:3000/studio](http://localhost:3000/studio)

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── create-checkout-session/   # Stripe checkout
│   │   ├── send-email/                # Email sending
│   │   └── webhooks/stripe/           # Stripe webhooks
│   ├── products/                      # Products page
│   ├── studio/[[...tool]]/           # Sanity Studio
│   ├── layout.js                      # Root layout
│   └── page.js                        # Homepage
├── components/
│   ├── product-card.jsx               # Product display component
│   └── contact-form.jsx               # Contact form with validation
├── emails/
│   └── purchase-confirmation.jsx      # Purchase email template
├── lib/
│   ├── sanity.js                      # Sanity client setup
│   ├── stripe.js                      # Stripe client setup
│   ├── resend.js                      # Resend client setup
│   └── utils.js                       # Utility functions
├── sanity.config.js                   # Sanity CMS configuration
└── .env.local                         # Environment variables
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Key Features

### Product Management
- Add products through Sanity Studio at `/studio`
- Upload product images with built-in asset management
- Set prices and link to Stripe products
- Manage download URLs for digital products

### Payment Processing
- Secure checkout with Stripe
- Support for one-time purchases and subscriptions
- Automatic webhook handling for payment events
- Customer portal for subscription management

### Email Notifications
- Beautiful email templates with React Email
- Automatic purchase confirmation emails
- Download link delivery
- Customizable email designs

### Responsive Design
- Mobile-first design with Tailwind CSS
- Accessible components from shadcn/ui
- Smooth animations with Framer Motion

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import repository in [Vercel Dashboard](https://vercel.com)
3. Add all environment variables
4. Deploy!

Vercel will automatically:
- Build your Next.js application
- Set up serverless functions for API routes
- Configure custom domain (optional)
- Enable automatic deployments on push

### Post-Deployment Setup

1. Update `NEXT_PUBLIC_URL` in environment variables
2. Update Stripe webhook endpoint to production URL
3. Verify Resend sending domain
4. Test payment flow end-to-end

## Cost Breakdown

**Free Tier Limits:**
- **Vercel**: Free tier (generous limits for most projects)
- **Sanity**: Free tier (10,000 documents, 3 users)
- **Resend**: Free tier (3,000 emails/month)
- **Stripe**: No monthly fee, only 2.9% + $0.30 per transaction
- **Vercel Blob**: 500 MB free storage

**Total monthly cost to start: $0** (pay only for successful transactions)

## Adding Components

Install shadcn/ui components as needed:

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add form
```

## Customization

### Styling
- Edit `app/globals.css` for global styles
- Modify Tailwind config in `tailwind.config.js`
- Update color scheme in `app/globals.css`

### Email Templates
- Edit email components in `emails/` directory
- Preview emails: `npm run email` (requires setup)

### CMS Schema
- Modify schemas in `sanity.config.js`
- Add new document types as needed
- Deploy schema changes via Sanity Studio

## Troubleshooting

### Sanity Studio not loading
- Verify `NEXT_PUBLIC_SANITY_PROJECT_ID` is set
- Check that you've created a Sanity project
- Ensure dataset name matches configuration

### Stripe webhooks failing locally
- Use Stripe CLI to forward webhooks
- Verify webhook secret matches `.env.local`
- Check webhook endpoint is accessible

### Emails not sending
- Verify Resend API key is valid
- Check sending domain is verified
- Review email template for errors

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [Resend Documentation](https://resend.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## License

MIT

## Support

For issues and questions:
- Check the documentation links above
- Review Vercel deployment logs
- Check browser console for client-side errors
- Review API route logs for server errors

---

Built with Next.js, Sanity, Stripe, and Resend. Deployed on Vercel.

import { NextResponse } from 'next/server';
import { resend } from '@/lib/resend';
import PurchaseConfirmationEmail from '@/emails/purchase-confirmation';

export async function POST(request) {
  try {
    const { to, productName, downloadUrl, customerName } = await request.json();

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: to,
      subject: `Your purchase of ${productName} is ready!`,
      react: PurchaseConfirmationEmail({ productName, downloadUrl, customerName }),
    });

    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Error sending email' }, { status: 500 });
  }
}

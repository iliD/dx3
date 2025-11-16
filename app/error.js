'use client';

import ErrorPage from '@/components/ErrorPage';

export default function Error({ error, reset }) {
  return <ErrorPage message="Something went wrong" />;
}

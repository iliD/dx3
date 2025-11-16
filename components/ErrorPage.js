'use client';

import { motion } from 'framer-motion';

export default function ErrorPage({ message = 'Page not found' }) {
  return (
    <div className="flex flex-col items-center justify-center text-center font-mono" style={{ paddingTop: '200px', gap: '18px' }}>
      <motion.div
        style={{
          background: 'linear-gradient(90deg, #3b82f6 0%, #a855f7 20%, #ec4899 50%, #a855f7 80%, #3b82f6 100%)',
          backgroundSize: '200% 100%',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontSize: '40px',
        }}
        animate={{ backgroundPosition: ['0% 0%', '200% 0%'] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      >
        ¯\_(ツ)_/¯
      </motion.div>
      <div style={{ fontSize: '16px', fontWeight: 300 }}>{message}</div>
    </div>
  );
}

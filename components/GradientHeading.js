'use client';

import { motion } from 'framer-motion';
import { memo } from 'react';

const GradientHeading = memo(function GradientHeading({ children, className, style }) {
  return (
    <motion.h1
      className={className}
      style={{
        ...style,
        background: 'linear-gradient(90deg, #3b82f6 0%, #a855f7 20%, #ec4899 50%, #a855f7 80%, #3b82f6 100%)',
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}
      animate={{ backgroundPosition: ['0% 0%', '200% 0%'] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
    >
      {children}
    </motion.h1>
  );
});

export default GradientHeading;

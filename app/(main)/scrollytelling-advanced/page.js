'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

export default function AdvancedScrollytellingPage() {
  const containerRef = useRef(null);
  const [isDark, setIsDark] = useState(false);
  const parallaxRef = useRef(null);
  const rotationRef = useRef(null);
  const counterRef = useRef(null);

  // Scroll progress for parallax
  const { scrollYProgress: parallaxProgress } = useScroll({
    target: parallaxRef,
    offset: ["start end", "end start"]
  });

  // Scroll progress for rotation
  const { scrollYProgress: rotationProgress } = useScroll({
    target: rotationRef,
    offset: ["start end", "end start"]
  });

  // Transform values for parallax - depth-based movement
  // Larger/closer elements move slower, smaller/farther elements move faster
  const y1 = useTransform(parallaxProgress, [0, 1], [100, -300]);   // Closest/largest - slowest
  const y2 = useTransform(parallaxProgress, [0, 1], [200, -400]);  // Mid-close
  const y3 = useTransform(parallaxProgress, [0, 1], [300, -500]);  // Mid-far
  const y4 = useTransform(parallaxProgress, [0, 1], [400, -600]);  // Farthest/smallest - fastest

  // Transform values for rotation
  const rotateX = useTransform(rotationProgress, [0, 1], [15, -15]);
  const rotateY = useTransform(rotationProgress, [0, 1], [0, 360]);

  // Counter animation
  const [count, setCount] = useState(0);
  const [isCounterVisible, setIsCounterVisible] = useState(false);

  useEffect(() => {
    // Detect dark mode
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkDarkMode();

    // Watch for dark mode changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  // Counter animation effect
  useEffect(() => {
    if (!isCounterVisible) return;

    const duration = 2000;
    const target = 1234;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isCounterVisible]);

  return (
    <div ref={containerRef} className="bg-white dark:bg-[#1a1a1a]">
      {/* Hero Section */}
      <section className="h-[50vh] flex items-center justify-center px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            Advanced Scrollytelling
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">
            Explore more sophisticated scroll effects
          </p>
        </motion.div>
      </section>

      {/* Section 1: Parallax Layers */}
      <section ref={parallaxRef} className="min-h-[150vh] py-12 flex items-center justify-center relative px-6 md:px-12 lg:px-24 overflow-hidden">
        {/* Parallax Elements - Layered by depth with blur and opacity */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Layer 4 (Farthest) - Smallest, Most Blur, Fastest Movement, 60% Opacity */}
          <motion.div
            style={{ y: y4, willChange: 'transform', filter: 'blur(6px)' }}
            className="absolute top-[5%] left-[15%] w-32 h-32 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-lg opacity-60"
          />
          <motion.div
            style={{ y: y4, willChange: 'transform', filter: 'blur(6px)' }}
            className="absolute bottom-[15%] right-[25%] w-32 h-32 bg-gradient-to-br from-pink-400 to-rose-400 rounded-lg opacity-60"
          />

          {/* Layer 3 (Mid-Far) - Small-Medium, Medium Blur, Fast Movement, 73% Opacity */}
          <motion.div
            style={{ y: y3, willChange: 'transform', filter: 'blur(4px)' }}
            className="absolute top-[25%] right-[15%] w-40 h-40 md:w-48 md:h-48 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg opacity-[0.73]"
          />
          <motion.div
            style={{ y: y3, willChange: 'transform', filter: 'blur(4px)' }}
            className="absolute bottom-[25%] left-[10%] w-40 h-40 md:w-48 md:h-48 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg opacity-[0.73]"
          />

          {/* Layer 2 (Mid-Close) - Medium-Large, Light Blur, Medium Movement, 87% Opacity */}
          <motion.div
            style={{ y: y2, willChange: 'transform', filter: 'blur(2px)' }}
            className="absolute top-[40%] left-[20%] w-48 h-48 md:w-56 md:h-56 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg opacity-[0.87]"
          />
          <motion.div
            style={{ y: y2, willChange: 'transform', filter: 'blur(2px)' }}
            className="absolute top-[15%] right-[30%] w-48 h-48 md:w-56 md:h-56 bg-gradient-to-br from-violet-500 to-purple-500 rounded-lg opacity-[0.87]"
          />

          {/* Layer 1 (Closest) - Largest, No Blur, Slowest Movement, 100% Opacity */}
          <motion.div
            style={{ y: y1, willChange: 'transform', filter: 'blur(0px)' }}
            className="absolute top-[10%] left-[5%] w-56 h-56 md:w-72 md:h-72 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg opacity-100"
          />
          <motion.div
            style={{ y: y1, willChange: 'transform', filter: 'blur(0px)' }}
            className="absolute bottom-[20%] right-[10%] w-56 h-56 md:w-72 md:h-72 bg-gradient-to-br from-rose-500 to-pink-500 rounded-lg opacity-100"
          />
        </div>

        {/* Text Content - On top */}
        <div className="max-w-4xl w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }}
            className="space-y-4"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
              Parallax Depth Layers
            </h2>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400">
              Elements create depth through size, blur, opacity, and movement speed. Larger = closer, sharper, more opaque, slower. Smaller = farther, blurrier, more transparent, faster.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section 2: Animated Counter */}
      <section className="min-h-[50vh] py-12 flex items-center justify-center relative px-6 md:px-12 lg:px-24">
        <div className="max-w-4xl w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            onViewportEnter={() => setIsCounterVisible(true)}
            transition={{ duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }}
            className="space-y-4 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
              Scroll-Triggered Counter
            </h2>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400">
              Numbers animate when scrolled into view
            </p>
            <div className="mt-8">
              <div className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
                {count.toLocaleString()}
              </div>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mt-4">
                Happy Customers
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 3: 3D Rotation */}
      <section ref={rotationRef} className="min-h-[100vh] py-12 flex items-center justify-center relative px-6 md:px-12 lg:px-24">
        <div className="max-w-4xl w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }}
            className="space-y-4"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
              3D Rotation
            </h2>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400">
              Elements rotate in 3D space as you scroll
            </p>
          </motion.div>

          <div className="mt-12 flex justify-center" style={{ perspective: '1000px' }}>
            <motion.div
              style={{ rotateY }}
              className="w-64 h-64 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center"
            >
              <span className="text-4xl font-bold text-white">3D</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 4: Text Reveal */}
      <section className="min-h-[50vh] py-12 flex items-center justify-center relative px-6 md:px-12 lg:px-24">
        <div className="max-w-4xl w-full">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6"
          >
            Word-by-Word Reveal
          </motion.h2>

          <div className="space-y-2">
            <div className="mb-4">
              {['Scrollytelling', 'creates', 'immersive', 'narratives', 'through', 'motion'].map((word, index) => (
                <motion.span
                  key={`line1-${word}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="inline-block text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mr-3"
                >
                  {word}
                </motion.span>
              ))}
            </div>
            <div className="mb-4">
              {['that', 'engage', 'and', 'captivate', 'your', 'audience'].map((word, index) => (
                <motion.span
                  key={`line2-${word}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: (index + 6) * 0.1 }}
                  className="inline-block text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mr-3"
                >
                  {word}
                </motion.span>
              ))}
            </div>
            <div>
              {['with', 'dynamic', 'visual', 'storytelling'].map((word, index) => (
                <motion.span
                  key={`line3-${word}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: (index + 12) * 0.1 }}
                  className="inline-block text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mr-3"
                >
                  {word}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Blur to Focus */}
      <section className="min-h-[50vh] py-12 flex items-center justify-center relative px-6 md:px-12 lg:px-24">
        <div className="max-w-4xl w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }}
            className="space-y-4"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
              Blur to Focus
            </h2>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400">
              Elements sharpen as they enter the viewport
            </p>
          </motion.div>

          <div className="grid grid-cols-3 gap-4 mt-8">
            {[1, 2, 3].map((item, index) => (
              <motion.div
                key={`row1-${item}`}
                initial={{ filter: 'blur(10px)', opacity: 0 }}
                whileInView={{ filter: 'blur(0px)', opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="aspect-square bg-gradient-to-br from-rose-500 to-orange-500 rounded-lg"
              />
            ))}
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {[4, 5, 6].map((item, index) => (
              <motion.div
                key={`row2-${item}`}
                initial={{ filter: 'blur(10px)', opacity: 0 }}
                whileInView={{ filter: 'blur(0px)', opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: (index + 3) * 0.1 }}
                className="aspect-square bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: Color Transition */}
      <motion.section
        initial={{ backgroundColor: isDark ? '#1a1a1a' : '#ffffff' }}
        whileInView={{ backgroundColor: isDark ? '#1e1b4b' : '#dbeafe' }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.8 }}
        className="min-h-[50vh] py-12 flex items-center justify-center relative px-6 md:px-12 lg:px-24"
      >
        <div className="max-w-4xl w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }}
            className="space-y-4 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
              Background Color Transition
            </h2>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400">
              The background morphs as you scroll through this section
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Section 7: Staggered Grid */}
      <section className="min-h-[50vh] py-12 flex items-center justify-center relative px-6 md:px-12 lg:px-24">
        <div className="max-w-4xl w-full">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6"
          >
            Staggered Grid Animation
          </motion.h2>

          <div className="grid grid-cols-4 md:grid-cols-6 gap-3 md:gap-4">
            {[...Array(24)].map((_, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.4,
                  delay: (index % 6) * 0.05,
                  ease: [0.6, 0.05, 0.01, 0.9]
                }}
                className={`aspect-square rounded-lg ${
                  index % 3 === 0 ? 'bg-blue-500' :
                  index % 3 === 1 ? 'bg-purple-500' :
                  'bg-pink-500'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Section 8: Flip Card */}
      <section className="min-h-[50vh] py-12 flex items-center justify-center relative px-6 md:px-12 lg:px-24">
        <div className="max-w-4xl w-full">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6"
          >
            Flip Card Effect
          </motion.h2>

          <div className="flex justify-center" style={{ perspective: '1000px' }}>
            <motion.div
              initial={{ rotateY: 0 }}
              whileInView={{ rotateY: 180 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }}
              className="relative w-full max-w-sm h-64"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center" style={{ backfaceVisibility: 'hidden' }}>
                <span className="text-4xl font-bold text-white">Front</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                <span className="text-4xl font-bold text-white">Back</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Finale */}
      <section className="min-h-[50vh] py-12 flex items-center justify-center px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center"
          style={{ willChange: 'transform, opacity' }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            The End
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">
            Advanced scrollytelling creates rich, engaging experiences
          </p>
        </motion.div>
      </section>
    </div>
  );
}

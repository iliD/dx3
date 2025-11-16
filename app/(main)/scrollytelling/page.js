'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function ScrollytellingPage() {
  const containerRef = useRef(null);

  // Track scroll progress of the entire page
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Create various transform values based on scroll progress
  const opacity1 = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.15, 0.35, 0.5], [0, 1, 0]);
  const opacity3 = useTransform(scrollYProgress, [0.45, 0.65, 0.8], [0, 1, 0]);
  const opacity4 = useTransform(scrollYProgress, [0.75, 0.95], [0, 1]);

  const xPos1 = useTransform(scrollYProgress, [0.15, 0.35], [-200, 0]);
  const xPos2 = useTransform(scrollYProgress, [0.15, 0.35], [200, 0]);
  const yPos = useTransform(scrollYProgress, [0.4, 0.7], [100, -100]);
  const scale = useTransform(scrollYProgress, [0.6, 0.9], [0.5, 1.5]);

  return (
    <div ref={containerRef} className="bg-white dark:bg-[#1a1a1a]">
      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center" style={{ marginLeft: 'clamp(1.5rem, 8vw, 6rem)', marginRight: 'clamp(1.5rem, 8vw, 6rem)' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-6xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            Scrollytelling
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Scroll down to experience the magic
          </p>
        </motion.div>
      </section>

      {/* Section 1: Fade In/Out */}
      <section className="min-h-screen flex items-center justify-center relative">
        <div className="max-w-4xl w-full" style={{ marginLeft: 'clamp(1.5rem, 8vw, 6rem)', marginRight: 'clamp(1.5rem, 8vw, 6rem)' }}>
          <motion.div style={{ opacity: opacity1 }} className="space-y-8">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
              Fade Transitions
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Elements can smoothly fade in and out as you scroll through the page.
            </p>
            <div className="grid grid-cols-3 gap-4">
              <div className="aspect-square bg-blue-500 rounded-lg"></div>
              <div className="aspect-square bg-purple-500 rounded-lg"></div>
              <div className="aspect-square bg-pink-500 rounded-lg"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 2: Horizontal Movement */}
      <section className="min-h-screen flex items-center justify-center relative">
        <div className="max-w-4xl w-full" style={{ marginLeft: 'clamp(1.5rem, 8vw, 6rem)', marginRight: 'clamp(1.5rem, 8vw, 6rem)' }}>
          <div className="space-y-8">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false, amount: 0.5 }}
              className="text-4xl font-bold text-gray-900 dark:text-gray-100"
            >
              Horizontal Movement
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false, amount: 0.5 }}
              className="text-lg text-gray-600 dark:text-gray-400"
            >
              Elements slide in from the sides, creating dynamic horizontal motion.
            </motion.p>
            <div className="space-y-4">
              <motion.div
                initial={{ x: -200, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.8 }}
                className="h-24 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg"
              ></motion.div>
              <motion.div
                initial={{ x: 200, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.8 }}
                className="h-24 bg-gradient-to-r from-violet-500 to-purple-500 rounded-lg"
              ></motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Vertical Movement */}
      <section className="min-h-screen flex items-center justify-center relative">
        <div className="max-w-4xl w-full" style={{ marginLeft: 'clamp(1.5rem, 8vw, 6rem)', marginRight: 'clamp(1.5rem, 8vw, 6rem)' }}>
          <div className="space-y-8">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false, amount: 0.5 }}
              className="text-4xl font-bold text-gray-900 dark:text-gray-100"
            >
              Vertical Movement
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false, amount: 0.5 }}
              className="text-lg text-gray-600 dark:text-gray-400"
            >
              Watch elements move up and down as you scroll.
            </motion.p>
            <div className="relative h-64 flex items-center justify-center">
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.8 }}
                className="w-32 h-32 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg"
              ></motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Scale Transformations */}
      <section className="min-h-screen flex items-center justify-center relative">
        <div className="max-w-4xl w-full" style={{ marginLeft: 'clamp(1.5rem, 8vw, 6rem)', marginRight: 'clamp(1.5rem, 8vw, 6rem)' }}>
          <div className="space-y-8">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false, amount: 0.5 }}
              className="text-4xl font-bold text-gray-900 dark:text-gray-100"
            >
              Scale Transformations
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false, amount: 0.5 }}
              className="text-lg text-gray-600 dark:text-gray-400"
            >
              Elements can grow and shrink based on scroll position.
            </motion.p>
            <div className="flex justify-center items-center h-64">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.8 }}
                className="w-48 h-48 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg"
              ></motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Progressive Cards */}
      <section className="min-h-screen py-24" style={{ marginLeft: 'clamp(1.5rem, 8vw, 6rem)', marginRight: 'clamp(1.5rem, 8vw, 6rem)' }}>
        <h2 className="text-4xl font-bold mb-12 text-gray-900 dark:text-gray-100">
          Progressive Reveals
        </h2>
        <div className="space-y-12">
          {[1, 2, 3, 4].map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="p-8 rounded-lg border border-gray-200 dark:border-gray-800"
            >
              <div className="flex gap-6">
                <div className={`w-24 h-24 rounded-lg flex-shrink-0 ${
                  index === 0 ? 'bg-red-500' :
                  index === 1 ? 'bg-yellow-500' :
                  index === 2 ? 'bg-green-500' :
                  'bg-indigo-500'
                }`}></div>
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">
                    Feature {item}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    This element animates into view as you scroll down the page, creating a smooth and elegant reveal effect.
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Sticky Section */}
      <div className="h-[200vh] relative">
        <div className="sticky top-0 h-screen flex items-center justify-center bg-white dark:bg-[#1a1a1a] z-10">
          <div className="max-w-4xl w-full" style={{ marginLeft: 'clamp(1.5rem, 8vw, 6rem)', marginRight: 'clamp(1.5rem, 8vw, 6rem)' }}>
            <div className="text-center space-y-8">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                Sticky Storytelling
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                This section stays in place while you scroll, perfect for delivering key messages.
              </p>
              <div className="grid grid-cols-4 gap-4">
                <div className="aspect-square bg-rose-500 rounded-lg"></div>
                <div className="aspect-square bg-fuchsia-500 rounded-lg"></div>
                <div className="aspect-square bg-cyan-500 rounded-lg"></div>
                <div className="aspect-square bg-lime-500 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Finale */}
      <section className="min-h-screen flex items-center justify-center" style={{ marginLeft: 'clamp(1.5rem, 8vw, 6rem)', marginRight: 'clamp(1.5rem, 8vw, 6rem)' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-5xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            The End
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Scrollytelling creates engaging, interactive experiences
          </p>
        </motion.div>
      </section>
    </div>
  );
}

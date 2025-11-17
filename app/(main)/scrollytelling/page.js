'use client';

import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

export default function ScrollytellingPage() {
  const containerRef = useRef(null);
  const [isDark, setIsDark] = useState(false);

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
            Scrollytelling
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">
            Scroll down to experience the magic
          </p>
        </motion.div>
      </section>

      {/* Section 1: Fade In/Out */}
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
              Fade Transitions
            </h2>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400">
              Elements can smoothly fade in and out as you scroll through the page.
            </p>
            <div className="grid grid-cols-3 gap-3 md:gap-4 mt-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="aspect-square bg-blue-500 rounded-lg"
                style={{ willChange: 'transform, opacity' }}
              ></motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="aspect-square bg-purple-500 rounded-lg"
                style={{ willChange: 'transform, opacity' }}
              ></motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="aspect-square bg-pink-500 rounded-lg"
                style={{ willChange: 'transform, opacity' }}
              ></motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 2: Horizontal Movement */}
      <section className="min-h-[50vh] py-12 flex items-center justify-center relative px-6 md:px-12 lg:px-24">
        <div className="max-w-4xl w-full">
          <div className="space-y-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100"
            >
              Horizontal Movement
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-base md:text-lg text-gray-600 dark:text-gray-400"
            >
              Elements slide in from the sides, creating dynamic horizontal motion.
            </motion.p>
            <div className="space-y-3 md:space-y-4 mt-4">
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }}
                className="h-20 md:h-24 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg"
                style={{ willChange: 'transform, opacity' }}
              ></motion.div>
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9], delay: 0.1 }}
                className="h-20 md:h-24 bg-gradient-to-r from-violet-500 to-purple-500 rounded-lg"
                style={{ willChange: 'transform, opacity' }}
              ></motion.div>
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9], delay: 0.2 }}
                className="h-20 md:h-24 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg"
                style={{ willChange: 'transform, opacity' }}
              ></motion.div>
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9], delay: 0.3 }}
                className="h-20 md:h-24 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg"
                style={{ willChange: 'transform, opacity' }}
              ></motion.div>
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9], delay: 0.4 }}
                className="h-20 md:h-24 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg"
                style={{ willChange: 'transform, opacity' }}
              ></motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Vertical Movement */}
      <section className="min-h-[50vh] py-12 flex items-end justify-center relative px-6 md:px-12 lg:px-24">
        <div className="max-w-4xl w-full">
          <div className="space-y-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100"
            >
              Vertical Movement
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-base md:text-lg text-gray-600 dark:text-gray-400"
            >
              Watch elements move up and down as you scroll.
            </motion.p>
            <motion.div
              initial={{ y: 150, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, ease: [0.6, 0.05, 0.01, 0.9] }}
              className="w-full h-full min-h-[200px] bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg mt-4"
              style={{ willChange: 'transform, opacity' }}
            ></motion.div>
          </div>
        </div>
      </section>

      {/* Section 4: Scale Transformations */}
      <section className="min-h-[50vh] py-12 flex items-end justify-center relative px-6 md:px-12 lg:px-24">
        <div className="max-w-4xl w-full">
          <div className="space-y-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100"
            >
              Scale Transformations
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-base md:text-lg text-gray-600 dark:text-gray-400"
            >
              Elements can grow and shrink based on scroll position.
            </motion.p>
            <motion.div
              initial={{ scaleX: 0.3, scaleY: 1, opacity: 0 }}
              whileInView={{ scaleX: 1, scaleY: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, ease: [0.6, 0.05, 0.01, 0.9] }}
              className="w-full h-full min-h-[200px] bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg mt-4"
              style={{ willChange: 'transform, opacity', transformOrigin: 'center' }}
            ></motion.div>
          </div>
        </div>
      </section>

      {/* Progressive Cards */}
      <section className="min-h-[50vh] py-12 flex items-center justify-center relative px-6 md:px-12 lg:px-24">
        <div className="max-w-4xl w-full">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            Progressive Reveals
          </h2>
          <div className="space-y-6">
            {[1, 2, 3, 4].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.6, 0.05, 0.01, 0.9] }}
                viewport={{ once: true, amount: 0.3 }}
                className="p-6 md:p-8 rounded-lg border border-gray-200 dark:border-gray-800"
                style={{ willChange: 'transform, opacity' }}
              >
                <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
                  <div className={`w-20 h-20 md:w-24 md:h-24 rounded-lg flex-shrink-0 ${
                    index === 0 ? 'bg-red-500' :
                    index === 1 ? 'bg-yellow-500' :
                    index === 2 ? 'bg-green-500' :
                    'bg-indigo-500'
                  }`}></div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">
                      Feature {item}
                    </h3>
                    <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                      This element animates into view as you scroll down the page, creating a smooth and elegant reveal effect.
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sticky Section */}
      <div className="relative min-h-[300vh]">
        {/* Scrolling background content */}
        <div className="absolute inset-0 px-6 md:px-12 lg:px-24 py-24 overflow-hidden">
          <div className="max-w-4xl mx-auto space-y-32">
            {/* Large scrolling numbers */}
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => {
              // Deterministic widths based on num and bar index to avoid hydration errors
              const getWidth = (numIndex, barIndex) => {
                const seed = numIndex * 3 + barIndex;
                return 60 + ((seed * 7) % 40);
              };

              return (
                <div key={num} className="relative">
                  <div
                    className="text-[20vw] md:text-[15vw] font-bold text-gray-200 dark:text-gray-800 leading-none select-none"
                    style={{ opacity: 0.3 }}
                  >
                    {num.toString().padStart(2, '0')}
                  </div>
                  <div className="mt-4 space-y-2">
                    {[1, 2, 3].map((bar) => (
                      <div
                        key={bar}
                        className="h-4 bg-gray-300 dark:bg-gray-700 rounded"
                        style={{
                          width: `${getWidth(num, bar)}%`,
                          opacity: 0.4
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sticky content */}
        <div
          className="sticky top-0 h-screen flex items-center justify-center z-10 px-6 md:px-12 lg:px-24"
          style={{
            backgroundColor: isDark ? 'rgba(26, 26, 26, 0.5)' : 'rgba(255, 255, 255, 0.5)',
            WebkitBackdropFilter: 'blur(4px)',
            backdropFilter: 'blur(4px)',
            willChange: 'transform'
          }}
        >
          <div className="max-w-4xl w-full">
            <div className="text-center space-y-4 bg-white dark:bg-[#1a1a1a] p-8 rounded-lg shadow-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
                Sticky Storytelling
              </h2>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-400">
                Watch the content scroll behind as this section stays fixed
              </p>
              <div className="grid grid-cols-4 gap-3 md:gap-4 max-w-2xl mx-auto mt-4">
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
            Scrollytelling creates engaging, interactive experiences
          </p>
        </motion.div>
      </section>
    </div>
  );
}

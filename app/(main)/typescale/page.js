'use client';

import { useState, useEffect } from 'react';
import CodeBlock from '@/components/CodeBlock';

export default function TypeScalePage() {
  const [baseSize, setBaseSize] = useState(16);
  const [ratio, setRatio] = useState(1.25);
  const [previewText, setPreviewText] = useState('The quick brown fox jumps over the lazy dog');
  const [typeface, setTypeface] = useState('IBM Plex Sans');
  const [fontWeight, setFontWeight] = useState('400');
  const [activeTab, setActiveTab] = useState('css');

  const ratios = {
    'Minor second': 1.067,
    'Major second': 1.125,
    'Minor third': 1.2,
    'Major third': 1.25,
    'Perfect fourth': 1.333,
    'Augmented fourth': 1.414,
    'Perfect fifth': 1.5,
    'Golden ratio': 1.618,
  };

  const typefaces = {
    'IBM Plex Sans': { family: 'IBM Plex Sans', fallback: 'sans-serif', weights: ['100', '200', '300', '400', '500', '600', '700'] },
    'IBM Plex Serif': { family: 'IBM Plex Serif', fallback: 'serif', weights: ['100', '200', '300', '400', '500', '600', '700'] },
    'IBM Plex Mono': { family: 'IBM Plex Mono', fallback: 'monospace', weights: ['100', '200', '300', '400', '500', '600', '700'] },
    'Inter': { family: 'Inter', fallback: 'sans-serif', weights: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] },
    'Roboto': { family: 'Roboto', fallback: 'sans-serif', weights: ['100', '300', '400', '500', '700', '900'] },
    'Open Sans': { family: 'Open Sans', fallback: 'sans-serif', weights: ['300', '400', '500', '600', '700', '800'] },
    'Lora': { family: 'Lora', fallback: 'serif', weights: ['400', '500', '600', '700'] },
    'Merriweather': { family: 'Merriweather', fallback: 'serif', weights: ['300', '400', '700', '900'] },
    'Source Code Pro': { family: 'Source Code Pro', fallback: 'monospace', weights: ['200', '300', '400', '500', '600', '700', '900'] },
  };

  // Check if manual ratio matches a modular scale
  const isModularScale = () => {
    return Object.values(ratios).some(r => Math.abs(r - ratio) < 0.001);
  };

  // Generate scale steps (positive for larger to negative for smaller)
  const steps = [8, 7, 6, 5, 4, 3, 2, 1, 0, -1, -2];

  const calculateSize = (step) => {
    return baseSize * Math.pow(ratio, step);
  };

  const formatSize = (size) => {
    return {
      px: Math.round(size),
      rem: (size / 16).toFixed(3),
    };
  };

  const downloadCode = (code, filename) => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const generateCSS = () => {
    return steps.map((step) => {
      const size = calculateSize(step);
      const formatted = formatSize(size);
      return `.text-${step >= 0 ? step : 'neg' + Math.abs(step)} {\n  font-size: ${formatted.rem}rem; /* ${formatted.px}px */\n}`;
    }).join('\n\n');
  };

  const generateCSSVariables = () => {
    return `:root {\n${steps.map((step) => {
      const size = calculateSize(step);
      const formatted = formatSize(size);
      return `  --font-size-${step >= 0 ? step : 'neg' + Math.abs(step)}: ${formatted.rem}rem; /* ${formatted.px}px */`;
    }).join('\n')}\n}`;
  };

  const generateDesignTokens = () => {
    return JSON.stringify({
      fontSize: steps.reduce((acc, step) => {
        const size = calculateSize(step);
        const formatted = formatSize(size);
        acc[step >= 0 ? step : `neg${Math.abs(step)}`] = {
          value: formatted.rem,
          type: 'dimension',
          comment: `${formatted.px}px`
        };
        return acc;
      }, {})
    }, null, 2);
  };

  // Load Google Fonts dynamically
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Roboto:wght@400;700&family=Open+Sans:wght@400;700&family=Lora:wght@400;700&family=Merriweather:wght@400;700&family=Source+Code+Pro:wght@400;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div className="py-12 bg-white dark:bg-[#1a1a1a]">
      {/* Hero Section */}
      <section className="mb-12" style={{ marginLeft: 'clamp(1.5rem, 8vw, 6rem)', marginRight: 'clamp(1.5rem, 8vw, 6rem)' }}>
        <div className="max-w-4xl">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            Type scale generator
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Create harmonious typographic scales using modular ratios. Adjust the base size and ratio to generate a custom scale.
          </p>
        </div>
      </section>

      {/* Controls */}
      <section className="mb-12 pb-12 border-b border-gray-200 dark:border-[#2a2a2a]" style={{ marginLeft: 'clamp(1.5rem, 8vw, 6rem)', marginRight: 'clamp(1.5rem, 8vw, 6rem)' }}>
        <div className="grid grid-cols-12 gap-6 max-w-6xl">
          {/* Base Size */}
          <div className="col-span-2">
            <label className="block text-sm mb-3 text-gray-900 dark:text-gray-100">
              Base size
            </label>
            <div className="space-y-3">
              <div className="relative">
                <input
                  type="number"
                  min="12"
                  max="24"
                  value={baseSize}
                  onChange={(e) => setBaseSize(Number(e.target.value))}
                  className="w-full pl-3 pr-10 py-2 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded-lg text-gray-900 dark:text-gray-100 font-mono text-sm h-[38px]"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 dark:text-gray-500 pointer-events-none">px</span>
              </div>
              <input
                type="range"
                min="12"
                max="24"
                step="1"
                value={baseSize}
                onChange={(e) => setBaseSize(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-[#2a2a2a] rounded-lg appearance-none cursor-pointer accent-gray-900 dark:accent-gray-100"
              />
            </div>
          </div>

          {/* Ratio */}
          <div className="col-span-2">
            <label className="block text-sm mb-3 text-gray-900 dark:text-gray-100">
              Scale ratio
            </label>
            <select
              value={ratio}
              onChange={(e) => setRatio(Number(e.target.value))}
              className="w-full px-3 py-2 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded-lg text-gray-900 dark:text-gray-100 text-sm cursor-pointer h-[38px]"
            >
              {Object.entries(ratios).map(([name, value]) => (
                <option key={name} value={value}>
                  {name} ({value})
                </option>
              ))}
            </select>
            <div className="mt-3">
              <input
                type="number"
                min="1"
                max="2"
                step="0.001"
                value={ratio}
                onChange={(e) => setRatio(Number(e.target.value))}
                className="w-full px-3 py-2 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded-lg text-gray-900 dark:text-gray-100 font-mono text-sm h-[38px]"
              />
              {!isModularScale() && (
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-500">Not a modular scale</p>
              )}
            </div>
          </div>

          {/* Typeface */}
          <div className="col-span-2">
            <label className="block text-sm mb-3 text-gray-900 dark:text-gray-100">
              Typeface
            </label>
            <select
              value={typeface}
              onChange={(e) => {
                setTypeface(e.target.value);
                // Reset to default weight if current weight not available
                if (!typefaces[e.target.value].weights.includes(fontWeight)) {
                  setFontWeight('400');
                }
              }}
              className="w-full px-3 py-2 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded-lg text-gray-900 dark:text-gray-100 text-sm cursor-pointer h-[38px]"
            >
              {Object.keys(typefaces).map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
            <div className="mt-3">
              <select
                value={fontWeight}
                onChange={(e) => setFontWeight(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded-lg text-gray-900 dark:text-gray-100 text-sm cursor-pointer h-[38px]"
              >
                {typefaces[typeface].weights.map((weight) => (
                  <option key={weight} value={weight}>
                    {weight}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Preview Text */}
          <div className="col-span-6">
            <label className="block text-sm mb-3 text-gray-900 dark:text-gray-100">
              Preview text
            </label>
            <input
              type="text"
              value={previewText}
              onChange={(e) => setPreviewText(e.target.value)}
              className="w-full px-3 py-2 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded-lg text-gray-900 dark:text-gray-100 text-sm h-[38px]"
              placeholder="Enter preview text"
            />
          </div>
        </div>
      </section>

      {/* Scale Preview */}
      {/* TODO: Fix vertical spacing. Urgent. */}
      <section className="mb-12 pt-12">
        {/* Scale Display */}
        <div style={{ marginLeft: 'clamp(1.5rem, 8vw, 6rem)', marginRight: 'clamp(1.5rem, 8vw, 6rem)' }}>
          {/* Info */}
          <div className="mb-6">
            <h2 className="text-3xl mb-8 text-gray-900 dark:text-gray-100">Your scale</h2>
            <div className="flex flex-wrap gap-8 text-gray-700 dark:text-gray-300">
              <p>
                Base size: <span className="font-mono font-semibold text-gray-900 dark:text-gray-100">{baseSize}px</span>
              </p>
              <p>
                Ratio: <span className="font-mono font-semibold text-gray-900 dark:text-gray-100">{ratio}</span>
              </p>
            </div>
          </div>
          {steps.map((step, index) => {
            const size = calculateSize(step);
            const formatted = formatSize(size);

            return (
              <div
                key={step}
                className={`${
                  index === 0
                    ? 'pt-6 pb-6 border-t border-b border-gray-200 dark:border-[#2a2a2a]'
                    : 'pt-6 pb-6 border-b border-gray-200 dark:border-[#2a2a2a]'
                }`}
                style={{ marginLeft: '-clamp(1.5rem, 8vw, 6rem)', marginRight: '-clamp(1.5rem, 8vw, 6rem)' }}
              >
                <div style={{ marginLeft: 'clamp(1.5rem, 8vw, 6rem)', marginRight: 'clamp(1.5rem, 8vw, 6rem)' }}>
                  <div className="mb-6">
                    <span className="text-xs font-mono text-gray-500 dark:text-gray-500 mr-6">
                      {formatted.rem}rem
                    </span>
                    <span className="text-xs font-mono text-gray-500 dark:text-gray-500">
                      {formatted.px}px
                    </span>
                  </div>
                  <p
                    className="text-gray-900 dark:text-gray-100 break-words"
                    style={{
                      fontSize: `${size}px`,
                      lineHeight: '1.2',
                      fontFamily: `"${typefaces[typeface].family}", ${typefaces[typeface].fallback}`,
                      fontWeight: fontWeight
                    }}
                  >
                    {previewText}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Export Code */}
      <section className="mb-12 pt-12" style={{ marginLeft: 'clamp(1.5rem, 8vw, 6rem)', marginRight: 'clamp(1.5rem, 8vw, 6rem)' }}>
        <h2 className="text-3xl mb-8 text-gray-900 dark:text-gray-100">Export code</h2>

        {/* Tabs and Download Buttons */}
        <div className="flex items-center justify-between mb-4 border-b border-gray-200 dark:border-[#2a2a2a]">
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab('css')}
              className={`px-4 py-2 text-sm transition-colors ${
                activeTab === 'css'
                  ? 'text-gray-900 dark:text-gray-100 border-b-2 border-gray-900 dark:border-gray-100'
                  : 'text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              CSS
            </button>
            <button
              onClick={() => setActiveTab('css-variables')}
              className={`px-4 py-2 text-sm transition-colors ${
                activeTab === 'css-variables'
                  ? 'text-gray-900 dark:text-gray-100 border-b-2 border-gray-900 dark:border-gray-100'
                  : 'text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              CSS variables
            </button>
            <button
              onClick={() => setActiveTab('design-tokens')}
              className={`px-4 py-2 text-sm transition-colors ${
                activeTab === 'design-tokens'
                  ? 'text-gray-900 dark:text-gray-100 border-b-2 border-gray-900 dark:border-gray-100'
                  : 'text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              Design tokens
            </button>
          </div>

          <div className="flex gap-2 pb-2">
            <button
              onClick={() => downloadCode(generateCSS(), 'type-scale.css')}
              className="px-3 py-1.5 text-xs bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded-md hover:bg-gray-50 dark:hover:bg-[#2a2a2a] transition-colors text-gray-900 dark:text-gray-100"
            >
              Download CSS
            </button>
            <button
              onClick={() => downloadCode(generateCSSVariables(), 'type-scale-variables.css')}
              className="px-3 py-1.5 text-xs bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded-md hover:bg-gray-50 dark:hover:bg-[#2a2a2a] transition-colors text-gray-900 dark:text-gray-100"
            >
              Download variables
            </button>
            <button
              onClick={() => downloadCode(generateDesignTokens(), 'type-scale-tokens.json')}
              className="px-3 py-1.5 text-xs bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded-md hover:bg-gray-50 dark:hover:bg-[#2a2a2a] transition-colors text-gray-900 dark:text-gray-100"
            >
              Download tokens
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'css' && (
            <CodeBlock
              language="css"
              code={generateCSS()}
            />
          )}
          {activeTab === 'css-variables' && (
            <CodeBlock
              language="css"
              code={generateCSSVariables()}
            />
          )}
          {activeTab === 'design-tokens' && (
            <CodeBlock
              language="json"
              code={generateDesignTokens()}
            />
          )}
        </div>
      </section>

      {/* Info - Commented out for now */}
      {/* <section className="py-12 border-t border-gray-200 dark:border-[#2a2a2a]">
        <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">About modular scales</h2>

        <div className="max-w-3xl space-y-6 text-gray-700 dark:text-gray-300">
          <p className="text-lg">
            A modular scale is a sequence of numbers that relate to one another through a common ratio. When applied to typography, it creates a harmonious relationship between font sizes.
          </p>

          <div>
            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">Common ratios</h3>
            <ul className="space-y-2 text-sm">
              <li className="before:content-['•_'] before:text-gray-400">
                <strong>Minor third (1.2)</strong> – Subtle, suitable for dense layouts
              </li>
              <li className="before:content-['•_'] before:text-gray-400">
                <strong>Major third (1.25)</strong> – Balanced, versatile for most projects
              </li>
              <li className="before:content-['•_'] before:text-gray-400">
                <strong>Perfect fourth (1.333)</strong> – More dramatic, good for marketing sites
              </li>
              <li className="before:content-['•_'] before:text-gray-400">
                <strong>Perfect fifth (1.5)</strong> – Bold, creates strong hierarchy
              </li>
              <li className="before:content-['•_'] before:text-gray-400">
                <strong>Golden ratio (1.618)</strong> – Mathematical harmony, very dramatic
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">Usage tips</h3>
            <ul className="space-y-2 text-sm">
              <li className="before:content-['•_'] before:text-gray-400">
                Start with a base size between 16-18px for body text
              </li>
              <li className="before:content-['•_'] before:text-gray-400">
                Choose a ratio based on your design needs – smaller ratios for subtle contrast, larger for dramatic hierarchy
              </li>
              <li className="before:content-['•_'] before:text-gray-400">
                You don't need to use every step – select sizes that work for your specific needs
              </li>
              <li className="before:content-['•_'] before:text-gray-400">
                Test your scale with real content to ensure readability at all sizes
              </li>
            </ul>
          </div>
        </div>
      </section> */}
    </div>
  );
}

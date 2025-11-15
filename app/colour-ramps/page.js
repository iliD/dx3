'use client';

import { useState } from 'react';
import RampPreview from '@/components/colour-ramps/RampPreview';
import RampExport from '@/components/colour-ramps/RampExport';
import SteppedRampGenerator from '@/components/colour-ramps/SteppedRampGenerator';

export default function ColourRampsPage() {
  const [mode, setMode] = useState('gradient'); // 'gradient' or 'scale'
  const [ramp, setRamp] = useState({
    name: '',
    stops: [
      { value: 0, color: '#0000ff', alpha: 1 },
      { value: 50, color: '#00ff00', alpha: 1 },
      { value: 100, color: '#ff0000', alpha: 1 }
    ],
    range: {
      min: 0,
      max: 100,
      decimals: 0
    }
  });

  const generateFromSteps = (generatedRamp) => {
    setRamp(generatedRamp);
  };

  return (
    <div className="py-12 bg-white dark:bg-[#1a1a1a]">
      {/* Hero Section */}
      <section className="mb-8" style={{ marginLeft: 'clamp(1.5rem, 8vw, 6rem)', marginRight: 'clamp(1.5rem, 8vw, 6rem)' }}>
        <div className="max-w-6xl">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            Colour tools
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
            Create stepped color ramps for design systems. Export to CSS variables, design tokens, and Figma.
          </p>

          {/* Mode Segmented Control */}
          <div className="inline-flex rounded-lg border border-gray-200 dark:border-[#2a2a2a] bg-gray-50 dark:bg-[#0a0a0a] p-1">
            <button
              onClick={() => setMode('gradient')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                mode === 'gradient'
                  ? 'bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-gray-100 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              Create a gradient
            </button>
            <button
              onClick={() => setMode('scale')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                mode === 'scale'
                  ? 'bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-gray-100 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              Create a ramp
            </button>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" style={{ marginLeft: 'clamp(1.5rem, 8vw, 6rem)', marginRight: 'clamp(1.5rem, 8vw, 6rem)' }}>
        {/* Left Column - Generator */}
        <div className="space-y-6">
          <div className="border border-gray-200 dark:border-[#2a2a2a] rounded-lg p-6">
            <h2 className="text-lg font-normal mb-4 text-gray-900 dark:text-gray-100" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>Colour preferences</h2>
            <SteppedRampGenerator onGenerateRamp={generateFromSteps} />
          </div>
        </div>

        {/* Right Column - Preview & Export */}
        <div className="space-y-6">
          {mode === 'gradient' && (
            <div className="border border-gray-200 dark:border-[#2a2a2a] rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Preview</h2>
              <RampPreview ramp={ramp} mode={mode} />
            </div>
          )}

          <div className="border border-gray-200 dark:border-[#2a2a2a] rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Export</h2>
            <RampExport ramp={ramp} mode={mode} />
          </div>
        </div>
      </div>
    </div>
  );
}

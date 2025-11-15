'use client';

import { useState } from 'react';
import ColorRampEditor from '@/components/colour-ramps/ColorRampEditor';
import RampPreview from '@/components/colour-ramps/RampPreview';
import RampTemplates from '@/components/colour-ramps/RampTemplates';
import RampExport from '@/components/colour-ramps/RampExport';

export default function ColourRampsPage() {
  const [ramp, setRamp] = useState({
    name: 'Custom Ramp',
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

  const updateStop = (index, updates) => {
    const newStops = [...ramp.stops];
    newStops[index] = { ...newStops[index], ...updates };
    setRamp({ ...ramp, stops: newStops });
  };

  const addStop = () => {
    const newStops = [...ramp.stops];
    // Find middle value between stops
    const middleValue = ramp.stops.length > 0
      ? (ramp.range.min + ramp.range.max) / 2
      : 50;
    newStops.push({
      value: middleValue,
      color: '#808080',
      alpha: 1
    });
    // Sort by value
    newStops.sort((a, b) => a.value - b.value);
    setRamp({ ...ramp, stops: newStops });
  };

  const removeStop = (index) => {
    if (ramp.stops.length <= 2) return; // Keep at least 2 stops
    const newStops = ramp.stops.filter((_, i) => i !== index);
    setRamp({ ...ramp, stops: newStops });
  };

  const updateRange = (updates) => {
    setRamp({ ...ramp, range: { ...ramp.range, ...updates } });
  };

  const loadTemplate = (template) => {
    setRamp(template);
  };

  return (
    <div className="py-12 bg-white dark:bg-[#1a1a1a]">
      {/* Hero Section */}
      <section className="mb-12" style={{ marginLeft: 'clamp(1.5rem, 8vw, 6rem)', marginRight: 'clamp(1.5rem, 8vw, 6rem)' }}>
        <div className="max-w-6xl">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            Colour ramp generator
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Create custom color gradients for data visualization, mapping, and GIS applications. Export to multiple formats including HTML, JSON, CSS, SLD, QGIS, and Google Earth Engine.
          </p>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" style={{ marginLeft: 'clamp(1.5rem, 8vw, 6rem)', marginRight: 'clamp(1.5rem, 8vw, 6rem)' }}>
        {/* Left Column - Editor & Templates */}
        <div className="lg:col-span-5 space-y-6">
          <div className="border border-gray-200 dark:border-[#2a2a2a] rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Templates</h2>
            <RampTemplates onLoadTemplate={loadTemplate} />
          </div>

          <div className="border border-gray-200 dark:border-[#2a2a2a] rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Color stops</h2>
              <button
                onClick={addStop}
                className="px-3 py-1.5 text-sm bg-gray-900 dark:bg-gray-100 text-white dark:text-black rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
              >
                Add stop
              </button>
            </div>
            <ColorRampEditor
              stops={ramp.stops}
              range={ramp.range}
              onUpdateStop={updateStop}
              onRemoveStop={removeStop}
              onUpdateRange={updateRange}
            />
          </div>
        </div>

        {/* Right Column - Preview & Export */}
        <div className="lg:col-span-7 space-y-6">
          <div className="border border-gray-200 dark:border-[#2a2a2a] rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Preview</h2>
            <RampPreview ramp={ramp} />
          </div>

          <div className="border border-gray-200 dark:border-[#2a2a2a] rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Export</h2>
            <RampExport ramp={ramp} />
          </div>
        </div>
      </div>
    </div>
  );
}

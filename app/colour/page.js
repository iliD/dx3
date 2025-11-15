'use client';

import { useState } from 'react';
import ColorPicker from '@/components/colour/ColorPicker';
import ColorInputs from '@/components/colour/ColorInputs';
import ColorPalette from '@/components/colour/ColorPalette';
import AccessibilityChecker from '@/components/colour/AccessibilityChecker';
import ExportPanel from '@/components/colour/ExportPanel';
import { converter, formatHex, formatRgb, formatHsl } from 'culori';

export default function ColourPage() {
  const [currentColor, setCurrentColor] = useState({
    hex: '#3b82f6',
    rgb: { r: 59, g: 130, b: 246 },
    hsl: { h: 217, s: 91, l: 60 },
    oklch: { l: 0.62, c: 0.17, h: 252 },
    lab: { l: 57, a: 12, b: -58 },
    lch: { l: 57, c: 59, h: 282 }
  });

  const [palette, setPalette] = useState([
    '#3b82f6',
    '#8b5cf6',
    '#ec4899',
    '#f59e0b',
    '#10b981'
  ]);

  const [selectedPaletteIndex, setSelectedPaletteIndex] = useState(0);
  const [colorSpace, setColorSpace] = useState('oklch');
  const [contrastCheckColor, setContrastCheckColor] = useState('#ffffff');

  const updateColor = (newColor) => {
    setCurrentColor(newColor);

    // Update palette if a color is selected
    if (selectedPaletteIndex !== null) {
      const newPalette = [...palette];
      newPalette[selectedPaletteIndex] = newColor.hex;
      setPalette(newPalette);
    }
  };

  const addColorToPalette = () => {
    setPalette([...palette, currentColor.hex]);
    setSelectedPaletteIndex(palette.length);
  };

  const removeColorFromPalette = (index) => {
    const newPalette = palette.filter((_, i) => i !== index);
    setPalette(newPalette);
    if (selectedPaletteIndex === index) {
      setSelectedPaletteIndex(null);
    } else if (selectedPaletteIndex > index) {
      setSelectedPaletteIndex(selectedPaletteIndex - 1);
    }
  };

  return (
    <div className="py-12 bg-white dark:bg-[#1a1a1a]">
      {/* Hero Section */}
      <section className="mb-12" style={{ marginLeft: 'clamp(1.5rem, 8vw, 6rem)', marginRight: 'clamp(1.5rem, 8vw, 6rem)' }}>
        <div className="max-w-6xl">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            Colour palette generator
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Professional color picker with support for OKLCH, LAB, LCH, RGB, HSL, and HEX. Create accessible color palettes with real-time contrast checking.
          </p>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" style={{ marginLeft: 'clamp(1.5rem, 8vw, 6rem)', marginRight: 'clamp(1.5rem, 8vw, 6rem)' }}>
        {/* Left Column - Color Picker */}
        <div className="lg:col-span-5 space-y-6">
          <div className="border border-gray-200 dark:border-[#2a2a2a] rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Color picker</h2>
            <ColorPicker
              color={currentColor}
              onChange={updateColor}
              colorSpace={colorSpace}
            />
          </div>

          <div className="border border-gray-200 dark:border-[#2a2a2a] rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Color values</h2>
              <select
                value={colorSpace}
                onChange={(e) => setColorSpace(e.target.value)}
                className="px-3 py-1.5 text-sm bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded-md text-gray-900 dark:text-gray-100"
              >
                <option value="oklch">OKLCH</option>
                <option value="lch">LCH</option>
                <option value="lab">LAB</option>
                <option value="hsl">HSL</option>
                <option value="rgb">RGB</option>
                <option value="hex">HEX</option>
              </select>
            </div>
            <ColorInputs
              color={currentColor}
              onChange={updateColor}
              colorSpace={colorSpace}
            />
          </div>
        </div>

        {/* Right Column - Palette & Accessibility */}
        <div className="lg:col-span-7 space-y-6">
          <div className="border border-gray-200 dark:border-[#2a2a2a] rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Palette</h2>
              <button
                onClick={addColorToPalette}
                className="px-3 py-1.5 text-sm bg-gray-900 dark:bg-gray-100 text-white dark:text-black rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
              >
                Add to palette
              </button>
            </div>
            <ColorPalette
              palette={palette}
              selectedIndex={selectedPaletteIndex}
              onSelect={(index) => {
                setSelectedPaletteIndex(index);
                // Load selected color
                const selectedHex = palette[index];
                const oklch = converter('oklch');
                const lab = converter('lab');
                const lch = converter('lch');
                const rgb = converter('rgb');
                const hsl = converter('hsl');

                const color = {
                  hex: selectedHex,
                  rgb: rgb(selectedHex),
                  hsl: hsl(selectedHex),
                  oklch: oklch(selectedHex),
                  lab: lab(selectedHex),
                  lch: lch(selectedHex)
                };
                setCurrentColor(color);
              }}
              onRemove={removeColorFromPalette}
              onReorder={setPalette}
            />
          </div>

          <div className="border border-gray-200 dark:border-[#2a2a2a] rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Accessibility</h2>
            <AccessibilityChecker
              foreground={currentColor.hex}
              background={contrastCheckColor}
              onBackgroundChange={setContrastCheckColor}
            />
          </div>

          <div className="border border-gray-200 dark:border-[#2a2a2a] rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Export</h2>
            <ExportPanel palette={palette} currentColor={currentColor} />
          </div>
        </div>
      </div>
    </div>
  );
}

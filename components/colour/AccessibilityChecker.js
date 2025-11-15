'use client';

import { wcagContrast, wcagLuminance, converter } from 'culori';

export default function AccessibilityChecker({ foreground, background, onBackgroundChange }) {
  const toRgb = converter('rgb');

  // Calculate WCAG contrast ratio
  const contrastRatio = wcagContrast(foreground, background);

  // WCAG AA and AAA compliance
  const wcagAA = {
    normalText: contrastRatio >= 4.5,
    largeText: contrastRatio >= 3.0,
    ui: contrastRatio >= 3.0
  };

  const wcagAAA = {
    normalText: contrastRatio >= 7.0,
    largeText: contrastRatio >= 4.5
  };

  // Simulate color blindness
  const simulateProtanopia = (color) => {
    const rgb = toRgb(color);
    if (!rgb) return color;

    // Simplified protanopia simulation
    const r = 0.567 * rgb.r + 0.433 * rgb.g;
    const g = 0.558 * rgb.r + 0.442 * rgb.g;
    const b = 0.242 * rgb.g + 0.758 * rgb.b;

    return `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`;
  };

  const simulateDeuteranopia = (color) => {
    const rgb = toRgb(color);
    if (!rgb) return color;

    const r = 0.625 * rgb.r + 0.375 * rgb.g;
    const g = 0.7 * rgb.r + 0.3 * rgb.g;
    const b = 0.3 * rgb.g + 0.7 * rgb.b;

    return `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`;
  };

  const simulateTritanopia = (color) => {
    const rgb = toRgb(color);
    if (!rgb) return color;

    const r = 0.95 * rgb.r + 0.05 * rgb.g;
    const g = 0.433 * rgb.g + 0.567 * rgb.b;
    const b = 0.475 * rgb.g + 0.525 * rgb.b;

    return `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`;
  };

  const getContrastLevel = () => {
    if (contrastRatio >= 7.0) return { level: 'AAA', color: 'text-green-600 dark:text-green-400' };
    if (contrastRatio >= 4.5) return { level: 'AA', color: 'text-blue-600 dark:text-blue-400' };
    if (contrastRatio >= 3.0) return { level: 'AA Large', color: 'text-yellow-600 dark:text-yellow-400' };
    return { level: 'Fail', color: 'text-red-600 dark:text-red-400' };
  };

  const contrastLevel = getContrastLevel();

  return (
    <div className="space-y-6">
      {/* Contrast Ratio */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Contrast ratio</h3>
          <div className={`text-2xl font-bold font-mono ${contrastLevel.color}`}>
            {contrastRatio.toFixed(2)}:1
          </div>
        </div>

        {/* Background color input */}
        <div className="mb-4">
          <label className="block text-xs text-gray-600 dark:text-gray-400 mb-2">Background color</label>
          <div className="flex gap-2">
            <input
              type="color"
              value={background}
              onChange={(e) => onBackgroundChange(e.target.value)}
              className="w-12 h-10 rounded border border-gray-200 dark:border-[#2a2a2a] cursor-pointer"
            />
            <input
              type="text"
              value={background}
              onChange={(e) => onBackgroundChange(e.target.value)}
              className="flex-1 px-3 py-2 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded-md text-gray-900 dark:text-gray-100 font-mono text-sm"
            />
          </div>
        </div>

        {/* Preview */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div
            className="p-4 rounded-lg border border-gray-200 dark:border-[#2a2a2a]"
            style={{ backgroundColor: background, color: foreground }}
          >
            <div className="text-sm mb-1">Normal text</div>
            <div className="text-xs opacity-75">Small text sample</div>
          </div>
          <div
            className="p-4 rounded-lg border border-gray-200 dark:border-[#2a2a2a]"
            style={{ backgroundColor: background, color: foreground }}
          >
            <div className="text-lg font-bold">Large text</div>
            <div className="text-sm">18px bold or 24px+</div>
          </div>
        </div>

        {/* WCAG Compliance */}
        <div className="space-y-2">
          <div className="flex items-center justify-between py-2 px-3 bg-gray-50 dark:bg-[#0a0a0a] rounded-md">
            <span className="text-sm text-gray-700 dark:text-gray-300">WCAG AA - Normal text</span>
            <span className={wcagAA.normalText ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
              {wcagAA.normalText ? '✓ Pass' : '✗ Fail'}
            </span>
          </div>
          <div className="flex items-center justify-between py-2 px-3 bg-gray-50 dark:bg-[#0a0a0a] rounded-md">
            <span className="text-sm text-gray-700 dark:text-gray-300">WCAG AA - Large text</span>
            <span className={wcagAA.largeText ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
              {wcagAA.largeText ? '✓ Pass' : '✗ Fail'}
            </span>
          </div>
          <div className="flex items-center justify-between py-2 px-3 bg-gray-50 dark:bg-[#0a0a0a] rounded-md">
            <span className="text-sm text-gray-700 dark:text-gray-300">WCAG AAA - Normal text</span>
            <span className={wcagAAA.normalText ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
              {wcagAAA.normalText ? '✓ Pass' : '✗ Fail'}
            </span>
          </div>
          <div className="flex items-center justify-between py-2 px-3 bg-gray-50 dark:bg-[#0a0a0a] rounded-md">
            <span className="text-sm text-gray-700 dark:text-gray-300">WCAG AAA - Large text</span>
            <span className={wcagAAA.largeText ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
              {wcagAAA.largeText ? '✓ Pass' : '✗ Fail'}
            </span>
          </div>
        </div>
      </div>

      {/* Color Blindness Simulation */}
      <div>
        <h3 className="text-sm font-semibold mb-3 text-gray-900 dark:text-gray-100">Color blindness simulation</h3>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">Protanopia (red-blind)</div>
            <div
              className="p-3 rounded-lg border border-gray-200 dark:border-[#2a2a2a]"
              style={{
                backgroundColor: simulateProtanopia(background),
                color: simulateProtanopia(foreground)
              }}
            >
              <div className="text-sm font-semibold">Sample text</div>
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">Deuteranopia (green-blind)</div>
            <div
              className="p-3 rounded-lg border border-gray-200 dark:border-[#2a2a2a]"
              style={{
                backgroundColor: simulateDeuteranopia(background),
                color: simulateDeuteranopia(foreground)
              }}
            >
              <div className="text-sm font-semibold">Sample text</div>
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">Tritanopia (blue-blind)</div>
            <div
              className="p-3 rounded-lg border border-gray-200 dark:border-[#2a2a2a]"
              style={{
                backgroundColor: simulateTritanopia(background),
                color: simulateTritanopia(foreground)
              }}
            >
              <div className="text-sm font-semibold">Sample text</div>
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">Normal vision</div>
            <div
              className="p-3 rounded-lg border border-gray-200 dark:border-[#2a2a2a]"
              style={{
                backgroundColor: background,
                color: foreground
              }}
            >
              <div className="text-sm font-semibold">Sample text</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

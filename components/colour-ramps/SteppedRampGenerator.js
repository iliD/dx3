'use client';

import { useState } from 'react';

export default function SteppedRampGenerator({ onGenerateRamp }) {
  const [config, setConfig] = useState({
    startColor: '#0000ff',
    midColor: '#00ff00',
    endColor: '#ff0000',
    steps: 10,
    useMidpoint: true,
    midPosition: 50 // percentage 0-100
  });

  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  };

  const rgbToHex = (r, g, b) => {
    return '#' + [r, g, b].map(x => {
      const hex = Math.round(x).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');
  };

  const interpolateColor = (color1, color2, factor) => {
    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);

    const r = rgb1.r + (rgb2.r - rgb1.r) * factor;
    const g = rgb1.g + (rgb2.g - rgb1.g) * factor;
    const b = rgb1.b + (rgb2.b - rgb1.b) * factor;

    return { r, g, b };
  };

  const generateSteppedColors = () => {
    const colors = [];
    const { startColor, midColor, endColor, steps, useMidpoint, midPosition } = config;

    for (let i = 0; i < steps; i++) {
      const position = i / (steps - 1); // 0 to 1
      let color;

      if (useMidpoint) {
        const midPoint = midPosition / 100;

        if (position <= midPoint) {
          // Interpolate between start and mid
          const factor = midPoint === 0 ? 0 : position / midPoint;
          color = interpolateColor(startColor, midColor, factor);
        } else {
          // Interpolate between mid and end
          const factor = midPoint === 1 ? 0 : (position - midPoint) / (1 - midPoint);
          color = interpolateColor(midColor, endColor, factor);
        }
      } else {
        // Simple interpolation between start and end
        color = interpolateColor(startColor, endColor, position);
      }

      colors.push({
        hex: rgbToHex(color.r, color.g, color.b),
        position: Math.round(position * 100)
      });
    }

    return colors;
  };

  const colors = generateSteppedColors();

  const handleGenerate = () => {
    const generatedColors = generateSteppedColors();

    // Create ramp stops from the generated colors
    const stops = generatedColors.map((color, index) => ({
      value: index,
      color: color.hex,
      alpha: 1
    }));

    onGenerateRamp({
      name: `${config.steps}-Step Ramp`,
      stops: stops,
      range: {
        min: 0,
        max: config.steps - 1,
        decimals: 0
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Color Inputs */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <label className="w-24 text-sm text-gray-700 dark:text-gray-300">Start</label>
          <input
            type="color"
            value={config.startColor}
            onChange={(e) => setConfig({ ...config, startColor: e.target.value })}
            className="w-16 h-10 rounded border border-gray-200 dark:border-[#2a2a2a] cursor-pointer"
          />
          <input
            type="text"
            value={config.startColor}
            onChange={(e) => setConfig({ ...config, startColor: e.target.value })}
            className="flex-1 px-3 py-2 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded-md text-gray-900 dark:text-gray-100 font-mono text-sm"
          />
        </div>

        {config.useMidpoint && (
          <>
            <div className="flex items-center gap-3">
              <label className="w-24 text-sm text-gray-700 dark:text-gray-300">Mid</label>
              <input
                type="color"
                value={config.midColor}
                onChange={(e) => setConfig({ ...config, midColor: e.target.value })}
                className="w-16 h-10 rounded border border-gray-200 dark:border-[#2a2a2a] cursor-pointer"
              />
              <input
                type="text"
                value={config.midColor}
                onChange={(e) => setConfig({ ...config, midColor: e.target.value })}
                className="flex-1 px-3 py-2 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded-md text-gray-900 dark:text-gray-100 font-mono text-sm"
              />
            </div>

            <div className="flex items-center gap-3">
              <label className="w-24 text-sm text-gray-700 dark:text-gray-300">Mid position</label>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={config.midPosition}
                onChange={(e) => setConfig({ ...config, midPosition: parseInt(e.target.value) })}
                className="flex-1 h-2 bg-gray-200 dark:bg-[#2a2a2a] rounded-lg appearance-none cursor-pointer accent-gray-900 dark:accent-gray-100"
              />
              <span className="w-16 text-sm font-mono text-gray-900 dark:text-gray-100 text-right">
                {config.midPosition}%
              </span>
            </div>
          </>
        )}

        <div className="flex items-center gap-3">
          <label className="w-24 text-sm text-gray-700 dark:text-gray-300">End</label>
          <input
            type="color"
            value={config.endColor}
            onChange={(e) => setConfig({ ...config, endColor: e.target.value })}
            className="w-16 h-10 rounded border border-gray-200 dark:border-[#2a2a2a] cursor-pointer"
          />
          <input
            type="text"
            value={config.endColor}
            onChange={(e) => setConfig({ ...config, endColor: e.target.value })}
            className="flex-1 px-3 py-2 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded-md text-gray-900 dark:text-gray-100 font-mono text-sm"
          />
        </div>
      </div>

      {/* Steps Control */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <label className="w-24 text-sm text-gray-700 dark:text-gray-300">Steps</label>
          <input
            type="range"
            min="3"
            max="50"
            step="1"
            value={config.steps}
            onChange={(e) => setConfig({ ...config, steps: parseInt(e.target.value) })}
            className="flex-1 h-2 bg-gray-200 dark:bg-[#2a2a2a] rounded-lg appearance-none cursor-pointer accent-gray-900 dark:accent-gray-100"
          />
          <input
            type="number"
            min="3"
            max="50"
            value={config.steps}
            onChange={(e) => setConfig({ ...config, steps: parseInt(e.target.value) || 3 })}
            className="w-20 px-3 py-2 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded-md text-gray-900 dark:text-gray-100 font-mono text-sm"
          />
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={config.useMidpoint}
              onChange={(e) => setConfig({ ...config, useMidpoint: e.target.checked })}
              className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-gray-600"
            />
            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Use midpoint color</span>
          </label>
        </div>
      </div>

      {/* Preview */}
      <div>
        <label className="block text-sm font-semibold mb-3 text-gray-900 dark:text-gray-100">
          Preview ({colors.length} steps)
        </label>
        <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${Math.min(colors.length, 20)}, 1fr)` }}>
          {colors.slice(0, 20).map((color, index) => (
            <div key={index} className="space-y-1">
              <div
                className="aspect-square rounded border border-gray-200 dark:border-[#2a2a2a]"
                style={{ backgroundColor: color.hex }}
                title={`${color.hex} (${color.position}%)`}
              />
              {colors.length <= 10 && (
                <div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">
                  {index}
                </div>
              )}
            </div>
          ))}
        </div>
        {colors.length > 20 && (
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
            Showing first 20 of {colors.length} steps
          </p>
        )}
      </div>

      {/* Horizontal Legend View */}
      <div>
        <label className="block text-sm font-semibold mb-3 text-gray-900 dark:text-gray-100">
          Horizontal legend
        </label>
        <div className="space-y-2">
          {colors.map((color, index) => (
            <div key={index} className="flex items-center gap-3">
              <div
                className="w-16 h-6 rounded border border-gray-200 dark:border-[#2a2a2a]"
                style={{ backgroundColor: color.hex }}
              />
              <span className="text-sm font-mono text-gray-700 dark:text-gray-300">
                {color.hex}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-500">
                Step {index + 1}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        className="w-full px-4 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-black rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors font-medium"
      >
        Generate ramp from these steps
      </button>

      <p className="text-xs text-gray-500 dark:text-gray-500">
        This will replace the current color stops with the stepped colors shown above.
      </p>
    </div>
  );
}

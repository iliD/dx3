'use client';

import { converter, formatHex, interpolate, samples } from 'culori';

export default function ShadesTints({ color, onChange, onAddToPalette }) {
  const toOklch = converter('oklch');
  const toLab = converter('lab');
  const toLch = converter('lch');
  const toRgb = converter('rgb');
  const toHsl = converter('hsl');

  // Generate shades (darker) and tints (lighter)
  const generateScale = (steps = 9) => {
    const baseOklch = toOklch(color.hex);
    if (!baseOklch) return [];

    const colors = [];

    // Generate from darkest to lightest
    for (let i = 0; i < steps; i++) {
      const lightness = (i / (steps - 1)) * 0.95 + 0.05; // 0.05 to 1.0
      const adjustedChroma = baseOklch.c * Math.min(lightness * 1.5, 1); // Adjust chroma based on lightness

      const scaleColor = {
        mode: 'oklch',
        l: lightness,
        c: adjustedChroma,
        h: baseOklch.h
      };

      const hex = formatHex(scaleColor);
      colors.push({
        hex,
        lightness: Math.round(lightness * 100),
        oklch: scaleColor
      });
    }

    return colors;
  };

  // Generate saturation scale
  const generateSaturationScale = (steps = 9) => {
    const baseOklch = toOklch(color.hex);
    if (!baseOklch) return [];

    const colors = [];

    for (let i = 0; i < steps; i++) {
      const chroma = (i / (steps - 1)) * 0.37; // 0 to 0.37

      const scaleColor = {
        mode: 'oklch',
        l: baseOklch.l,
        c: chroma,
        h: baseOklch.h
      };

      const hex = formatHex(scaleColor);
      colors.push({
        hex,
        chroma: Math.round((chroma / 0.37) * 100),
        oklch: scaleColor
      });
    }

    return colors;
  };

  const lightnessScale = generateScale(9);
  const saturationScale = generateSaturationScale(9);

  const handleColorClick = (scaleColor) => {
    onChange({
      hex: scaleColor.hex,
      rgb: toRgb(scaleColor.hex),
      hsl: toHsl(scaleColor.hex),
      oklch: scaleColor.oklch,
      lab: toLab(scaleColor.hex),
      lch: toLch(scaleColor.hex)
    });
  };

  const addScaleToPalette = (scale) => {
    const colors = scale.map(c => c.hex);
    onAddToPalette(colors);
  };

  return (
    <div className="space-y-6">
      {/* Lightness Scale */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            Lightness scale
          </h3>
          <button
            onClick={() => addScaleToPalette(lightnessScale)}
            className="px-3 py-1 text-xs bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded-md hover:bg-gray-50 dark:hover:bg-[#2a2a2a] transition-colors"
          >
            Add to palette
          </button>
        </div>

        <div className="grid grid-cols-9 gap-1">
          {lightnessScale.map((scaleColor, index) => (
            <div key={index} className="space-y-1">
              <div
                className="aspect-square rounded cursor-pointer hover:scale-105 transition-transform border border-gray-200 dark:border-[#2a2a2a]"
                style={{ backgroundColor: scaleColor.hex }}
                onClick={() => handleColorClick(scaleColor)}
                title={`${scaleColor.lightness}% lightness - ${scaleColor.hex}`}
              />
              <div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">
                {scaleColor.lightness}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-2 text-xs text-gray-500 dark:text-gray-500">
          Lightness from 5% (darkest) to 100% (lightest)
        </div>
      </div>

      {/* Saturation Scale */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            Saturation scale
          </h3>
          <button
            onClick={() => addScaleToPalette(saturationScale)}
            className="px-3 py-1 text-xs bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded-md hover:bg-gray-50 dark:hover:bg-[#2a2a2a] transition-colors"
          >
            Add to palette
          </button>
        </div>

        <div className="grid grid-cols-9 gap-1">
          {saturationScale.map((scaleColor, index) => (
            <div key={index} className="space-y-1">
              <div
                className="aspect-square rounded cursor-pointer hover:scale-105 transition-transform border border-gray-200 dark:border-[#2a2a2a]"
                style={{ backgroundColor: scaleColor.hex }}
                onClick={() => handleColorClick(scaleColor)}
                title={`${scaleColor.chroma}% saturation - ${scaleColor.hex}`}
              />
              <div className="text-xs text-center text-gray-500 dark:text-gray-500 font-mono">
                {scaleColor.chroma}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-2 text-xs text-gray-500 dark:text-gray-500">
          Saturation from 0% (gray) to 100% (full saturation)
        </div>
      </div>

      {/* Brightness/Darkness Adjustment Sliders */}
      <div>
        <h3 className="text-sm font-semibold mb-3 text-gray-900 dark:text-gray-100">
          Quick adjustments
        </h3>

        <div className="space-y-4">
          {/* Lightness Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs text-gray-600 dark:text-gray-400">Lightness</label>
              <span className="text-xs font-mono text-gray-900 dark:text-gray-100">
                {Math.round((color.oklch?.l || 0) * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={Math.round((color.oklch?.l || 0) * 100)}
              onChange={(e) => {
                const newLightness = parseFloat(e.target.value) / 100;
                const newColor = {
                  mode: 'oklch',
                  l: newLightness,
                  c: color.oklch?.c || 0.15,
                  h: color.oklch?.h || 0
                };
                const hex = formatHex(newColor);
                onChange({
                  hex,
                  rgb: toRgb(hex),
                  hsl: toHsl(hex),
                  oklch: newColor,
                  lab: toLab(hex),
                  lch: toLch(hex)
                });
              }}
              className="w-full h-2 bg-gray-200 dark:bg-[#2a2a2a] rounded-lg appearance-none cursor-pointer accent-gray-900 dark:accent-gray-100"
            />
            <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-500">
              <span>Dark</span>
              <span>Light</span>
            </div>
          </div>

          {/* Saturation Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs text-gray-600 dark:text-gray-400">Saturation</label>
              <span className="text-xs font-mono text-gray-900 dark:text-gray-100">
                {Math.round(((color.oklch?.c || 0) / 0.37) * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={Math.round(((color.oklch?.c || 0) / 0.37) * 100)}
              onChange={(e) => {
                const newChroma = (parseFloat(e.target.value) / 100) * 0.37;
                const newColor = {
                  mode: 'oklch',
                  l: color.oklch?.l || 0.65,
                  c: newChroma,
                  h: color.oklch?.h || 0
                };
                const hex = formatHex(newColor);
                onChange({
                  hex,
                  rgb: toRgb(hex),
                  hsl: toHsl(hex),
                  oklch: newColor,
                  lab: toLab(hex),
                  lch: toLch(hex)
                });
              }}
              className="w-full h-2 bg-gray-200 dark:bg-[#2a2a2a] rounded-lg appearance-none cursor-pointer accent-gray-900 dark:accent-gray-100"
            />
            <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-500">
              <span>Gray</span>
              <span>Vibrant</span>
            </div>
          </div>

          {/* Hue Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs text-gray-600 dark:text-gray-400">Hue</label>
              <span className="text-xs font-mono text-gray-900 dark:text-gray-100">
                {Math.round(color.oklch?.h || 0)}°
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="360"
              step="1"
              value={Math.round(color.oklch?.h || 0)}
              onChange={(e) => {
                const newHue = parseFloat(e.target.value);
                const newColor = {
                  mode: 'oklch',
                  l: color.oklch?.l || 0.65,
                  c: color.oklch?.c || 0.15,
                  h: newHue
                };
                const hex = formatHex(newColor);
                onChange({
                  hex,
                  rgb: toRgb(hex),
                  hsl: toHsl(hex),
                  oklch: newColor,
                  lab: toLab(hex),
                  lch: toLch(hex)
                });
              }}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer"
              style={{
                background: 'linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)'
              }}
            />
            <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-500">
              <span>0°</span>
              <span>360°</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

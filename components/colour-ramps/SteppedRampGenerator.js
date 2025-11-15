'use client';

import { useState } from 'react';

export default function SteppedRampGenerator({ onGenerateRamp }) {
  const [colorStops, setColorStops] = useState([
    { id: 1, color: '#0000ff', position: 0, locked: false },
    { id: 2, color: '#00ff00', position: 50, locked: false },
    { id: 3, color: '#ff0000', position: 100, locked: false }
  ]);
  const [steps, setSteps] = useState(10);
  const [colorSpace, setColorSpace] = useState('rgb');
  const [colorModel, setColorModel] = useState('hex');
  const [rampName, setRampName] = useState('');
  const [nextId, setNextId] = useState(4);

  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  };

  const formatColorValue = (hex) => {
    const rgb = hexToRgb(hex);

    switch (colorModel) {
      case 'rgb':
        return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
      case 'hsl':
        const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
        return `hsl(${Math.round(hsl.h)}°, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%)`;
      case 'oklch':
        const oklch = rgbToOklch(rgb.r, rgb.g, rgb.b);
        return `oklch(${oklch.l.toFixed(2)}, ${oklch.c.toFixed(2)}, ${Math.round(oklch.h)}°)`;
      case 'hex':
      default:
        return hex;
    }
  };

  const rgbToHex = (r, g, b) => {
    return '#' + [r, g, b].map(x => {
      const hex = Math.round(x).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');
  };

  const rgbToHsl = (r, g, b) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }
    return { h: h * 360, s: s * 100, l: l * 100 };
  };

  const hslToRgb = (h, s, l) => {
    h /= 360; s /= 100; l /= 100;
    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }
    return { r: r * 255, g: g * 255, b: b * 255 };
  };

  const rgbToHsv = (r, g, b) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    const d = max - min;
    let h, s = max === 0 ? 0 : d / max;
    const v = max;

    if (max === min) {
      h = 0;
    } else {
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }
    return { h: h * 360, s: s * 100, v: v * 100 };
  };

  const hsvToRgb = (h, s, v) => {
    h /= 360; s /= 100; v /= 100;
    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);
    let r, g, b;

    switch (i % 6) {
      case 0: r = v; g = t; b = p; break;
      case 1: r = q; g = v; b = p; break;
      case 2: r = p; g = v; b = t; break;
      case 3: r = p; g = q; b = v; break;
      case 4: r = t; g = p; b = v; break;
      case 5: r = v; g = p; b = q; break;
    }
    return { r: r * 255, g: g * 255, b: b * 255 };
  };

  const rgbToOklch = (r, g, b) => {
    // Simplified OKLCH conversion (would use culori in production)
    const hsl = rgbToHsl(r, g, b);
    return { l: hsl.l / 100, c: hsl.s / 100, h: hsl.h };
  };

  const oklchToRgb = (l, c, h) => {
    // Simplified OKLCH to RGB (would use culori in production)
    return hslToRgb(h, c * 100, l * 100);
  };

  const interpolateInColorSpace = (stop1, stop2, factor, space) => {
    const rgb1 = hexToRgb(stop1.color);
    const rgb2 = hexToRgb(stop2.color);

    let result;
    switch (space) {
      case 'hsl':
        const hsl1 = rgbToHsl(rgb1.r, rgb1.g, rgb1.b);
        const hsl2 = rgbToHsl(rgb2.r, rgb2.g, rgb2.b);
        const h = hsl1.h + (hsl2.h - hsl1.h) * factor;
        const s = hsl1.s + (hsl2.s - hsl1.s) * factor;
        const l = hsl1.l + (hsl2.l - hsl1.l) * factor;
        result = hslToRgb(h, s, l);
        break;

      case 'hsv':
      case 'hsb':
        const hsv1 = rgbToHsv(rgb1.r, rgb1.g, rgb1.b);
        const hsv2 = rgbToHsv(rgb2.r, rgb2.g, rgb2.b);
        const hv = hsv1.h + (hsv2.h - hsv1.h) * factor;
        const sv = hsv1.s + (hsv2.s - hsv1.s) * factor;
        const v = hsv1.v + (hsv2.v - hsv1.v) * factor;
        result = hsvToRgb(hv, sv, v);
        break;

      case 'oklch':
        const oklch1 = rgbToOklch(rgb1.r, rgb1.g, rgb1.b);
        const oklch2 = rgbToOklch(rgb2.r, rgb2.g, rgb2.b);
        const ol = oklch1.l + (oklch2.l - oklch1.l) * factor;
        const oc = oklch1.c + (oklch2.c - oklch1.c) * factor;
        const oh = oklch1.h + (oklch2.h - oklch1.h) * factor;
        result = oklchToRgb(ol, oc, oh);
        break;

      case 'rgb':
      default:
        result = {
          r: rgb1.r + (rgb2.r - rgb1.r) * factor,
          g: rgb1.g + (rgb2.g - rgb1.g) * factor,
          b: rgb1.b + (rgb2.b - rgb1.b) * factor
        };
    }
    return result;
  };

  const generateSteppedColors = () => {
    const colors = [];
    const sortedStops = [...colorStops].sort((a, b) => a.position - b.position);

    for (let i = 0; i < steps; i++) {
      const position = (i / (steps - 1)) * 100; // 0 to 100

      // Find the two stops that bracket this position
      let stop1 = sortedStops[0];
      let stop2 = sortedStops[sortedStops.length - 1];

      for (let j = 0; j < sortedStops.length - 1; j++) {
        if (position >= sortedStops[j].position && position <= sortedStops[j + 1].position) {
          stop1 = sortedStops[j];
          stop2 = sortedStops[j + 1];
          break;
        }
      }

      const range = stop2.position - stop1.position;
      const factor = range === 0 ? 0 : (position - stop1.position) / range;

      const color = interpolateInColorSpace(stop1, stop2, factor, colorSpace);

      colors.push({
        hex: rgbToHex(color.r, color.g, color.b),
        position: Math.round(position)
      });
    }

    return colors;
  };

  const colors = generateSteppedColors();

  const addColorStop = () => {
    const newPosition = colorStops.length > 0
      ? Math.min(100, Math.max(...colorStops.map(s => s.position)) + 10)
      : 50;

    setColorStops([...colorStops, {
      id: nextId,
      color: '#808080',
      position: newPosition,
      locked: false
    }]);
    setNextId(nextId + 1);
  };

  const updateColorStop = (id, updates) => {
    setColorStops(colorStops.map(stop =>
      stop.id === id ? { ...stop, ...updates } : stop
    ));
  };

  const removeColorStop = (id) => {
    if (colorStops.length > 2) {
      setColorStops(colorStops.filter(stop => stop.id !== id));
    }
  };

  const toggleLock = (id) => {
    setColorStops(colorStops.map(stop =>
      stop.id === id ? { ...stop, locked: !stop.locked } : stop
    ));
  };

  const handleGenerate = () => {
    const generatedColors = generateSteppedColors();

    // Create ramp stops from the generated colors
    const stops = generatedColors.map((color, index) => ({
      value: index,
      color: color.hex,
      alpha: 1
    }));

    onGenerateRamp({
      name: `${steps}-Step Ramp`,
      stops: stops,
      range: {
        min: 0,
        max: steps - 1,
        decimals: 0
      }
    });
  };

  const sortedStops = [...colorStops].sort((a, b) => a.position - b.position);

  return (
    <div className="space-y-4">
      {/* Ramp Preferences */}
      <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-[#0a0a0a] rounded-md">
        {/* Name Input */}
        <div className="flex-1">
          <input
            type="text"
            value={rampName}
            onChange={(e) => setRampName(e.target.value)}
            placeholder="Ramp name"
            className="w-full px-3 py-1.5 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded text-gray-900 dark:text-gray-100 text-sm"
            style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}
          />
        </div>

        {/* Color Model Selector */}
        <select
          value={colorModel}
          onChange={(e) => setColorModel(e.target.value)}
          className="px-3 py-1.5 text-sm bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded-md text-gray-900 dark:text-gray-100"
          style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}
        >
          <option value="hex">HEX</option>
          <option value="rgb">RGB</option>
          <option value="hsl">HSL</option>
          <option value="oklch">OKLCH</option>
        </select>

        {/* Steps Input */}
        <input
          type="number"
          min="3"
          max="50"
          value={steps}
          onChange={(e) => setSteps(parseInt(e.target.value) || 3)}
          className="w-16 px-3 py-1.5 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded text-gray-900 dark:text-gray-100 font-mono text-sm text-center"
        />

        {/* Steps Slider */}
        <div className="flex-1 flex items-center gap-3">
          <input
            type="range"
            min="3"
            max="50"
            step="1"
            value={steps}
            onChange={(e) => setSteps(parseInt(e.target.value))}
            className="flex-1 h-1 bg-gray-300 dark:bg-[#3a3a3a] rounded-full appearance-none cursor-pointer accent-gray-900 dark:accent-gray-100"
          />
        </div>
      </div>

      {/* Color Stops */}
      <div className="space-y-2">
        {sortedStops.map((stop) => (
          <div
            key={stop.id}
            className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-[#0a0a0a] rounded-md"
          >
            {/* Color Picker */}
            <input
              type="color"
              value={stop.color}
              onChange={(e) => updateColorStop(stop.id, { color: e.target.value })}
              className="w-10 h-10 rounded cursor-pointer border-0"
              disabled={stop.locked}
            />

            {/* Color Value Input */}
            <input
              type="text"
              value={formatColorValue(stop.color)}
              onChange={(e) => updateColorStop(stop.id, { color: e.target.value })}
              className="flex-1 px-2 py-1 bg-transparent text-gray-900 dark:text-gray-100 font-mono text-sm outline-none"
              disabled={stop.locked}
            />

            {/* Position Display */}
            <span className="text-xs text-gray-500 dark:text-gray-500 font-mono w-10 text-right">
              {stop.position}%
            </span>

            {/* Lock Button */}
            <button
              onClick={() => toggleLock(stop.id)}
              className={`p-1.5 rounded transition-colors ${
                stop.locked
                  ? 'text-gray-900 dark:text-gray-100 bg-gray-200 dark:bg-[#2a2a2a]'
                  : 'text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
              title={stop.locked ? 'Unlock color' : 'Lock color'}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {stop.locked ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                )}
              </svg>
            </button>

            {/* Add/Delete Buttons - Always show both */}
            <button
              onClick={addColorStop}
              className="p-1.5 text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 rounded transition-colors"
              title="Add color stop"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>

            {colorStops.length > 2 ? (
              <button
                onClick={() => removeColorStop(stop.id)}
                className="p-1.5 text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 rounded transition-colors"
                title="Remove stop"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
            ) : (
              <div className="w-8" />
            )}
          </div>
        ))}
      </div>

      {/* Preview - Discrete steps */}
      <div className="pt-1">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-900 dark:text-gray-100" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
            Preview
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-500 font-mono">
            {colors.length} steps
          </span>
        </div>
        <div className="flex h-12 rounded-md overflow-hidden border border-gray-200 dark:border-[#2a2a2a]">
          {colors.map((color, index) => (
            <div
              key={index}
              className="flex-1 relative group"
              style={{ backgroundColor: color.hex }}
              title={`Step ${index + 1}: ${color.hex}`}
            >
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                <span className="text-xs font-mono text-white font-medium">
                  {index + 1}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        className="w-full px-4 py-2.5 bg-gray-900 dark:bg-gray-100 text-white dark:text-black rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors font-medium text-sm"
      >
        Generate ramp
      </button>
    </div>
  );
}

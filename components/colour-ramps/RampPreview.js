'use client';

import { useRef, useEffect } from 'react';

export default function RampPreview({ ramp }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    drawRamp();
  }, [ramp]);

  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  };

  const interpolateColor = (color1, color2, factor) => {
    const rgb1 = hexToRgb(color1.color);
    const rgb2 = hexToRgb(color2.color);

    const r = Math.round(rgb1.r + (rgb2.r - rgb1.r) * factor);
    const g = Math.round(rgb1.g + (rgb2.g - rgb1.g) * factor);
    const b = Math.round(rgb1.b + (rgb2.b - rgb1.b) * factor);
    const alpha = color1.alpha + (color2.alpha - color1.alpha) * factor;

    return { r, g, b, alpha };
  };

  const getColorAtValue = (value) => {
    const sortedStops = [...ramp.stops].sort((a, b) => a.value - b.value);

    // Find the two stops that bracket this value
    for (let i = 0; i < sortedStops.length - 1; i++) {
      const stop1 = sortedStops[i];
      const stop2 = sortedStops[i + 1];

      if (value >= stop1.value && value <= stop2.value) {
        const range = stop2.value - stop1.value;
        const factor = range === 0 ? 0 : (value - stop1.value) / range;
        return interpolateColor(stop1, stop2, factor);
      }
    }

    // If value is outside range, use first or last color
    if (value < sortedStops[0].value) {
      const rgb = hexToRgb(sortedStops[0].color);
      return { ...rgb, alpha: sortedStops[0].alpha };
    }
    const lastStop = sortedStops[sortedStops.length - 1];
    const rgb = hexToRgb(lastStop.color);
    return { ...rgb, alpha: lastStop.alpha };
  };

  const drawRamp = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw gradient
    const steps = width;
    const valueRange = ramp.range.max - ramp.range.min;

    for (let x = 0; x < steps; x++) {
      const value = ramp.range.min + (x / steps) * valueRange;
      const color = getColorAtValue(value);

      ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.alpha})`;
      ctx.fillRect(x, 0, 1, height);
    }
  };

  const sortedStops = [...ramp.stops].sort((a, b) => a.value - b.value);

  return (
    <div className="space-y-4">
      {/* Discrete Steps Preview */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Color steps</h3>
          <span className="text-xs text-gray-500 dark:text-gray-500 font-mono">
            {sortedStops.length} steps
          </span>
        </div>
        <div className="flex h-16 rounded-md overflow-hidden border border-gray-200 dark:border-[#2a2a2a]">
          {sortedStops.map((stop, index) => (
            <div
              key={index}
              className="flex-1 relative group"
              style={{ backgroundColor: stop.color, opacity: stop.alpha }}
              title={`Step ${index + 1}: ${stop.color}`}
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

      {/* Smooth Gradient Preview */}
      <div>
        <h3 className="text-sm font-medium mb-2 text-gray-900 dark:text-gray-100">Interpolated gradient</h3>
        <canvas
          ref={canvasRef}
          width={800}
          height={48}
          className="w-full h-12 rounded-md border border-gray-200 dark:border-[#2a2a2a]"
          style={{
            imageRendering: 'auto'
          }}
        />
      </div>
    </div>
  );
}

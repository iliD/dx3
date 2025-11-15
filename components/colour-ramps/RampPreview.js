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

  const generateLegendItems = (count = 10) => {
    const items = [];
    const sortedStops = [...ramp.stops].sort((a, b) => a.value - b.value);

    for (let i = 0; i < count; i++) {
      const factor = i / (count - 1);
      const value = ramp.range.min + (ramp.range.max - ramp.range.min) * factor;
      const color = getColorAtValue(value);

      items.push({
        value: value.toFixed(ramp.range.decimals),
        color: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.alpha})`
      });
    }

    return items;
  };

  const legendItems = generateLegendItems();

  return (
    <div className="space-y-6">
      {/* Gradient Canvas */}
      <div>
        <h3 className="text-sm font-semibold mb-3 text-gray-900 dark:text-gray-100">Gradient</h3>
        <canvas
          ref={canvasRef}
          width={800}
          height={60}
          className="w-full h-16 rounded-lg border border-gray-200 dark:border-[#2a2a2a]"
          style={{
            imageRendering: 'pixelated',
            background: 'repeating-conic-gradient(#ddd 0% 25%, transparent 0% 50%) 50% / 20px 20px'
          }}
        />
      </div>

      {/* Color Stops Visualization */}
      <div>
        <h3 className="text-sm font-semibold mb-3 text-gray-900 dark:text-gray-100">Color stops</h3>
        <div className="relative h-12 bg-gray-100 dark:bg-[#0a0a0a] rounded-lg border border-gray-200 dark:border-[#2a2a2a]">
          {[...ramp.stops].sort((a, b) => a.value - b.value).map((stop, index) => {
            const position = ((stop.value - ramp.range.min) / (ramp.range.max - ramp.range.min)) * 100;
            return (
              <div
                key={index}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center"
                style={{ left: `${position}%` }}
              >
                <div
                  className="w-6 h-6 rounded-full border-2 border-white shadow-lg"
                  style={{ backgroundColor: stop.color, opacity: stop.alpha }}
                />
                <div className="text-xs font-mono text-gray-600 dark:text-gray-400 mt-1">
                  {stop.value.toFixed(ramp.range.decimals)}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div>
        <h3 className="text-sm font-semibold mb-3 text-gray-900 dark:text-gray-100">Legend</h3>
        <div className="space-y-1">
          {legendItems.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <div
                className="w-12 h-6 rounded border border-gray-200 dark:border-[#2a2a2a]"
                style={{
                  backgroundColor: item.color,
                  backgroundImage: 'repeating-conic-gradient(#ddd 0% 25%, transparent 0% 50%) 50% / 10px 10px'
                }}
              />
              <span className="text-sm font-mono text-gray-700 dark:text-gray-300">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-3 bg-gray-50 dark:bg-[#0a0a0a] rounded-lg">
          <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Stops</div>
          <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
            {ramp.stops.length}
          </div>
        </div>
        <div className="p-3 bg-gray-50 dark:bg-[#0a0a0a] rounded-lg">
          <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Min value</div>
          <div className="text-lg font-bold font-mono text-gray-900 dark:text-gray-100">
            {ramp.range.min}
          </div>
        </div>
        <div className="p-3 bg-gray-50 dark:bg-[#0a0a0a] rounded-lg">
          <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Max value</div>
          <div className="text-lg font-bold font-mono text-gray-900 dark:text-gray-100">
            {ramp.range.max}
          </div>
        </div>
      </div>
    </div>
  );
}

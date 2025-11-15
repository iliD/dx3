'use client';

import { useRef, useEffect, useState } from 'react';
import { converter, formatHex } from 'culori';

export default function ColorWheel({ color, onChange, harmony, onHarmonyChange }) {
  const canvasRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedHue, setSelectedHue] = useState(color.oklch?.h || 0);

  const toOklch = converter('oklch');
  const toLab = converter('lab');
  const toLch = converter('lch');
  const toRgb = converter('rgb');
  const toHsl = converter('hsl');

  const harmonies = [
    { id: 'none', name: 'None', angles: [0] },
    { id: 'complementary', name: 'Complementary', angles: [0, 180] },
    { id: 'analogous', name: 'Analogous', angles: [-30, 0, 30] },
    { id: 'triadic', name: 'Triadic', angles: [0, 120, 240] },
    { id: 'split-complementary', name: 'Split Complementary', angles: [0, 150, 210] },
    { id: 'tetradic', name: 'Tetradic (Square)', angles: [0, 90, 180, 270] },
    { id: 'square', name: 'Square', angles: [0, 90, 180, 270] },
    { id: 'compound', name: 'Compound', angles: [0, 30, 180, 210] },
  ];

  useEffect(() => {
    drawColorWheel();
  }, [selectedHue, harmony]);

  useEffect(() => {
    setSelectedHue(color.oklch?.h || 0);
  }, [color]);

  const drawColorWheel = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - 10;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw color wheel
    for (let angle = 0; angle < 360; angle++) {
      for (let r = 0; r < radius; r++) {
        const saturation = r / radius;
        const oklchColor = { mode: 'oklch', l: 0.65, c: saturation * 0.37, h: angle };
        const rgbColor = toRgb(oklchColor);

        if (rgbColor) {
          const red = Math.round((rgbColor.r || 0) * 255);
          const green = Math.round((rgbColor.g || 0) * 255);
          const blue = Math.round((rgbColor.b || 0) * 255);

          ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
          const x = centerX + r * Math.cos((angle * Math.PI) / 180);
          const y = centerY + r * Math.sin((angle * Math.PI) / 180);
          ctx.fillRect(x, y, 2, 2);
        }
      }
    }

    // Draw harmony indicators
    const currentHarmony = harmonies.find(h => h.id === harmony) || harmonies[0];
    currentHarmony.angles.forEach((angleOffset, index) => {
      const angle = (selectedHue + angleOffset) % 360;
      const x = centerX + (radius - 5) * Math.cos((angle * Math.PI) / 180);
      const y = centerY + (radius - 5) * Math.sin((angle * Math.PI) / 180);

      // Draw indicator circle
      ctx.beginPath();
      ctx.arc(x, y, index === 0 ? 8 : 6, 0, 2 * Math.PI);
      ctx.fillStyle = index === 0 ? '#fff' : 'rgba(255, 255, 255, 0.8)';
      ctx.fill();
      ctx.strokeStyle = index === 0 ? '#000' : 'rgba(0, 0, 0, 0.5)';
      ctx.lineWidth = 2;
      ctx.stroke();
    });

    // Draw harmony lines
    if (currentHarmony.angles.length > 1) {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 5]);

      currentHarmony.angles.forEach((angleOffset) => {
        const angle = (selectedHue + angleOffset) % 360;
        const x = centerX + radius * Math.cos((angle * Math.PI) / 180);
        const y = centerY + radius * Math.sin((angle * Math.PI) / 180);

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x, y);
        ctx.stroke();
      });

      ctx.setLineDash([]);
    }
  };

  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    updateColorFromWheel(x, y);
  };

  const handleCanvasMouseMove = (e) => {
    if (!isDragging) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    updateColorFromWheel(x, y);
  };

  const updateColorFromWheel = (x, y) => {
    const canvas = canvasRef.current;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(canvas.width, canvas.height) / 2 - 10;

    const dx = x - centerX;
    const dy = y - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > radius) return;

    const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
    const normalizedAngle = angle < 0 ? angle + 360 : angle;
    const saturation = Math.min(distance / radius, 1);

    setSelectedHue(normalizedAngle);

    const newColor = { mode: 'oklch', l: color.oklch?.l || 0.65, c: saturation * 0.37, h: normalizedAngle };
    const hex = formatHex(newColor);
    const rgb = toRgb(newColor);
    const hsl = toHsl(newColor);
    const oklch = toOklch(newColor);
    const lab = toLab(newColor);
    const lch = toLch(newColor);

    onChange({
      hex,
      rgb,
      hsl,
      oklch,
      lab,
      lch
    });
  };

  const generateHarmonyColors = () => {
    const currentHarmony = harmonies.find(h => h.id === harmony) || harmonies[0];

    return currentHarmony.angles.map((angleOffset) => {
      const angle = (selectedHue + angleOffset) % 360;
      const harmonyColor = {
        mode: 'oklch',
        l: color.oklch?.l || 0.65,
        c: color.oklch?.c || 0.15,
        h: angle
      };
      return formatHex(harmonyColor);
    });
  };

  return (
    <div className="space-y-4">
      {/* Color Wheel */}
      <div className="flex justify-center">
        <canvas
          ref={canvasRef}
          width={300}
          height={300}
          className="rounded-full cursor-crosshair border border-gray-200 dark:border-[#2a2a2a]"
          onClick={handleCanvasClick}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onMouseMove={handleCanvasMouseMove}
        />
      </div>

      {/* Harmony Selector */}
      <div>
        <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-gray-100">
          Color harmony
        </label>
        <select
          value={harmony}
          onChange={(e) => onHarmonyChange(e.target.value)}
          className="w-full px-3 py-2 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded-md text-gray-900 dark:text-gray-100 text-sm"
        >
          {harmonies.map((h) => (
            <option key={h.id} value={h.id}>
              {h.name} {h.angles.length > 1 ? `(${h.angles.length} colors)` : ''}
            </option>
          ))}
        </select>
      </div>

      {/* Harmony Colors Preview */}
      {harmony !== 'none' && (
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-gray-100">
            Harmony colors
          </label>
          <div className="grid grid-cols-4 gap-2">
            {generateHarmonyColors().map((hexColor, index) => (
              <div
                key={index}
                className="aspect-square rounded-lg border border-gray-200 dark:border-[#2a2a2a] cursor-pointer hover:scale-105 transition-transform"
                style={{ backgroundColor: hexColor }}
                onClick={() => {
                  const newColor = toOklch(hexColor);
                  onChange({
                    hex: hexColor,
                    rgb: toRgb(hexColor),
                    hsl: toHsl(hexColor),
                    oklch: newColor,
                    lab: toLab(hexColor),
                    lch: toLch(hexColor)
                  });
                }}
                title={hexColor}
              />
            ))}
          </div>
        </div>
      )}

      {/* Add to Palette Button */}
      {harmony !== 'none' && (
        <button
          onClick={() => {
            const colors = generateHarmonyColors();
            // Emit event to add all harmony colors to palette
            window.dispatchEvent(new CustomEvent('addHarmonyToPalette', { detail: colors }));
          }}
          className="w-full px-4 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-black rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors text-sm font-medium"
        >
          Add harmony to palette
        </button>
      )}
    </div>
  );
}

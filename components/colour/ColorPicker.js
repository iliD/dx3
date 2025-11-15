'use client';

import { useRef, useEffect, useState } from 'react';
import { converter, formatHex, formatRgb, formatHsl, interpolate, samples } from 'culori';

export default function ColorPicker({ color, onChange, colorSpace }) {
  const canvasRef = useRef(null);
  const hueCanvasRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [hue, setHue] = useState(color.oklch?.h || color.hsl?.h || 0);
  const [saturation, setSaturation] = useState(1);
  const [lightness, setLightness] = useState(0.5);

  // Convert color spaces
  const toOklch = converter('oklch');
  const toLab = converter('lab');
  const toLch = converter('lch');
  const toRgb = converter('rgb');
  const toHsl = converter('hsl');

  useEffect(() => {
    drawColorPicker();
    drawHueSlider();
  }, [hue, colorSpace]);

  const drawColorPicker = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const width = canvas.width;
    const height = canvas.height;

    // Create gradient based on color space
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const s = x / width;
        const l = 1 - (y / height);

        let rgbColor;
        if (colorSpace === 'oklch') {
          const oklchColor = { mode: 'oklch', l: l, c: s * 0.4, h: hue };
          rgbColor = toRgb(oklchColor);
        } else if (colorSpace === 'lch') {
          const lchColor = { mode: 'lch', l: l * 100, c: s * 150, h: hue };
          rgbColor = toRgb(lchColor);
        } else if (colorSpace === 'lab') {
          const labColor = { mode: 'lab', l: l * 100, a: (s - 0.5) * 128, b: 0 };
          rgbColor = toRgb(labColor);
        } else {
          // HSL mode
          const hslColor = { mode: 'hsl', h: hue, s: s, l: l };
          rgbColor = toRgb(hslColor);
        }

        if (rgbColor) {
          const r = Math.round((rgbColor.r || 0) * 255);
          const g = Math.round((rgbColor.g || 0) * 255);
          const b = Math.round((rgbColor.b || 0) * 255);
          ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }
  };

  const drawHueSlider = () => {
    const canvas = hueCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    for (let x = 0; x < width; x++) {
      const h = (x / width) * 360;
      let rgbColor;

      if (colorSpace === 'oklch') {
        const oklchColor = { mode: 'oklch', l: 0.65, c: 0.2, h: h };
        rgbColor = toRgb(oklchColor);
      } else if (colorSpace === 'lch') {
        const lchColor = { mode: 'lch', l: 65, c: 80, h: h };
        rgbColor = toRgb(lchColor);
      } else {
        const hslColor = { mode: 'hsl', h: h, s: 1, l: 0.5 };
        rgbColor = toRgb(hslColor);
      }

      if (rgbColor) {
        const r = Math.round((rgbColor.r || 0) * 255);
        const g = Math.round((rgbColor.g || 0) * 255);
        const b = Math.round((rgbColor.b || 0) * 255);
        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        ctx.fillRect(x, 0, 1, height);
      }
    }
  };

  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    updateColorFromCanvas(x, y);
  };

  const handleCanvasMouseMove = (e) => {
    if (!isDragging) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, canvas.width));
    const y = Math.max(0, Math.min(e.clientY - rect.top, canvas.height));

    updateColorFromCanvas(x, y);
  };

  const updateColorFromCanvas = (x, y) => {
    const canvas = canvasRef.current;
    const s = x / canvas.width;
    const l = 1 - (y / canvas.height);

    setSaturation(s);
    setLightness(l);

    let newColor;
    if (colorSpace === 'oklch') {
      newColor = { mode: 'oklch', l: l, c: s * 0.4, h: hue };
    } else if (colorSpace === 'lch') {
      newColor = { mode: 'lch', l: l * 100, c: s * 150, h: hue };
    } else if (colorSpace === 'lab') {
      newColor = { mode: 'lab', l: l * 100, a: (s - 0.5) * 128, b: 0 };
    } else {
      newColor = { mode: 'hsl', h: hue, s: s, l: l };
    }

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

  const handleHueClick = (e) => {
    const canvas = hueCanvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const newHue = (x / canvas.width) * 360;

    setHue(newHue);
    updateColorFromCanvas(saturation * canvasRef.current.width, (1 - lightness) * canvasRef.current.height);
  };

  return (
    <div className="space-y-4">
      {/* Current Color Preview */}
      <div className="flex items-center gap-4">
        <div
          className="w-full h-16 rounded-lg border border-gray-200 dark:border-[#2a2a2a]"
          style={{ backgroundColor: color.hex }}
        />
        <div className="text-sm font-mono text-gray-700 dark:text-gray-300">
          {color.hex}
        </div>
      </div>

      {/* 2D Color Picker */}
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={300}
          height={300}
          className="w-full h-auto rounded-lg cursor-crosshair border border-gray-200 dark:border-[#2a2a2a]"
          onClick={handleCanvasClick}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onMouseMove={handleCanvasMouseMove}
        />
        {/* Picker indicator */}
        <div
          className="absolute w-4 h-4 border-2 border-white dark:border-gray-900 rounded-full pointer-events-none shadow-lg"
          style={{
            left: `${saturation * 100}%`,
            top: `${(1 - lightness) * 100}%`,
            transform: 'translate(-50%, -50%)'
          }}
        />
      </div>

      {/* Hue Slider */}
      <div className="relative">
        <canvas
          ref={hueCanvasRef}
          width={300}
          height={24}
          className="w-full h-6 rounded-lg cursor-pointer border border-gray-200 dark:border-[#2a2a2a]"
          onClick={handleHueClick}
        />
        {/* Hue indicator */}
        <div
          className="absolute top-0 w-1 h-6 bg-white dark:bg-gray-900 border border-gray-900 dark:border-white pointer-events-none"
          style={{
            left: `${(hue / 360) * 100}%`,
            transform: 'translateX(-50%)'
          }}
        />
      </div>

      {/* Color Space Info */}
      <div className="text-xs text-gray-500 dark:text-gray-500">
        Current color space: {colorSpace.toUpperCase()}
      </div>
    </div>
  );
}

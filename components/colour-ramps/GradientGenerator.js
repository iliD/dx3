'use client';

import { useState } from 'react';

export default function GradientGenerator({ onGenerateGradient }) {
  const [colorStops, setColorStops] = useState([
    { id: 1, color: '#667eea', position: 0 },
    { id: 2, color: '#764ba2', position: 100 }
  ]);
  const [gradientName, setGradientName] = useState('');
  const [nextId, setNextId] = useState(3);

  // CSS Linear Gradient Controls
  const [gradientType, setGradientType] = useState('linear'); // 'linear' or 'radial'
  const [direction, setDirection] = useState('to right'); // CSS direction keyword
  const [angle, setAngle] = useState(90); // Angle in degrees
  const [useAngle, setUseAngle] = useState(false); // Toggle between keyword and angle

  // CSS Radial Gradient Controls
  const [radialShape, setRadialShape] = useState('circle'); // 'circle' or 'ellipse'
  const [radialSize, setRadialSize] = useState('farthest-corner'); // Size keyword
  const [radialPosition, setRadialPosition] = useState('center'); // Position keyword

  // Preview tab state
  const [previewTab, setPreviewTab] = useState('css'); // 'css' or 'svg'

  const addColorStop = () => {
    const positions = colorStops.map(s => s.position).sort((a, b) => a - b);
    let newPosition = 50;

    // Find a good position between existing stops
    if (colorStops.length > 0) {
      const maxPos = Math.max(...positions);
      if (maxPos < 100) {
        newPosition = Math.min(100, maxPos + 20);
      } else {
        // Find largest gap
        for (let i = 0; i < positions.length - 1; i++) {
          const gap = positions[i + 1] - positions[i];
          if (gap > 20) {
            newPosition = positions[i] + gap / 2;
            break;
          }
        }
      }
    }

    setColorStops([...colorStops, {
      id: nextId,
      color: '#808080',
      position: newPosition
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

  const handleGenerate = () => {
    const sortedStops = [...colorStops].sort((a, b) => a.position - b.position);

    const gradientConfig = {
      name: gradientName || 'untitled',
      type: gradientType,
      stops: sortedStops.map(stop => ({
        color: stop.color,
        position: stop.position,
        alpha: 1
      }))
    };

    // Add type-specific config
    if (gradientType === 'linear') {
      gradientConfig.direction = useAngle ? `${angle}deg` : direction;
    } else if (gradientType === 'radial') {
      gradientConfig.shape = radialShape;
      gradientConfig.size = radialSize;
      gradientConfig.position = radialPosition;
    }

    onGenerateGradient(gradientConfig);
  };

  // Generate CSS gradient string for preview
  const generateCSSGradient = () => {
    const sortedStops = [...colorStops].sort((a, b) => a.position - b.position);
    const stopsStr = sortedStops
      .map(stop => `${stop.color} ${stop.position}%`)
      .join(', ');

    if (gradientType === 'radial') {
      // Radial gradient: radial-gradient(shape size at position, color-stops)
      return `radial-gradient(${radialShape} ${radialSize} at ${radialPosition}, ${stopsStr})`;
    } else {
      // Linear gradient
      const dir = useAngle ? `${angle}deg` : direction;
      return `linear-gradient(${dir}, ${stopsStr})`;
    }
  };

  // Generate SVG gradient for preview
  const generateSVGGradient = () => {
    const sortedStops = [...colorStops].sort((a, b) => a.position - b.position);
    return sortedStops;
  };

  const sortedStops = [...colorStops].sort((a, b) => a.position - b.position);

  // Direction presets
  const directionPresets = [
    { value: 'to right', label: 'To Right →', angle: 90 },
    { value: 'to left', label: 'To Left ←', angle: 270 },
    { value: 'to bottom', label: 'To Bottom ↓', angle: 180 },
    { value: 'to top', label: 'To Top ↑', angle: 0 },
    { value: 'to bottom right', label: 'To Bottom Right ↘', angle: 135 },
    { value: 'to bottom left', label: 'To Bottom Left ↙', angle: 225 },
    { value: 'to top right', label: 'To Top Right ↗', angle: 45 },
    { value: 'to top left', label: 'To Top Left ↖', angle: 315 }
  ];

  return (
    <div className="space-y-4">
      {/* Gradient Preferences */}
      <div className="p-3 bg-gray-50 dark:bg-[#0a0a0a] rounded-md space-y-3">
        {/* Name Input */}
        <div>
          <input
            type="text"
            value={gradientName}
            onChange={(e) => setGradientName(e.target.value)}
            placeholder="Gradient name (required)"
            className={`w-full px-3 py-1.5 bg-white dark:bg-[#1a1a1a] border rounded text-gray-900 dark:text-gray-100 text-sm ${
              !gradientName ? 'border-red-300 dark:border-red-700' : 'border-gray-200 dark:border-[#2a2a2a]'
            }`}
            style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}
            required
          />
        </div>

        {/* Gradient Type */}
        <div className="flex items-center gap-3">
          <label className="text-xs text-gray-600 dark:text-gray-400" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
            Type
          </label>
          <select
            value={gradientType}
            onChange={(e) => setGradientType(e.target.value)}
            className="flex-1 px-3 py-1.5 text-sm bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded-md text-gray-900 dark:text-gray-100"
            style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}
          >
            <option value="linear">Linear</option>
            <option value="radial">Radial</option>
          </select>
        </div>

        {/* Linear Gradient Direction Controls */}
        {gradientType === 'linear' && (
          <div className="space-y-2">
            {/* Toggle between keyword and angle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setUseAngle(false)}
                className={`flex-1 px-3 py-1.5 text-xs rounded transition-colors ${
                  !useAngle
                    ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-black'
                    : 'bg-white dark:bg-[#1a1a1a] text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-[#2a2a2a]'
                }`}
                style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}
              >
                Direction
              </button>
              <button
                onClick={() => setUseAngle(true)}
                className={`flex-1 px-3 py-1.5 text-xs rounded transition-colors ${
                  useAngle
                    ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-black'
                    : 'bg-white dark:bg-[#1a1a1a] text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-[#2a2a2a]'
                }`}
                style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}
              >
                Angle
              </button>
            </div>

            {/* Direction Keyword Selector */}
            {!useAngle && (
              <select
                value={direction}
                onChange={(e) => setDirection(e.target.value)}
                className="w-full px-3 py-1.5 text-sm bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded-md text-gray-900 dark:text-gray-100"
                style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}
              >
                {directionPresets.map(preset => (
                  <option key={preset.value} value={preset.value}>
                    {preset.label}
                  </option>
                ))}
              </select>
            )}

            {/* Angle Input */}
            {useAngle && (
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="0"
                  max="360"
                  step="1"
                  value={angle}
                  onChange={(e) => setAngle(parseInt(e.target.value))}
                  className="flex-1 h-1 bg-gray-300 dark:bg-[#3a3a3a] rounded-full appearance-none cursor-pointer accent-gray-900 dark:accent-gray-100"
                />
                <input
                  type="number"
                  min="0"
                  max="360"
                  value={angle}
                  onChange={(e) => setAngle(parseInt(e.target.value) || 0)}
                  className="w-20 px-3 py-1.5 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded text-gray-900 dark:text-gray-100 font-mono text-sm text-center"
                />
                <span className="text-xs text-gray-500 dark:text-gray-500 font-mono">°</span>
              </div>
            )}
          </div>
        )}

        {/* Radial Gradient Controls */}
        {gradientType === 'radial' && (
          <div className="space-y-2">
            {/* Shape Selector */}
            <div className="flex items-center gap-3">
              <label className="text-xs text-gray-600 dark:text-gray-400 w-16" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                Shape
              </label>
              <select
                value={radialShape}
                onChange={(e) => setRadialShape(e.target.value)}
                className="flex-1 px-3 py-1.5 text-sm bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded-md text-gray-900 dark:text-gray-100"
                style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}
              >
                <option value="circle">Circle</option>
                <option value="ellipse">Ellipse</option>
              </select>
            </div>

            {/* Size Selector */}
            <div className="flex items-center gap-3">
              <label className="text-xs text-gray-600 dark:text-gray-400 w-16" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                Size
              </label>
              <select
                value={radialSize}
                onChange={(e) => setRadialSize(e.target.value)}
                className="flex-1 px-3 py-1.5 text-sm bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded-md text-gray-900 dark:text-gray-100"
                style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}
              >
                <option value="closest-side">Closest Side</option>
                <option value="farthest-side">Farthest Side</option>
                <option value="closest-corner">Closest Corner</option>
                <option value="farthest-corner">Farthest Corner</option>
              </select>
            </div>

            {/* Position Selector */}
            <div className="flex items-center gap-3">
              <label className="text-xs text-gray-600 dark:text-gray-400 w-16" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                Position
              </label>
              <select
                value={radialPosition}
                onChange={(e) => setRadialPosition(e.target.value)}
                className="flex-1 px-3 py-1.5 text-sm bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded-md text-gray-900 dark:text-gray-100"
                style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}
              >
                <option value="center">Center</option>
                <option value="top">Top</option>
                <option value="bottom">Bottom</option>
                <option value="left">Left</option>
                <option value="right">Right</option>
                <option value="top left">Top Left</option>
                <option value="top right">Top Right</option>
                <option value="bottom left">Bottom Left</option>
                <option value="bottom right">Bottom Right</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Color Stops */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
            Color stops
          </h3>
          <span className="text-xs text-gray-500 dark:text-gray-500 font-mono">
            {colorStops.length} stops
          </span>
        </div>

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
            />

            {/* Color Value Input */}
            <input
              type="text"
              value={stop.color}
              onChange={(e) => updateColorStop(stop.id, { color: e.target.value })}
              className="flex-1 px-2 py-1 bg-transparent text-gray-900 dark:text-gray-100 font-mono text-sm outline-none"
            />

            {/* Position Input */}
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="0"
                max="100"
                value={stop.position}
                onChange={(e) => updateColorStop(stop.id, { position: parseFloat(e.target.value) || 0 })}
                className="w-16 px-2 py-1 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded text-gray-900 dark:text-gray-100 font-mono text-sm text-center"
              />
              <span className="text-xs text-gray-500 dark:text-gray-500 font-mono">%</span>
            </div>

            {/* Add/Delete Buttons */}
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

      {/* Preview */}
      <div className="space-y-3">
        {/* Tab Selector */}
        <div className="flex items-center gap-2 border-b border-gray-200 dark:border-[#2a2a2a]">
          <button
            onClick={() => setPreviewTab('css')}
            className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
              previewTab === 'css'
                ? 'border-gray-900 dark:border-gray-100 text-gray-900 dark:text-gray-100'
                : 'border-transparent text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
            style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}
          >
            CSS Preview
          </button>
          <button
            onClick={() => setPreviewTab('svg')}
            className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
              previewTab === 'svg'
                ? 'border-gray-900 dark:border-gray-100 text-gray-900 dark:text-gray-100'
                : 'border-transparent text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
            style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}
          >
            SVG Preview
          </button>
        </div>

        {/* CSS Preview */}
        {previewTab === 'css' && (
          <div className="space-y-2">
            <div
              className="w-full h-32 rounded-md border border-gray-200 dark:border-[#2a2a2a]"
              style={{ background: generateCSSGradient() }}
            />
            <div className="text-xs text-gray-500 dark:text-gray-500 font-mono p-2 bg-gray-50 dark:bg-[#0a0a0a] rounded">
              {generateCSSGradient()}
            </div>
          </div>
        )}

        {/* SVG Preview */}
        {previewTab === 'svg' && (
          <div className="space-y-2">
            <svg width="100%" height="128" className="rounded-md border border-gray-200 dark:border-[#2a2a2a]">
              <defs>
                {gradientType === 'radial' ? (
                  <radialGradient id="preview-gradient" cx="50%" cy="50%" r="50%">
                    {generateSVGGradient().map((stop, i) => (
                      <stop
                        key={i}
                        offset={`${stop.position}%`}
                        style={{ stopColor: stop.color, stopOpacity: 1 }}
                      />
                    ))}
                  </radialGradient>
                ) : (
                  <linearGradient id="preview-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    {generateSVGGradient().map((stop, i) => (
                      <stop
                        key={i}
                        offset={`${stop.position}%`}
                        style={{ stopColor: stop.color, stopOpacity: 1 }}
                      />
                    ))}
                  </linearGradient>
                )}
              </defs>
              <rect width="100%" height="100%" fill="url(#preview-gradient)" />
            </svg>
            <div className="text-xs text-gray-500 dark:text-gray-500">
              SVG {gradientType}Gradient with {sortedStops.length} stops
            </div>
          </div>
        )}
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={!gradientName}
        className="w-full px-4 py-2.5 bg-gray-900 dark:bg-gray-100 text-white dark:text-black rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Generate gradient
      </button>
    </div>
  );
}

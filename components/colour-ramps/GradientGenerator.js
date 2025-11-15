'use client';

import { useState } from 'react';

export default function GradientGenerator({ onGenerateGradient }) {
  const [colorStops, setColorStops] = useState([
    { id: 1, color: '#667eea', position: 0 },
    { id: 2, color: '#764ba2', position: 100 }
  ]);
  const [nextId, setNextId] = useState(3);

  // CSS Linear Gradient Controls
  const [gradientType, setGradientType] = useState('linear'); // 'linear' or 'radial'
  const [angle, setAngle] = useState(90); // Angle in degrees (0-360)

  // CSS Radial Gradient Controls
  const [radialShape, setRadialShape] = useState('circle'); // 'circle' or 'ellipse'
  const [radialSize, setRadialSize] = useState('farthest-corner'); // Size keyword
  const [radialPosition, setRadialPosition] = useState('center'); // Position keyword

  // SVG Linear Gradient Coordinates (M3)
  const [svgX1, setSvgX1] = useState(0); // Start X coordinate (%)
  const [svgY1, setSvgY1] = useState(0); // Start Y coordinate (%)
  const [svgX2, setSvgX2] = useState(100); // End X coordinate (%)
  const [svgY2, setSvgY2] = useState(0); // End Y coordinate (%)

  // SVG Radial Gradient Coordinates (M4)
  const [svgCx, setSvgCx] = useState(50); // Center X coordinate (%)
  const [svgCy, setSvgCy] = useState(50); // Center Y coordinate (%)
  const [svgR, setSvgR] = useState(50); // Radius (%)
  const [svgFx, setSvgFx] = useState(50); // Focal point X coordinate (%)
  const [svgFy, setSvgFy] = useState(50); // Focal point Y coordinate (%)
  const [svgGradientUnits, setSvgGradientUnits] = useState('objectBoundingBox'); // 'objectBoundingBox' or 'userSpaceOnUse'

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
      name: '',
      type: gradientType,
      stops: sortedStops.map(stop => ({
        color: stop.color,
        position: stop.position,
        alpha: 1
      }))
    };

    // Add type-specific config
    if (gradientType === 'linear') {
      gradientConfig.direction = `${angle}deg`;
      // SVG Linear Gradient Coordinates (M3)
      gradientConfig.svg = {
        x1: svgX1,
        y1: svgY1,
        x2: svgX2,
        y2: svgY2
      };
    } else if (gradientType === 'radial') {
      gradientConfig.shape = radialShape;
      gradientConfig.size = radialSize;
      gradientConfig.position = radialPosition;
      // SVG Radial Gradient Coordinates (M4)
      gradientConfig.svg = {
        cx: svgCx,
        cy: svgCy,
        r: svgR,
        fx: svgFx,
        fy: svgFy,
        gradientUnits: svgGradientUnits
      };
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
      return `linear-gradient(${angle}deg, ${stopsStr})`;
    }
  };

  // Generate SVG gradient for preview
  const generateSVGGradient = () => {
    const sortedStops = [...colorStops].sort((a, b) => a.position - b.position);
    return sortedStops;
  };

  const sortedStops = [...colorStops].sort((a, b) => a.position - b.position);

  return (
    <div className="space-y-4">
      {/* Gradient Preferences */}
      <div className="p-3 bg-gray-50 dark:bg-[#0a0a0a] rounded-md space-y-3">
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
            {/* Angle label */}
            <label className="text-xs text-gray-600 dark:text-gray-400" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
              Direction
            </label>

            {/* Angle Slider and Input */}
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

            {/* SVG Coordinate Controls (M3) */}
            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-[#2a2a2a]">
              <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                SVG Coordinates
              </h4>
              <div className="space-y-2">
                {/* X1, Y1 - Start Point */}
                <div className="flex items-center gap-2">
                  <label className="text-xs text-gray-600 dark:text-gray-400 w-12" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                    Start
                  </label>
                  <div className="flex items-center gap-2 flex-1">
                    <div className="flex items-center gap-1 flex-1">
                      <span className="text-xs text-gray-500 dark:text-gray-500 font-mono w-6">x1</span>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        step="5"
                        value={svgX1}
                        onChange={(e) => setSvgX1(parseFloat(e.target.value) || 0)}
                        className="w-full px-2 py-1 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded text-gray-900 dark:text-gray-100 font-mono text-xs text-center"
                      />
                      <span className="text-xs text-gray-500 dark:text-gray-500 font-mono">%</span>
                    </div>
                    <div className="flex items-center gap-1 flex-1">
                      <span className="text-xs text-gray-500 dark:text-gray-500 font-mono w-6">y1</span>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        step="5"
                        value={svgY1}
                        onChange={(e) => setSvgY1(parseFloat(e.target.value) || 0)}
                        className="w-full px-2 py-1 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded text-gray-900 dark:text-gray-100 font-mono text-xs text-center"
                      />
                      <span className="text-xs text-gray-500 dark:text-gray-500 font-mono">%</span>
                    </div>
                  </div>
                </div>

                {/* X2, Y2 - End Point */}
                <div className="flex items-center gap-2">
                  <label className="text-xs text-gray-600 dark:text-gray-400 w-12" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                    End
                  </label>
                  <div className="flex items-center gap-2 flex-1">
                    <div className="flex items-center gap-1 flex-1">
                      <span className="text-xs text-gray-500 dark:text-gray-500 font-mono w-6">x2</span>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        step="5"
                        value={svgX2}
                        onChange={(e) => setSvgX2(parseFloat(e.target.value) || 0)}
                        className="w-full px-2 py-1 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded text-gray-900 dark:text-gray-100 font-mono text-xs text-center"
                      />
                      <span className="text-xs text-gray-500 dark:text-gray-500 font-mono">%</span>
                    </div>
                    <div className="flex items-center gap-1 flex-1">
                      <span className="text-xs text-gray-500 dark:text-gray-500 font-mono w-6">y2</span>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        step="5"
                        value={svgY2}
                        onChange={(e) => setSvgY2(parseFloat(e.target.value) || 0)}
                        className="w-full px-2 py-1 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded text-gray-900 dark:text-gray-100 font-mono text-xs text-center"
                      />
                      <span className="text-xs text-gray-500 dark:text-gray-500 font-mono">%</span>
                    </div>
                  </div>
                </div>

                {/* Preset Directions */}
                <div className="grid grid-cols-3 gap-1 mt-2">
                  <button
                    onClick={() => { setSvgX1(0); setSvgY1(0); setSvgX2(100); setSvgY2(0); }}
                    className="px-2 py-1 text-xs bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded hover:bg-gray-50 dark:hover:bg-[#2a2a2a] transition-colors"
                    style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}
                  >
                    →
                  </button>
                  <button
                    onClick={() => { setSvgX1(0); setSvgY1(0); setSvgX2(0); setSvgY2(100); }}
                    className="px-2 py-1 text-xs bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded hover:bg-gray-50 dark:hover:bg-[#2a2a2a] transition-colors"
                    style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}
                  >
                    ↓
                  </button>
                  <button
                    onClick={() => { setSvgX1(0); setSvgY1(0); setSvgX2(100); setSvgY2(100); }}
                    className="px-2 py-1 text-xs bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded hover:bg-gray-50 dark:hover:bg-[#2a2a2a] transition-colors"
                    style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}
                  >
                    ↘
                  </button>
                </div>
              </div>
            </div>
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

            {/* SVG Coordinate Controls (M4) */}
            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-[#2a2a2a]">
              <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                SVG Coordinates
              </h4>
              <div className="space-y-2">
                {/* Center (cx, cy) and Radius (r) */}
                <div className="flex items-center gap-2">
                  <label className="text-xs text-gray-600 dark:text-gray-400 w-12" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                    Center
                  </label>
                  <div className="flex items-center gap-2 flex-1">
                    <div className="flex items-center gap-1 flex-1">
                      <span className="text-xs text-gray-500 dark:text-gray-500 font-mono w-6">cx</span>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        step="5"
                        value={svgCx}
                        onChange={(e) => setSvgCx(parseFloat(e.target.value) || 0)}
                        className="w-full px-2 py-1 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded text-gray-900 dark:text-gray-100 font-mono text-xs text-center"
                      />
                      <span className="text-xs text-gray-500 dark:text-gray-500 font-mono">%</span>
                    </div>
                    <div className="flex items-center gap-1 flex-1">
                      <span className="text-xs text-gray-500 dark:text-gray-500 font-mono w-6">cy</span>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        step="5"
                        value={svgCy}
                        onChange={(e) => setSvgCy(parseFloat(e.target.value) || 0)}
                        className="w-full px-2 py-1 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded text-gray-900 dark:text-gray-100 font-mono text-xs text-center"
                      />
                      <span className="text-xs text-gray-500 dark:text-gray-500 font-mono">%</span>
                    </div>
                  </div>
                </div>

                {/* Radius */}
                <div className="flex items-center gap-2">
                  <label className="text-xs text-gray-600 dark:text-gray-400 w-12" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                    Radius
                  </label>
                  <div className="flex items-center gap-1 flex-1">
                    <span className="text-xs text-gray-500 dark:text-gray-500 font-mono w-6">r</span>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      step="5"
                      value={svgR}
                      onChange={(e) => setSvgR(parseFloat(e.target.value) || 0)}
                      className="w-full px-2 py-1 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded text-gray-900 dark:text-gray-100 font-mono text-xs text-center"
                    />
                    <span className="text-xs text-gray-500 dark:text-gray-500 font-mono">%</span>
                  </div>
                </div>

                {/* Focal Point (fx, fy) */}
                <div className="flex items-center gap-2">
                  <label className="text-xs text-gray-600 dark:text-gray-400 w-12" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                    Focal
                  </label>
                  <div className="flex items-center gap-2 flex-1">
                    <div className="flex items-center gap-1 flex-1">
                      <span className="text-xs text-gray-500 dark:text-gray-500 font-mono w-6">fx</span>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        step="5"
                        value={svgFx}
                        onChange={(e) => setSvgFx(parseFloat(e.target.value) || 0)}
                        className="w-full px-2 py-1 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded text-gray-900 dark:text-gray-100 font-mono text-xs text-center"
                      />
                      <span className="text-xs text-gray-500 dark:text-gray-500 font-mono">%</span>
                    </div>
                    <div className="flex items-center gap-1 flex-1">
                      <span className="text-xs text-gray-500 dark:text-gray-500 font-mono w-6">fy</span>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        step="5"
                        value={svgFy}
                        onChange={(e) => setSvgFy(parseFloat(e.target.value) || 0)}
                        className="w-full px-2 py-1 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded text-gray-900 dark:text-gray-100 font-mono text-xs text-center"
                      />
                      <span className="text-xs text-gray-500 dark:text-gray-500 font-mono">%</span>
                    </div>
                  </div>
                </div>

                {/* Gradient Units */}
                <div className="flex items-center gap-2">
                  <label className="text-xs text-gray-600 dark:text-gray-400 w-12" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                    Units
                  </label>
                  <select
                    value={svgGradientUnits}
                    onChange={(e) => setSvgGradientUnits(e.target.value)}
                    className="flex-1 px-2 py-1 text-xs bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded-md text-gray-900 dark:text-gray-100"
                    style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}
                  >
                    <option value="objectBoundingBox">Object Bounding Box</option>
                    <option value="userSpaceOnUse">User Space On Use</option>
                  </select>
                </div>

                {/* Preset Positions */}
                <div className="grid grid-cols-3 gap-1 mt-2">
                  <button
                    onClick={() => { setSvgCx(50); setSvgCy(50); setSvgFx(50); setSvgFy(50); }}
                    className="px-2 py-1 text-xs bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded hover:bg-gray-50 dark:hover:bg-[#2a2a2a] transition-colors"
                    style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}
                    title="Center"
                  >
                    Center
                  </button>
                  <button
                    onClick={() => { setSvgCx(50); setSvgCy(50); setSvgFx(25); setSvgFy(25); }}
                    className="px-2 py-1 text-xs bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded hover:bg-gray-50 dark:hover:bg-[#2a2a2a] transition-colors"
                    style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}
                    title="Top-left focal"
                  >
                    TL Focal
                  </button>
                  <button
                    onClick={() => { setSvgCx(50); setSvgCy(50); setSvgFx(75); setSvgFy(25); }}
                    className="px-2 py-1 text-xs bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded hover:bg-gray-50 dark:hover:bg-[#2a2a2a] transition-colors"
                    style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}
                    title="Top-right focal"
                  >
                    TR Focal
                  </button>
                </div>
              </div>
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
                  <radialGradient
                    id="preview-gradient"
                    cx={`${svgCx}%`}
                    cy={`${svgCy}%`}
                    r={`${svgR}%`}
                    fx={`${svgFx}%`}
                    fy={`${svgFy}%`}
                    gradientUnits={svgGradientUnits}
                  >
                    {generateSVGGradient().map((stop, i) => (
                      <stop
                        key={i}
                        offset={`${stop.position}%`}
                        style={{ stopColor: stop.color, stopOpacity: 1 }}
                      />
                    ))}
                  </radialGradient>
                ) : (
                  <linearGradient id="preview-gradient" x1={`${svgX1}%`} y1={`${svgY1}%`} x2={`${svgX2}%`} y2={`${svgY2}%`}>
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
        className="w-full px-4 py-2.5 bg-gray-900 dark:bg-gray-100 text-white dark:text-black rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors font-medium text-sm"
      >
        Generate gradient
      </button>
    </div>
  );
}

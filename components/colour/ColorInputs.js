'use client';

import { useState, useEffect } from 'react';
import { converter, formatHex, formatCss, parse } from 'culori';

export default function ColorInputs({ color, onChange, colorSpace }) {
  const [inputs, setInputs] = useState({});

  const toOklch = converter('oklch');
  const toLab = converter('lab');
  const toLch = converter('lch');
  const toRgb = converter('rgb');
  const toHsl = converter('hsl');

  useEffect(() => {
    // Update inputs when color changes externally
    updateInputsFromColor();
  }, [color, colorSpace]);

  const updateInputsFromColor = () => {
    switch (colorSpace) {
      case 'oklch':
        setInputs({
          l: color.oklch?.l?.toFixed(3) || '0',
          c: color.oklch?.c?.toFixed(3) || '0',
          h: color.oklch?.h?.toFixed(1) || '0'
        });
        break;
      case 'lch':
        setInputs({
          l: color.lch?.l?.toFixed(1) || '0',
          c: color.lch?.c?.toFixed(1) || '0',
          h: color.lch?.h?.toFixed(1) || '0'
        });
        break;
      case 'lab':
        setInputs({
          l: color.lab?.l?.toFixed(1) || '0',
          a: color.lab?.a?.toFixed(1) || '0',
          b: color.lab?.b?.toFixed(1) || '0'
        });
        break;
      case 'hsl':
        setInputs({
          h: color.hsl?.h?.toFixed(1) || '0',
          s: ((color.hsl?.s || 0) * 100).toFixed(1),
          l: ((color.hsl?.l || 0) * 100).toFixed(1)
        });
        break;
      case 'rgb':
        setInputs({
          r: Math.round((color.rgb?.r || 0) * 255),
          g: Math.round((color.rgb?.g || 0) * 255),
          b: Math.round((color.rgb?.b || 0) * 255)
        });
        break;
      case 'hex':
        setInputs({
          hex: color.hex || '#000000'
        });
        break;
    }
  };

  const handleInputChange = (key, value) => {
    const newInputs = { ...inputs, [key]: value };
    setInputs(newInputs);

    // Convert to color object and update
    let newColor;
    try {
      switch (colorSpace) {
        case 'oklch':
          newColor = {
            mode: 'oklch',
            l: parseFloat(newInputs.l) || 0,
            c: parseFloat(newInputs.c) || 0,
            h: parseFloat(newInputs.h) || 0
          };
          break;
        case 'lch':
          newColor = {
            mode: 'lch',
            l: parseFloat(newInputs.l) || 0,
            c: parseFloat(newInputs.c) || 0,
            h: parseFloat(newInputs.h) || 0
          };
          break;
        case 'lab':
          newColor = {
            mode: 'lab',
            l: parseFloat(newInputs.l) || 0,
            a: parseFloat(newInputs.a) || 0,
            b: parseFloat(newInputs.b) || 0
          };
          break;
        case 'hsl':
          newColor = {
            mode: 'hsl',
            h: parseFloat(newInputs.h) || 0,
            s: (parseFloat(newInputs.s) || 0) / 100,
            l: (parseFloat(newInputs.l) || 0) / 100
          };
          break;
        case 'rgb':
          newColor = {
            mode: 'rgb',
            r: (parseInt(newInputs.r) || 0) / 255,
            g: (parseInt(newInputs.g) || 0) / 255,
            b: (parseInt(newInputs.b) || 0) / 255
          };
          break;
        case 'hex':
          newColor = parse(newInputs.hex);
          break;
      }

      if (newColor) {
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
      }
    } catch (error) {
      // Invalid color, don't update
      console.error('Invalid color input:', error);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const renderInputs = () => {
    switch (colorSpace) {
      case 'oklch':
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Lightness (0-1)</label>
              <input
                type="number"
                step="0.001"
                min="0"
                max="1"
                value={inputs.l || ''}
                onChange={(e) => handleInputChange('l', e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded-md text-gray-900 dark:text-gray-100 font-mono text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Chroma (0-0.4)</label>
              <input
                type="number"
                step="0.001"
                min="0"
                max="0.4"
                value={inputs.c || ''}
                onChange={(e) => handleInputChange('c', e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded-md text-gray-900 dark:text-gray-100 font-mono text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Hue (0-360)</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="360"
                value={inputs.h || ''}
                onChange={(e) => handleInputChange('h', e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded-md text-gray-900 dark:text-gray-100 font-mono text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">CSS Value</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value={formatCss({ mode: 'oklch', ...color.oklch })}
                  className="flex-1 px-3 py-2 bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-[#2a2a2a] rounded-md text-gray-900 dark:text-gray-100 font-mono text-sm"
                />
                <button
                  onClick={() => copyToClipboard(formatCss({ mode: 'oklch', ...color.oklch }))}
                  className="px-3 py-2 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded-md hover:bg-gray-50 dark:hover:bg-[#2a2a2a] transition-colors text-sm"
                >
                  Copy
                </button>
              </div>
            </div>
          </div>
        );

      case 'lch':
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Lightness (0-100)</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="100"
                value={inputs.l || ''}
                onChange={(e) => handleInputChange('l', e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded-md text-gray-900 dark:text-gray-100 font-mono text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Chroma (0-150)</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="150"
                value={inputs.c || ''}
                onChange={(e) => handleInputChange('c', e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded-md text-gray-900 dark:text-gray-100 font-mono text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Hue (0-360)</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="360"
                value={inputs.h || ''}
                onChange={(e) => handleInputChange('h', e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded-md text-gray-900 dark:text-gray-100 font-mono text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">CSS Value</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value={formatCss({ mode: 'lch', ...color.lch })}
                  className="flex-1 px-3 py-2 bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-[#2a2a2a] rounded-md text-gray-900 dark:text-gray-100 font-mono text-sm"
                />
                <button
                  onClick={() => copyToClipboard(formatCss({ mode: 'lch', ...color.lch }))}
                  className="px-3 py-2 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded-md hover:bg-gray-50 dark:hover:bg-[#2a2a2a] transition-colors text-sm"
                >
                  Copy
                </button>
              </div>
            </div>
          </div>
        );

      case 'lab':
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Lightness (0-100)</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="100"
                value={inputs.l || ''}
                onChange={(e) => handleInputChange('l', e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded-md text-gray-900 dark:text-gray-100 font-mono text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">A (-128 to 128)</label>
              <input
                type="number"
                step="0.1"
                min="-128"
                max="128"
                value={inputs.a || ''}
                onChange={(e) => handleInputChange('a', e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded-md text-gray-900 dark:text-gray-100 font-mono text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">B (-128 to 128)</label>
              <input
                type="number"
                step="0.1"
                min="-128"
                max="128"
                value={inputs.b || ''}
                onChange={(e) => handleInputChange('b', e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded-md text-gray-900 dark:text-gray-100 font-mono text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">CSS Value</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value={formatCss({ mode: 'lab', ...color.lab })}
                  className="flex-1 px-3 py-2 bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-[#2a2a2a] rounded-md text-gray-900 dark:text-gray-100 font-mono text-sm"
                />
                <button
                  onClick={() => copyToClipboard(formatCss({ mode: 'lab', ...color.lab }))}
                  className="px-3 py-2 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded-md hover:bg-gray-50 dark:hover:bg-[#2a2a2a] transition-colors text-sm"
                >
                  Copy
                </button>
              </div>
            </div>
          </div>
        );

      case 'hsl':
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Hue (0-360)</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="360"
                value={inputs.h || ''}
                onChange={(e) => handleInputChange('h', e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded-md text-gray-900 dark:text-gray-100 font-mono text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Saturation (0-100%)</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="100"
                value={inputs.s || ''}
                onChange={(e) => handleInputChange('s', e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded-md text-gray-900 dark:text-gray-100 font-mono text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Lightness (0-100%)</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="100"
                value={inputs.l || ''}
                onChange={(e) => handleInputChange('l', e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded-md text-gray-900 dark:text-gray-100 font-mono text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">CSS Value</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value={`hsl(${inputs.h || 0}, ${inputs.s || 0}%, ${inputs.l || 0}%)`}
                  className="flex-1 px-3 py-2 bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-[#2a2a2a] rounded-md text-gray-900 dark:text-gray-100 font-mono text-sm"
                />
                <button
                  onClick={() => copyToClipboard(`hsl(${inputs.h || 0}, ${inputs.s || 0}%, ${inputs.l || 0}%)`)}
                  className="px-3 py-2 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded-md hover:bg-gray-50 dark:hover:bg-[#2a2a2a] transition-colors text-sm"
                >
                  Copy
                </button>
              </div>
            </div>
          </div>
        );

      case 'rgb':
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Red (0-255)</label>
              <input
                type="number"
                min="0"
                max="255"
                value={inputs.r || ''}
                onChange={(e) => handleInputChange('r', e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded-md text-gray-900 dark:text-gray-100 font-mono text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Green (0-255)</label>
              <input
                type="number"
                min="0"
                max="255"
                value={inputs.g || ''}
                onChange={(e) => handleInputChange('g', e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded-md text-gray-900 dark:text-gray-100 font-mono text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Blue (0-255)</label>
              <input
                type="number"
                min="0"
                max="255"
                value={inputs.b || ''}
                onChange={(e) => handleInputChange('b', e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded-md text-gray-900 dark:text-gray-100 font-mono text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">CSS Value</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value={`rgb(${inputs.r || 0}, ${inputs.g || 0}, ${inputs.b || 0})`}
                  className="flex-1 px-3 py-2 bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-[#2a2a2a] rounded-md text-gray-900 dark:text-gray-100 font-mono text-sm"
                />
                <button
                  onClick={() => copyToClipboard(`rgb(${inputs.r || 0}, ${inputs.g || 0}, ${inputs.b || 0})`)}
                  className="px-3 py-2 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded-md hover:bg-gray-50 dark:hover:bg-[#2a2a2a] transition-colors text-sm"
                >
                  Copy
                </button>
              </div>
            </div>
          </div>
        );

      case 'hex':
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Hexadecimal</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputs.hex || ''}
                  onChange={(e) => handleInputChange('hex', e.target.value)}
                  className="flex-1 px-3 py-2 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded-md text-gray-900 dark:text-gray-100 font-mono text-sm"
                  placeholder="#000000"
                />
                <button
                  onClick={() => copyToClipboard(inputs.hex || '')}
                  className="px-3 py-2 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded-md hover:bg-gray-50 dark:hover:bg-[#2a2a2a] transition-colors text-sm"
                >
                  Copy
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return <div>{renderInputs()}</div>;
}

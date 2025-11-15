'use client';

import { useState } from 'react';
import CodeBlock from '@/components/CodeBlock';

export default function RampExport({ ramp }) {
  const [exportFormat, setExportFormat] = useState('css');
  const [rampName, setRampName] = useState('primary');

  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  };

  const generateCSS = () => {
    const sortedStops = [...ramp.stops].sort((a, b) => a.value - b.value);

    return `:root {
  /* ${rampName.charAt(0).toUpperCase() + rampName.slice(1)} Color Ramp */
${sortedStops.map((stop, i) => {
  const rgb = hexToRgb(stop.color);
  const stepNumber = (i + 1) * 100;
  return `  --${rampName}-${stepNumber}: ${stop.color};
  --${rampName}-${stepNumber}-rgb: ${rgb.r}, ${rgb.g}, ${rgb.b};`;
}).join('\n')}
}`;
  };

  const generateDesignTokens = () => {
    const sortedStops = [...ramp.stops].sort((a, b) => a.value - b.value);

    const tokens = {
      color: {
        [rampName]: sortedStops.reduce((acc, stop, i) => {
          const stepNumber = (i + 1) * 100;
          const rgb = hexToRgb(stop.color);
          acc[stepNumber] = {
            value: stop.color,
            type: 'color',
            description: `${rampName.charAt(0).toUpperCase() + rampName.slice(1)} ${stepNumber}`,
            rgb: `${rgb.r}, ${rgb.g}, ${rgb.b}`,
            rgba: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${stop.alpha})`
          };
          return acc;
        }, {})
      }
    };

    return JSON.stringify(tokens, null, 2);
  };

  const generateFigma = () => {
    const sortedStops = [...ramp.stops].sort((a, b) => a.value - b.value);

    const figmaTokens = {
      [rampName]: sortedStops.reduce((acc, stop, i) => {
        const stepNumber = (i + 1) * 100;
        acc[stepNumber] = {
          value: stop.color,
          type: 'color',
          description: `${rampName.charAt(0).toUpperCase() + rampName.slice(1)} color step ${stepNumber}`
        };
        return acc;
      }, {})
    };

    return JSON.stringify(figmaTokens, null, 2);
  };

  const generateTailwind = () => {
    const sortedStops = [...ramp.stops].sort((a, b) => a.value - b.value);

    const colors = sortedStops.reduce((acc, stop, i) => {
      const stepNumber = (i + 1) * 100;
      acc[stepNumber] = stop.color;
      return acc;
    }, {});

    return `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        ${rampName}: ${JSON.stringify(colors, null, 10).replace(/\"([^\"]+)\":/g, '$1:')}
      }
    }
  }
}`;
  };

  const generateSCSS = () => {
    const sortedStops = [...ramp.stops].sort((a, b) => a.value - b.value);

    return `// ${rampName.charAt(0).toUpperCase() + rampName.slice(1)} Color Ramp
${sortedStops.map((stop, i) => {
  const stepNumber = (i + 1) * 100;
  return `$${rampName}-${stepNumber}: ${stop.color};`;
}).join('\n')}

// Color map
$${rampName}-colors: (
${sortedStops.map((stop, i) => {
  const stepNumber = (i + 1) * 100;
  return `  ${stepNumber}: $${rampName}-${stepNumber},`;
}).join('\n')}
);`;
  };

  const getExportCode = () => {
    switch (exportFormat) {
      case 'css':
        return generateCSS();
      case 'tokens':
        return generateDesignTokens();
      case 'figma':
        return generateFigma();
      case 'tailwind':
        return generateTailwind();
      case 'scss':
        return generateSCSS();
      default:
        return '';
    }
  };

  const getLanguage = () => {
    switch (exportFormat) {
      case 'css':
      case 'scss':
        return 'css';
      case 'tailwind':
        return 'javascript';
      case 'tokens':
      case 'figma':
        return 'json';
      default:
        return 'text';
    }
  };

  const getFileExtension = () => {
    switch (exportFormat) {
      case 'css':
        return 'css';
      case 'scss':
        return 'scss';
      case 'tailwind':
        return 'js';
      case 'tokens':
      case 'figma':
        return 'json';
      default:
        return 'txt';
    }
  };

  const downloadCode = () => {
    const code = getExportCode();
    const extension = getFileExtension();
    const filename = `${rampName}-ramp.${extension}`;

    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      {/* Ramp Name */}
      <div>
        <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-gray-100">
          Ramp name
        </label>
        <input
          type="text"
          value={rampName}
          onChange={(e) => setRampName(e.target.value.replace(/[^a-z0-9-]/gi, '').toLowerCase())}
          placeholder="e.g., primary, secondary, blue"
          className="w-full px-3 py-2 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded-md text-gray-900 dark:text-gray-100 text-sm font-mono"
        />
        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
          Used in variable names (e.g., --{rampName}-100, --{rampName}-200)
        </p>
      </div>

      {/* Format Selector */}
      <div className="flex items-center gap-2">
        <select
          value={exportFormat}
          onChange={(e) => setExportFormat(e.target.value)}
          className="flex-1 px-3 py-2 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded-md text-gray-900 dark:text-gray-100 text-sm"
        >
          <option value="css">CSS Variables</option>
          <option value="tokens">Design Tokens (JSON)</option>
          <option value="figma">Figma Variables</option>
          <option value="tailwind">Tailwind Config</option>
          <option value="scss">SCSS Variables</option>
        </select>
        <button
          onClick={downloadCode}
          className="px-4 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-black rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors text-sm font-medium"
        >
          Download
        </button>
      </div>

      {/* Format Description */}
      <div className="text-xs text-gray-600 dark:text-gray-400">
        {exportFormat === 'css' && 'CSS custom properties with RGB values for your stylesheets'}
        {exportFormat === 'tokens' && 'W3C Design Tokens format with full metadata'}
        {exportFormat === 'figma' && 'Figma-compatible token format for design handoff'}
        {exportFormat === 'tailwind' && 'Tailwind CSS configuration for your theme'}
        {exportFormat === 'scss' && 'SCSS variables and color map for Sass projects'}
      </div>

      {/* Code Preview */}
      <CodeBlock
        language={getLanguage()}
        code={getExportCode()}
      />
    </div>
  );
}

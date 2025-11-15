'use client';

import { useState } from 'react';
import { formatCss, converter } from 'culori';
import CodeBlock from '@/components/CodeBlock';

export default function ExportPanel({ palette, currentColor }) {
  const [exportFormat, setExportFormat] = useState('css');

  const toOklch = converter('oklch');
  const toLch = converter('lch');
  const toHsl = converter('hsl');
  const toRgb = converter('rgb');

  const generateCSS = () => {
    return `:root {
  /* Current Color */
  --color-current: ${currentColor.hex};
  --color-current-rgb: ${Math.round((currentColor.rgb?.r || 0) * 255)}, ${Math.round((currentColor.rgb?.g || 0) * 255)}, ${Math.round((currentColor.rgb?.b || 0) * 255)};
  --color-current-oklch: ${formatCss({ mode: 'oklch', ...currentColor.oklch })};

  /* Palette Colors */
${palette.map((color, i) => {
  const rgb = toRgb(color);
  const oklch = toOklch(color);
  return `  --color-${i + 1}: ${color};
  --color-${i + 1}-rgb: ${Math.round((rgb?.r || 0) * 255)}, ${Math.round((rgb?.g || 0) * 255)}, ${Math.round((rgb?.b || 0) * 255)};
  --color-${i + 1}-oklch: ${formatCss({ mode: 'oklch', ...oklch })};`;
}).join('\n')}
}`;
  };

  const generateTailwind = () => {
    const colors = palette.reduce((acc, color, i) => {
      acc[`palette-${i + 1}`] = color;
      return acc;
    }, {
      current: currentColor.hex
    });

    return `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: ${JSON.stringify(colors, null, 8).replace(/"([^"]+)":/g, '$1:')}
    }
  }
}`;
  };

  const generateSCSS = () => {
    return `// Current Color
$color-current: ${currentColor.hex};

// Palette Colors
${palette.map((color, i) => `$color-${i + 1}: ${color};`).join('\n')}

// Color map
$colors: (
  'current': $color-current,
${palette.map((color, i) => `  'palette-${i + 1}': $color-${i + 1},`).join('\n')}
);`;
  };

  const generateJSON = () => {
    const designTokens = {
      color: {
        current: {
          value: currentColor.hex,
          type: 'color',
          oklch: formatCss({ mode: 'oklch', ...currentColor.oklch }),
          rgb: `rgb(${Math.round((currentColor.rgb?.r || 0) * 255)}, ${Math.round((currentColor.rgb?.g || 0) * 255)}, ${Math.round((currentColor.rgb?.b || 0) * 255)})`
        },
        palette: palette.reduce((acc, color, i) => {
          const rgb = toRgb(color);
          const oklch = toOklch(color);
          acc[`${i + 1}`] = {
            value: color,
            type: 'color',
            oklch: formatCss({ mode: 'oklch', ...oklch }),
            rgb: `rgb(${Math.round((rgb?.r || 0) * 255)}, ${Math.round((rgb?.g || 0) * 255)}, ${Math.round((rgb?.b || 0) * 255)})`
          };
          return acc;
        }, {})
      }
    };

    return JSON.stringify(designTokens, null, 2);
  };

  const generateFigmaTokens = () => {
    const figmaTokens = {
      global: {
        color: {
          current: {
            value: currentColor.hex,
            type: 'color'
          },
          ...palette.reduce((acc, color, i) => {
            acc[`palette-${i + 1}`] = {
              value: color,
              type: 'color'
            };
            return acc;
          }, {})
        }
      }
    };

    return JSON.stringify(figmaTokens, null, 2);
  };

  const getExportCode = () => {
    switch (exportFormat) {
      case 'css':
        return generateCSS();
      case 'tailwind':
        return generateTailwind();
      case 'scss':
        return generateSCSS();
      case 'json':
        return generateJSON();
      case 'figma':
        return generateFigmaTokens();
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
      case 'json':
      case 'figma':
        return 'json';
      default:
        return 'text';
    }
  };

  const downloadCode = () => {
    const code = getExportCode();
    const extension = exportFormat === 'scss' ? 'scss' : exportFormat === 'tailwind' ? 'js' : exportFormat === 'figma' || exportFormat === 'json' ? 'json' : 'css';
    const filename = `palette.${extension}`;

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
      {/* Format Selector */}
      <div className="flex items-center gap-2">
        <select
          value={exportFormat}
          onChange={(e) => setExportFormat(e.target.value)}
          className="flex-1 px-3 py-2 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded-md text-gray-900 dark:text-gray-100 text-sm"
        >
          <option value="css">CSS Variables</option>
          <option value="tailwind">Tailwind Config</option>
          <option value="scss">SCSS Variables</option>
          <option value="json">Design Tokens (JSON)</option>
          <option value="figma">Figma Tokens</option>
        </select>
        <button
          onClick={downloadCode}
          className="px-4 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-black rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors text-sm font-medium"
        >
          Download
        </button>
      </div>

      {/* Code Preview */}
      <CodeBlock
        language={getLanguage()}
        code={getExportCode()}
      />
    </div>
  );
}

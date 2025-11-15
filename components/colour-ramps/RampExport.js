'use client';

import { useState, useEffect } from 'react';
import CodeBlock from '@/components/CodeBlock';

export default function RampExport({ ramp, mode }) {
  // Set initial format based on mode
  const getInitialFormat = () => {
    return mode === 'gradient' ? 'css-gradient' : 'css';
  };

  const [exportFormat, setExportFormat] = useState(getInitialFormat());
  const [casingRule, setCasingRule] = useState('kebab'); // 'kebab', 'camel', 'pascal', 'snake'

  // Update export format when mode changes
  useEffect(() => {
    if (mode === 'gradient') {
      setExportFormat('css-gradient');
    } else {
      setExportFormat('css');
    }
  }, [mode]);

  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  };

  const applyCasing = (name) => {
    if (!name) return 'untitled';

    switch (casingRule) {
      case 'camel':
        return name.replace(/[-_\s](.)/g, (_, c) => c.toUpperCase()).replace(/^(.)/, (_, c) => c.toLowerCase());
      case 'pascal':
        return name.replace(/[-_\s](.)/g, (_, c) => c.toUpperCase()).replace(/^(.)/, (_, c) => c.toUpperCase());
      case 'snake':
        return name.replace(/[-\s]/g, '_').toLowerCase();
      case 'kebab':
      default:
        return name.replace(/[_\s]/g, '-').toLowerCase();
    }
  };

  const rampName = applyCasing(ramp.name);

  // Determine if casing selector should be shown for current format
  const showCasingSelector = () => {
    return ['css', 'scss', 'tailwind', 'css-gradient', 'swiftui', 'compose'].includes(exportFormat);
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

  const generateCSSGradient = () => {
    // Handle gradient mode with position-based stops
    if (mode === 'gradient' && ramp.stops[0].hasOwnProperty('position')) {
      const sortedStops = [...ramp.stops].sort((a, b) => a.position - b.position);

      let gradientValue;
      if (ramp.type === 'radial') {
        // Radial gradient
        const shape = ramp.shape || 'circle';
        const size = ramp.size || 'farthest-corner';
        const position = ramp.position || 'center';
        gradientValue = `radial-gradient(
    ${shape} ${size} at ${position},
${sortedStops.map(stop => {
  return `    ${stop.color} ${stop.position}%`;
}).join(',\n')}
  )`;
      } else {
        // Linear gradient
        const direction = ramp.direction || 'to right';
        gradientValue = `linear-gradient(
    ${direction},
${sortedStops.map(stop => {
  return `    ${stop.color} ${stop.position}%`;
}).join(',\n')}
  )`;
      }

      // M6: Browser Compatibility - Generate vendor-prefixed versions
      const webkitValue = gradientValue.replace('linear-gradient', '-webkit-linear-gradient')
        .replace('radial-gradient', '-webkit-radial-gradient');
      const mozValue = gradientValue.replace('linear-gradient', '-moz-linear-gradient')
        .replace('radial-gradient', '-moz-radial-gradient');

      return `:root {
  /* ${rampName.charAt(0).toUpperCase() + rampName.slice(1)} Gradient */
  --${rampName}-gradient: ${gradientValue};
  --${rampName}-gradient-webkit: ${webkitValue};
  --${rampName}-gradient-moz: ${mozValue};
}

/* Browser Compatibility Notes (M6):
 * - Modern browsers (Chrome 26+, Firefox 16+, Safari 7+, Edge 12+): Use standard syntax
 * - Older WebKit (Safari 5.1-6.0, Chrome 10-25): Use -webkit- prefix
 * - Older Firefox (Firefox 3.6-15): Use -moz- prefix
 * - Internet Explorer 10+: Supports standard linear-gradient
 * - Internet Explorer 6-9: Not supported, requires filter fallback
 */

/* Usage example with browser compatibility */
.${rampName}-bg {
  /* Fallback for very old browsers */
  background: ${sortedStops[0].color};
  /* Older WebKit */
  background: var(--${rampName}-gradient-webkit);
  /* Older Firefox */
  background: var(--${rampName}-gradient-moz);
  /* Modern browsers */
  background: var(--${rampName}-gradient);
}`;
    }

    // Handle legacy ramp mode with value-based stops
    const sortedStops = [...ramp.stops].sort((a, b) => a.value - b.value);

    return `:root {
  /* ${rampName.charAt(0).toUpperCase() + rampName.slice(1)} Gradient */
  --${rampName}-gradient: linear-gradient(
    to right,
${sortedStops.map((stop, i) => {
  const percent = (i / (sortedStops.length - 1)) * 100;
  return `    ${stop.color} ${percent.toFixed(1)}%`;
}).join(',\n')}
  );
}

/* Usage example */
.${rampName}-bg {
  background: var(--${rampName}-gradient);
}`;
  };

  const generateSwiftUI = () => {
    const sortedStops = [...ramp.stops].sort((a, b) => a.value - b.value);

    return `// SwiftUI LinearGradient
// ${rampName.charAt(0).toUpperCase() + rampName.slice(1)} Gradient

import SwiftUI

extension LinearGradient {
    static var ${rampName}: LinearGradient {
        LinearGradient(
            gradient: Gradient(colors: [
${sortedStops.map(stop => {
  const rgb = hexToRgb(stop.color);
  return `                Color(red: ${(rgb.r / 255).toFixed(3)}, green: ${(rgb.g / 255).toFixed(3)}, blue: ${(rgb.b / 255).toFixed(3)})`;
}).join(',\n')}
            ]),
            startPoint: .leading,
            endPoint: .trailing
        )
    }
}

// Usage:
// Rectangle()
//     .fill(LinearGradient.${rampName})`;
  };

  const generateAndroidXML = () => {
    const sortedStops = [...ramp.stops].sort((a, b) => a.value - b.value);

    return `<?xml version="1.0" encoding="utf-8"?>
<!-- ${rampName.charAt(0).toUpperCase() + rampName.slice(1)} Gradient -->
<!-- Save as: drawable/${rampName}_gradient.xml -->
<shape xmlns:android="http://schemas.android.com/apk/res/android"
    android:shape="rectangle">
    <gradient
        android:type="linear"
        android:angle="0"
${sortedStops.map((stop, i) => {
  if (i === 0) return `        android:startColor="${stop.color}"`;
  if (i === sortedStops.length - 1) return `        android:endColor="${stop.color}"`;
  return `        android:centerColor="${stop.color}"`;
}).join('\n')}
    />
</shape>`;
  };

  const generateKotlinCompose = () => {
    const sortedStops = [...ramp.stops].sort((a, b) => a.value - b.value);

    return `// Jetpack Compose Gradient
// ${rampName.charAt(0).toUpperCase() + rampName.slice(1)} Gradient

import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color

val ${rampName}Gradient = Brush.linearGradient(
    colors = listOf(
${sortedStops.map(stop => {
  const rgb = hexToRgb(stop.color);
  return `        Color(0xFF${stop.color.substring(1).toUpperCase()})`;
}).join(',\n')}
    )
)

// Usage:
// Box(
//     modifier = Modifier
//         .fillMaxWidth()
//         .background(${rampName}Gradient)
// )`;
  };

  const generateSVG = () => {
    // Handle gradient mode with position-based stops
    if (mode === 'gradient' && ramp.stops[0].hasOwnProperty('position')) {
      const sortedStops = [...ramp.stops].sort((a, b) => a.position - b.position);

      if (ramp.type === 'radial') {
        // SVG Radial Gradient with custom coordinates (M4)
        const cx = ramp.svg?.cx !== undefined ? ramp.svg.cx : 50;
        const cy = ramp.svg?.cy !== undefined ? ramp.svg.cy : 50;
        const r = ramp.svg?.r !== undefined ? ramp.svg.r : 50;
        const fx = ramp.svg?.fx !== undefined ? ramp.svg.fx : cx;
        const fy = ramp.svg?.fy !== undefined ? ramp.svg.fy : cy;
        const gradientUnits = ramp.svg?.gradientUnits || 'objectBoundingBox';

        return `<!-- SVG Radial Gradient Definition -->
<!-- Center: (${cx}%, ${cy}%), Radius: ${r}%, Focal: (${fx}%, ${fy}%) -->

<!-- Browser Compatibility (M6):
  - All modern browsers support SVG gradients (Chrome 1+, Firefox 1.5+, Safari 3+, Edge 12+)
  - Internet Explorer 9+: Full support
  - Internet Explorer 6-8: Partial support with workarounds
-->

<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient
      id="${rampName}Gradient"
      cx="${cx}%"
      cy="${cy}%"
      r="${r}%"
      fx="${fx}%"
      fy="${fy}%"
      gradientUnits="${gradientUnits}"
    >
${sortedStops.map(stop => {
  return `      <stop offset="${stop.position}%" style="stop-color:${stop.color};stop-opacity:${stop.alpha || 1}" />`;
}).join('\n')}
    </radialGradient>
  </defs>

  <!-- Usage example -->
  <rect width="400" height="400" fill="url(#${rampName}Gradient)" />
</svg>`;
      } else {
        // SVG Linear Gradient with custom coordinates (M3)
        const x1 = ramp.svg?.x1 !== undefined ? ramp.svg.x1 : 0;
        const y1 = ramp.svg?.y1 !== undefined ? ramp.svg.y1 : 0;
        const x2 = ramp.svg?.x2 !== undefined ? ramp.svg.x2 : 100;
        const y2 = ramp.svg?.y2 !== undefined ? ramp.svg.y2 : 0;

        return `<!-- SVG Linear Gradient Definition -->
<!-- Coordinates: (${x1}%, ${y1}%) to (${x2}%, ${y2}%) -->

<!-- Browser Compatibility (M6):
  - All modern browsers support SVG gradients (Chrome 1+, Firefox 1.5+, Safari 3+, Edge 12+)
  - Internet Explorer 9+: Full support
  - Internet Explorer 6-8: Partial support with workarounds
-->

<svg width="400" height="100" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="${rampName}Gradient" x1="${x1}%" y1="${y1}%" x2="${x2}%" y2="${y2}%">
${sortedStops.map(stop => {
  return `      <stop offset="${stop.position}%" style="stop-color:${stop.color};stop-opacity:${stop.alpha || 1}" />`;
}).join('\n')}
    </linearGradient>
  </defs>

  <!-- Usage example -->
  <rect width="400" height="100" fill="url(#${rampName}Gradient)" />
</svg>`;
      }
    }

    // Handle legacy ramp mode with value-based stops
    const sortedStops = [...ramp.stops].sort((a, b) => a.value - b.value);

    return `<!-- SVG Linear Gradient Definition -->
<svg width="400" height="100" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="${rampName}Gradient" x1="0%" y1="0%" x2="100%" y2="0%">
${sortedStops.map((stop, i) => {
  const percent = (i / (sortedStops.length - 1)) * 100;
  return `      <stop offset="${percent.toFixed(1)}%" style="stop-color:${stop.color};stop-opacity:1" />`;
}).join('\n')}
    </linearGradient>
  </defs>

  <!-- Usage example -->
  <rect width="400" height="100" fill="url(#${rampName}Gradient)" />
</svg>`;
  };

  const generateGradientTokens = () => {
    // M5: Design Token Structure for gradients
    if (mode === 'gradient' && ramp.stops[0].hasOwnProperty('position')) {
      const sortedStops = [...ramp.stops].sort((a, b) => a.position - b.position);

      const token = {
        [rampName]: {
          type: 'gradient',
          value: {
            type: ramp.type,
            stops: sortedStops.map(stop => ({
              color: stop.color,
              position: stop.position,
              alpha: stop.alpha || 1
            }))
          },
          metadata: {
            created: new Date().toISOString(),
            version: '1.0.0',
            description: `${rampName.charAt(0).toUpperCase() + rampName.slice(1)} gradient`
          }
        }
      };

      // Add type-specific properties
      if (ramp.type === 'linear') {
        token[rampName].value.direction = ramp.direction || 'to right';
        if (ramp.svg) {
          token[rampName].value.svg = {
            x1: ramp.svg.x1,
            y1: ramp.svg.y1,
            x2: ramp.svg.x2,
            y2: ramp.svg.y2
          };
        }
      } else if (ramp.type === 'radial') {
        token[rampName].value.shape = ramp.shape || 'circle';
        token[rampName].value.size = ramp.size || 'farthest-corner';
        token[rampName].value.position = ramp.position || 'center';
        if (ramp.svg) {
          token[rampName].value.svg = {
            cx: ramp.svg.cx,
            cy: ramp.svg.cy,
            r: ramp.svg.r,
            fx: ramp.svg.fx,
            fy: ramp.svg.fy,
            gradientUnits: ramp.svg.gradientUnits
          };
        }
      }

      return JSON.stringify(token, null, 2);
    }

    // Fallback for ramp mode - use existing generateDesignTokens
    return generateDesignTokens();
  };

  const getExportCode = () => {
    switch (exportFormat) {
      case 'css':
        return generateCSS();
      case 'tokens':
        return mode === 'gradient' ? generateGradientTokens() : generateDesignTokens();
      case 'figma':
        return generateFigma();
      case 'tailwind':
        return generateTailwind();
      case 'scss':
        return generateSCSS();
      case 'css-gradient':
        return generateCSSGradient();
      case 'swiftui':
        return generateSwiftUI();
      case 'android-xml':
        return generateAndroidXML();
      case 'compose':
        return generateKotlinCompose();
      case 'svg':
        return generateSVG();
      default:
        return '';
    }
  };

  const getLanguage = () => {
    switch (exportFormat) {
      case 'css':
      case 'scss':
      case 'css-gradient':
        return 'css';
      case 'tailwind':
        return 'javascript';
      case 'tokens':
      case 'figma':
        return 'json';
      case 'swiftui':
      case 'compose':
        return 'swift';
      case 'android-xml':
      case 'svg':
        return 'xml';
      default:
        return 'text';
    }
  };

  const getFileExtension = () => {
    switch (exportFormat) {
      case 'css':
      case 'css-gradient':
        return 'css';
      case 'scss':
        return 'scss';
      case 'tailwind':
        return 'js';
      case 'tokens':
      case 'figma':
        return 'json';
      case 'swiftui':
        return 'swift';
      case 'android-xml':
        return 'xml';
      case 'compose':
        return 'kt';
      case 'svg':
        return 'svg';
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
      {/* Format Selector */}
      <div className="flex items-center gap-2">
        <select
          value={exportFormat}
          onChange={(e) => setExportFormat(e.target.value)}
          className="flex-1 px-3 py-2 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded-md text-gray-900 dark:text-gray-100 text-sm"
        >
          {mode === 'scale' ? (
            <optgroup label="Color Scales">
              <option value="css">CSS Variables</option>
              <option value="tokens">Design Tokens (JSON)</option>
              <option value="figma">Figma Variables</option>
              <option value="tailwind">Tailwind Config</option>
              <option value="scss">SCSS Variables</option>
            </optgroup>
          ) : (
            <>
              <optgroup label="Gradients - Web">
                <option value="css-gradient">CSS Gradient</option>
                <option value="svg">SVG Gradient</option>
              </optgroup>
              <optgroup label="Gradients - iOS/macOS">
                <option value="swiftui">SwiftUI</option>
              </optgroup>
              <optgroup label="Gradients - Android">
                <option value="android-xml">XML Drawable</option>
                <option value="compose">Jetpack Compose</option>
              </optgroup>
            </>
          )}
        </select>

        {/* Casing Selector - Only for applicable formats */}
        {showCasingSelector() && (
          <select
            value={casingRule}
            onChange={(e) => setCasingRule(e.target.value)}
            className="px-3 py-2 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded-md text-gray-900 dark:text-gray-100 text-sm"
            title="Naming convention"
          >
            <option value="kebab">kebab-case</option>
            <option value="camel">camelCase</option>
            <option value="pascal">PascalCase</option>
            <option value="snake">snake_case</option>
          </select>
        )}

        <button
          onClick={downloadCode}
          className="px-4 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-black rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors text-sm font-medium"
        >
          Download
        </button>
      </div>

      {/* Format Description */}
      <div className="text-xs text-gray-600 dark:text-gray-400">
        {exportFormat === 'css' && 'CSS custom properties with RGB values for color scales'}
        {exportFormat === 'tokens' && 'W3C Design Tokens format with full metadata'}
        {exportFormat === 'figma' && 'Figma-compatible token format for design handoff'}
        {exportFormat === 'tailwind' && 'Tailwind CSS theme configuration for color scales'}
        {exportFormat === 'scss' && 'SCSS variables and color maps for Sass projects'}
        {exportFormat === 'css-gradient' && 'CSS linear-gradient as custom property, ready to use'}
        {exportFormat === 'svg' && 'SVG gradient definition for use in SVG graphics'}
        {exportFormat === 'swiftui' && 'SwiftUI LinearGradient extension for iOS/macOS apps'}
        {exportFormat === 'android-xml' && 'Android XML gradient drawable resource'}
        {exportFormat === 'compose' && 'Jetpack Compose Brush.linearGradient for Android'}
      </div>

      {/* Code Preview */}
      <CodeBlock
        language={getLanguage()}
        code={getExportCode()}
      />
    </div>
  );
}

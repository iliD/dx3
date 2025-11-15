'use client';

import { useState } from 'react';
import CodeBlock from '@/components/CodeBlock';

export default function RampExport({ ramp }) {
  const [exportFormat, setExportFormat] = useState('html');

  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  };

  const generateHTML = () => {
    const sortedStops = [...ramp.stops].sort((a, b) => a.value - b.value);

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${ramp.name} - Color Ramp Legend</title>
  <style>
    .legend {
      font-family: Arial, sans-serif;
      max-width: 300px;
      border: 1px solid #ccc;
      border-radius: 4px;
      padding: 16px;
    }
    .legend-title {
      font-weight: bold;
      margin-bottom: 12px;
      font-size: 14px;
    }
    .legend-item {
      display: flex;
      align-items: center;
      margin-bottom: 6px;
    }
    .legend-color {
      width: 32px;
      height: 20px;
      margin-right: 8px;
      border: 1px solid #ddd;
      border-radius: 2px;
    }
    .legend-value {
      font-size: 13px;
    }
  </style>
</head>
<body>
  <div class="legend">
    <div class="legend-title">${ramp.name}</div>
    ${sortedStops.map(stop => `
    <div class="legend-item">
      <div class="legend-color" style="background-color: ${stop.color}; opacity: ${stop.alpha};"></div>
      <span class="legend-value">${stop.value.toFixed(ramp.range.decimals)}</span>
    </div>`).join('')}
  </div>
</body>
</html>`;
  };

  const generateJSON = () => {
    const sortedStops = [...ramp.stops].sort((a, b) => a.value - b.value);

    return JSON.stringify({
      name: ramp.name,
      range: {
        min: ramp.range.min,
        max: ramp.range.max,
        decimals: ramp.range.decimals
      },
      stops: sortedStops.map(stop => ({
        value: parseFloat(stop.value.toFixed(ramp.range.decimals)),
        color: stop.color,
        alpha: stop.alpha
      }))
    }, null, 2);
  };

  const generateCSS = () => {
    const sortedStops = [...ramp.stops].sort((a, b) => a.value - b.value);

    return `:root {
  /* ${ramp.name} Color Ramp */
${sortedStops.map((stop, i) => {
  const rgb = hexToRgb(stop.color);
  return `  --ramp-${i + 1}: ${stop.color};
  --ramp-${i + 1}-rgb: ${rgb.r}, ${rgb.g}, ${rgb.b};
  --ramp-${i + 1}-rgba: rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${stop.alpha});
  --ramp-${i + 1}-value: ${stop.value.toFixed(ramp.range.decimals)};`;
}).join('\n')}

  /* Gradient */
  --ramp-gradient: linear-gradient(to right,
${sortedStops.map((stop, i) => {
  const position = ((stop.value - ramp.range.min) / (ramp.range.max - ramp.range.min)) * 100;
  return `    rgba(${hexToRgb(stop.color).r}, ${hexToRgb(stop.color).g}, ${hexToRgb(stop.color).b}, ${stop.alpha}) ${position.toFixed(1)}%`;
}).join(',\n')}
  );
}`;
  };

  const generateJavaScript = () => {
    const sortedStops = [...ramp.stops].sort((a, b) => a.value - b.value);

    return `/**
 * ${ramp.name} Color Ramp
 * Range: ${ramp.range.min} to ${ramp.range.max}
 */
const colorRamp = {
  name: "${ramp.name}",
  stops: ${JSON.stringify(sortedStops, null, 4)},

  /**
   * Get color at a specific value
   * @param {number} value - Value to get color for
   * @returns {string} Hex color code
   */
  getColorAtValue(value) {
    const stops = this.stops;

    // Clamp value to range
    value = Math.max(${ramp.range.min}, Math.min(${ramp.range.max}, value));

    // Find bracketing stops
    for (let i = 0; i < stops.length - 1; i++) {
      const stop1 = stops[i];
      const stop2 = stops[i + 1];

      if (value >= stop1.value && value <= stop2.value) {
        const range = stop2.value - stop1.value;
        const factor = range === 0 ? 0 : (value - stop1.value) / range;

        // Interpolate RGB
        const rgb1 = this.hexToRgb(stop1.color);
        const rgb2 = this.hexToRgb(stop2.color);

        const r = Math.round(rgb1.r + (rgb2.r - rgb1.r) * factor);
        const g = Math.round(rgb1.g + (rgb2.g - rgb1.g) * factor);
        const b = Math.round(rgb1.b + (rgb2.b - rgb1.b) * factor);

        return \`#\${r.toString(16).padStart(2, '0')}\${g.toString(16).padStart(2, '0')}\${b.toString(16).padStart(2, '0')}\`;
      }
    }

    return value < stops[0].value ? stops[0].color : stops[stops.length - 1].color;
  },

  hexToRgb(hex) {
    const result = /^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  }
};`;
  };

  const generateSLD = () => {
    const sortedStops = [...ramp.stops].sort((a, b) => a.value - b.value);

    return `<?xml version="1.0" encoding="UTF-8"?>
<StyledLayerDescriptor version="1.0.0"
  xmlns="http://www.opengis.net/sld"
  xmlns:ogc="http://www.opengis.net/ogc"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.opengis.net/sld http://schemas.opengis.net/sld/1.0.0/StyledLayerDescriptor.xsd">
  <NamedLayer>
    <Name>${ramp.name}</Name>
    <UserStyle>
      <Title>${ramp.name} Color Ramp</Title>
      <FeatureTypeStyle>
        <Rule>
          <RasterSymbolizer>
            <ColorMap type="ramp">
${sortedStops.map(stop => {
  const rgb = hexToRgb(stop.color);
  const opacity = stop.alpha;
  return `              <ColorMapEntry color="${stop.color}" quantity="${stop.value}" opacity="${opacity}" label="${stop.value.toFixed(ramp.range.decimals)}" />`;
}).join('\n')}
            </ColorMap>
          </RasterSymbolizer>
        </Rule>
      </FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>`;
  };

  const generateQGIS = () => {
    const sortedStops = [...ramp.stops].sort((a, b) => a.value - b.value);

    return `<!DOCTYPE qgis PUBLIC 'http://mrcc.com/qgis.dtd' 'SYSTEM'>
<qgis version="3.0">
  <pipe>
    <rasterrenderer opacity="1" alphaBand="-1" band="1" type="singlebandpseudocolor">
      <rasterTransparency/>
      <minMaxOrigin>
        <limits>MinMax</limits>
        <extent>WholeRaster</extent>
        <statAccuracy>Estimated</statAccuracy>
      </minMaxOrigin>
      <rastershader>
        <colorrampshader colorRampType="INTERPOLATED" clip="0">
${sortedStops.map(stop => {
  const rgb = hexToRgb(stop.color);
  return `          <item alpha="${Math.round(stop.alpha * 255)}" value="${stop.value}" label="${stop.value.toFixed(ramp.range.decimals)}" color="${rgb.r},${rgb.g},${rgb.b}"/>`;
}).join('\n')}
        </colorrampshader>
      </rastershader>
    </rasterrenderer>
  </pipe>
</qgis>`;
  };

  const generateGEE = () => {
    const sortedStops = [...ramp.stops].sort((a, b) => a.value - b.value);

    return `// Google Earth Engine Color Ramp
// ${ramp.name}

var visualization = {
  min: ${ramp.range.min},
  max: ${ramp.range.max},
  palette: [
${sortedStops.map(stop => `    '${stop.color.replace('#', '')}'`).join(',\n')}
  ]
};

// Apply to image
Map.addLayer(image, visualization, '${ramp.name}');

// With custom values for each stop
var colorRamp = [
${sortedStops.map(stop => `  { value: ${stop.value}, color: '${stop.color}' }`).join(',\n')}
];`;
  };

  const generatePython = () => {
    const sortedStops = [...ramp.stops].sort((a, b) => a.value - b.value);

    return `"""
${ramp.name} Color Ramp
For use with matplotlib, numpy, etc.
"""

import numpy as np
from matplotlib.colors import LinearSegmentedColormap

# Color stops
stops = [
${sortedStops.map(stop => {
  const rgb = hexToRgb(stop.color);
  return `    (${stop.value}, (${(rgb.r / 255).toFixed(3)}, ${(rgb.g / 255).toFixed(3)}, ${(rgb.b / 255).toFixed(3)}))`;
}).join(',\n')}
]

# Create colormap
values = [s[0] for s in stops]
colors = [s[1] for s in stops]

# Normalize values to 0-1 range
normalized_values = [(v - ${ramp.range.min}) / (${ramp.range.max} - ${ramp.range.min}) for v in values]

# Create color dictionary for LinearSegmentedColormap
cdict = {
    'red': [(normalized_values[i], colors[i][0], colors[i][0]) for i in range(len(stops))],
    'green': [(normalized_values[i], colors[i][1], colors[i][1]) for i in range(len(stops))],
    'blue': [(normalized_values[i], colors[i][2], colors[i][2]) for i in range(len(stops))]
}

cmap = LinearSegmentedColormap('${ramp.name.replace(/\s+/g, '_')}', cdict)

# Usage example:
# import matplotlib.pyplot as plt
# plt.imshow(data, cmap=cmap, vmin=${ramp.range.min}, vmax=${ramp.range.max})
# plt.colorbar()`;
  };

  const getExportCode = () => {
    switch (exportFormat) {
      case 'html':
        return generateHTML();
      case 'json':
        return generateJSON();
      case 'css':
        return generateCSS();
      case 'javascript':
        return generateJavaScript();
      case 'sld':
        return generateSLD();
      case 'qgis':
        return generateQGIS();
      case 'gee':
        return generateGEE();
      case 'python':
        return generatePython();
      default:
        return '';
    }
  };

  const getLanguage = () => {
    switch (exportFormat) {
      case 'html':
        return 'html';
      case 'json':
        return 'json';
      case 'css':
        return 'css';
      case 'javascript':
        return 'javascript';
      case 'sld':
      case 'qgis':
        return 'xml';
      case 'gee':
        return 'javascript';
      case 'python':
        return 'python';
      default:
        return 'text';
    }
  };

  const getFileExtension = () => {
    switch (exportFormat) {
      case 'html':
        return 'html';
      case 'json':
        return 'json';
      case 'css':
        return 'css';
      case 'javascript':
        return 'js';
      case 'sld':
        return 'sld';
      case 'qgis':
        return 'qml';
      case 'gee':
        return 'js';
      case 'python':
        return 'py';
      default:
        return 'txt';
    }
  };

  const downloadCode = () => {
    const code = getExportCode();
    const extension = getFileExtension();
    const filename = `${ramp.name.toLowerCase().replace(/\s+/g, '-')}-ramp.${extension}`;

    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportFormats = [
    { value: 'html', label: 'HTML Legend', group: 'Visual' },
    { value: 'css', label: 'CSS Variables', group: 'Web' },
    { value: 'javascript', label: 'JavaScript Function', group: 'Code' },
    { value: 'json', label: 'JSON Data', group: 'Data' },
    { value: 'python', label: 'Python/Matplotlib', group: 'Science' },
    { value: 'sld', label: 'SLD (GIS Standard)', group: 'GIS' },
    { value: 'qgis', label: 'QGIS QML', group: 'GIS' },
    { value: 'gee', label: 'Google Earth Engine', group: 'Remote Sensing' }
  ];

  // Group formats by category
  const groupedFormats = exportFormats.reduce((acc, format) => {
    if (!acc[format.group]) {
      acc[format.group] = [];
    }
    acc[format.group].push(format);
    return acc;
  }, {});

  return (
    <div className="space-y-4">
      {/* Format Selector */}
      <div className="flex items-center gap-2">
        <select
          value={exportFormat}
          onChange={(e) => setExportFormat(e.target.value)}
          className="flex-1 px-3 py-2 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded-md text-gray-900 dark:text-gray-100 text-sm"
        >
          {Object.entries(groupedFormats).map(([group, formats]) => (
            <optgroup key={group} label={group}>
              {formats.map(format => (
                <option key={format.value} value={format.value}>
                  {format.label}
                </option>
              ))}
            </optgroup>
          ))}
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
        {exportFormat === 'html' && 'Complete HTML page with styled legend for display in browsers'}
        {exportFormat === 'css' && 'CSS custom properties for use in web stylesheets'}
        {exportFormat === 'javascript' && 'JavaScript function with color interpolation'}
        {exportFormat === 'json' && 'JSON structure for data exchange and storage'}
        {exportFormat === 'python' && 'Python code for matplotlib/numpy visualization'}
        {exportFormat === 'sld' && 'OGC Styled Layer Descriptor for GIS applications'}
        {exportFormat === 'qgis' && 'QGIS QML style file for raster layers'}
        {exportFormat === 'gee' && 'Google Earth Engine visualization parameters'}
      </div>

      {/* Code Preview */}
      <CodeBlock
        language={getLanguage()}
        code={getExportCode()}
      />
    </div>
  );
}

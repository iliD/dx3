'use client';

export default function RampTemplates({ onLoadTemplate }) {
  const templates = [
    {
      name: 'Temperature',
      description: 'Blue to red temperature scale',
      ramp: {
        name: 'Temperature',
        stops: [
          { value: -20, color: '#0000ff', alpha: 1 },
          { value: 0, color: '#00ffff', alpha: 1 },
          { value: 20, color: '#ffff00', alpha: 1 },
          { value: 40, color: '#ff0000', alpha: 1 }
        ],
        range: { min: -20, max: 40, decimals: 0 }
      }
    },
    {
      name: 'Extreme Temperature',
      description: 'Enhanced temperature gradient',
      ramp: {
        name: 'Extreme Temperature',
        stops: [
          { value: -40, color: '#2e0854', alpha: 1 },
          { value: -20, color: '#0000ff', alpha: 1 },
          { value: 0, color: '#00ffff', alpha: 1 },
          { value: 15, color: '#00ff00', alpha: 1 },
          { value: 30, color: '#ffff00', alpha: 1 },
          { value: 45, color: '#ff0000', alpha: 1 },
          { value: 60, color: '#800000', alpha: 1 }
        ],
        range: { min: -40, max: 60, decimals: 0 }
      }
    },
    {
      name: 'NDVI',
      description: 'Normalized Difference Vegetation Index',
      ramp: {
        name: 'NDVI',
        stops: [
          { value: -1, color: '#0000ff', alpha: 1 },
          { value: -0.2, color: '#a0a0a0', alpha: 1 },
          { value: 0, color: '#d3d3d3', alpha: 1 },
          { value: 0.2, color: '#ffffe0', alpha: 1 },
          { value: 0.4, color: '#90ee90', alpha: 1 },
          { value: 0.6, color: '#32cd32', alpha: 1 },
          { value: 0.8, color: '#008000', alpha: 1 },
          { value: 1, color: '#004d00', alpha: 1 }
        ],
        range: { min: -1, max: 1, decimals: 2 }
      }
    },
    {
      name: 'Precipitation',
      description: 'Rainfall intensity gradient',
      ramp: {
        name: 'Precipitation',
        stops: [
          { value: 0, color: '#ffffff', alpha: 1 },
          { value: 5, color: '#c6e8ff', alpha: 1 },
          { value: 10, color: '#87ceeb', alpha: 1 },
          { value: 25, color: '#4169e1', alpha: 1 },
          { value: 50, color: '#0000cd', alpha: 1 },
          { value: 100, color: '#00008b', alpha: 1 },
          { value: 200, color: '#000033', alpha: 1 }
        ],
        range: { min: 0, max: 200, decimals: 0 }
      }
    },
    {
      name: 'Evapotranspiration',
      description: 'ET water loss gradient',
      ramp: {
        name: 'Evapotranspiration',
        stops: [
          { value: 0, color: '#8b4513', alpha: 1 },
          { value: 2, color: '#d2691e', alpha: 1 },
          { value: 4, color: '#f4a460', alpha: 1 },
          { value: 6, color: '#90ee90', alpha: 1 },
          { value: 8, color: '#32cd32', alpha: 1 },
          { value: 10, color: '#008000', alpha: 1 }
        ],
        range: { min: 0, max: 10, decimals: 1 }
      }
    },
    {
      name: 'Elevation',
      description: 'Terrain height gradient',
      ramp: {
        name: 'Elevation',
        stops: [
          { value: 0, color: '#006400', alpha: 1 },
          { value: 500, color: '#8fbc8f', alpha: 1 },
          { value: 1000, color: '#daa520', alpha: 1 },
          { value: 2000, color: '#8b4513', alpha: 1 },
          { value: 3000, color: '#d3d3d3', alpha: 1 },
          { value: 4000, color: '#ffffff', alpha: 1 }
        ],
        range: { min: 0, max: 4000, decimals: 0 }
      }
    },
    {
      name: 'Viridis',
      description: 'Perceptually uniform color map',
      ramp: {
        name: 'Viridis',
        stops: [
          { value: 0, color: '#440154', alpha: 1 },
          { value: 20, color: '#414487', alpha: 1 },
          { value: 40, color: '#2a788e', alpha: 1 },
          { value: 60, color: '#22a884', alpha: 1 },
          { value: 80, color: '#7ad151', alpha: 1 },
          { value: 100, color: '#fde725', alpha: 1 }
        ],
        range: { min: 0, max: 100, decimals: 0 }
      }
    },
    {
      name: 'Plasma',
      description: 'High contrast perceptual color map',
      ramp: {
        name: 'Plasma',
        stops: [
          { value: 0, color: '#0d0887', alpha: 1 },
          { value: 20, color: '#6a00a8', alpha: 1 },
          { value: 40, color: '#b12a90', alpha: 1 },
          { value: 60, color: '#e16462', alpha: 1 },
          { value: 80, color: '#fca636', alpha: 1 },
          { value: 100, color: '#f0f921', alpha: 1 }
        ],
        range: { min: 0, max: 100, decimals: 0 }
      }
    },
    {
      name: 'Grayscale',
      description: 'Simple black to white gradient',
      ramp: {
        name: 'Grayscale',
        stops: [
          { value: 0, color: '#000000', alpha: 1 },
          { value: 100, color: '#ffffff', alpha: 1 }
        ],
        range: { min: 0, max: 100, decimals: 0 }
      }
    }
  ];

  return (
    <div className="grid grid-cols-1 gap-2">
      {templates.map((template, index) => (
        <button
          key={index}
          onClick={() => onLoadTemplate(template.ramp)}
          className="text-left p-3 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded-lg hover:bg-gray-50 dark:hover:bg-[#2a2a2a] transition-colors"
        >
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              {template.name}
            </h4>
            <span className="text-xs text-gray-500 dark:text-gray-500">
              {template.ramp.stops.length} stops
            </span>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
            {template.description}
          </p>
          {/* Preview gradient */}
          <div
            className="h-3 rounded"
            style={{
              background: `linear-gradient(to right, ${template.ramp.stops.map(s => s.color).join(', ')})`
            }}
          />
        </button>
      ))}
    </div>
  );
}

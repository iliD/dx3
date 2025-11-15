'use client';

export default function ColorRampEditor({ stops, range, onUpdateStop, onRemoveStop, onUpdateRange }) {
  return (
    <div className="space-y-6">
      {/* Range Configuration */}
      <div className="space-y-4 pb-6 border-b border-gray-200 dark:border-[#2a2a2a]">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Value range</h3>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Min value</label>
            <input
              type="number"
              value={range.min}
              onChange={(e) => onUpdateRange({ min: parseFloat(e.target.value) || 0 })}
              className="w-full px-3 py-2 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded-md text-gray-900 dark:text-gray-100 text-sm font-mono"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Max value</label>
            <input
              type="number"
              value={range.max}
              onChange={(e) => onUpdateRange({ max: parseFloat(e.target.value) || 100 })}
              className="w-full px-3 py-2 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded-md text-gray-900 dark:text-gray-100 text-sm font-mono"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Decimals</label>
            <input
              type="number"
              min="0"
              max="5"
              value={range.decimals}
              onChange={(e) => onUpdateRange({ decimals: parseInt(e.target.value) || 0 })}
              className="w-full px-3 py-2 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded-md text-gray-900 dark:text-gray-100 text-sm font-mono"
            />
          </div>
        </div>
      </div>

      {/* Color Stops */}
      <div className="space-y-3">
        {stops.map((stop, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-[#0a0a0a] rounded-lg"
          >
            {/* Color Picker */}
            <input
              type="color"
              value={stop.color}
              onChange={(e) => onUpdateStop(index, { color: e.target.value })}
              className="w-12 h-12 rounded border border-gray-200 dark:border-[#2a2a2a] cursor-pointer"
            />

            {/* Value Input */}
            <div className="flex-1">
              <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Value</label>
              <input
                type="number"
                value={stop.value}
                onChange={(e) => onUpdateStop(index, { value: parseFloat(e.target.value) || 0 })}
                step={range.decimals > 0 ? Math.pow(10, -range.decimals) : 1}
                className="w-full px-3 py-2 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded-md text-gray-900 dark:text-gray-100 text-sm font-mono"
              />
            </div>

            {/* Color Hex Input */}
            <div className="flex-1">
              <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Color</label>
              <input
                type="text"
                value={stop.color}
                onChange={(e) => onUpdateStop(index, { color: e.target.value })}
                className="w-full px-3 py-2 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded-md text-gray-900 dark:text-gray-100 text-sm font-mono"
              />
            </div>

            {/* Alpha Input */}
            <div className="w-20">
              <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Alpha</label>
              <input
                type="number"
                min="0"
                max="1"
                step="0.1"
                value={stop.alpha}
                onChange={(e) => onUpdateStop(index, { alpha: parseFloat(e.target.value) || 1 })}
                className="w-full px-3 py-2 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded-md text-gray-900 dark:text-gray-100 text-sm font-mono"
              />
            </div>

            {/* Remove Button */}
            {stops.length > 2 && (
              <button
                onClick={() => onRemoveStop(index)}
                className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                title="Remove stop"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Helper Text */}
      <p className="text-xs text-gray-500 dark:text-gray-500">
        Color stops are automatically sorted by value. At least 2 stops are required.
      </p>
    </div>
  );
}

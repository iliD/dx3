'use client';

import { useState } from 'react';

export default function ColorPalette({ palette, selectedIndex, onSelect, onRemove, onReorder }) {
  const [draggedIndex, setDraggedIndex] = useState(null);

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newPalette = [...palette];
    const draggedColor = newPalette[draggedIndex];
    newPalette.splice(draggedIndex, 1);
    newPalette.splice(index, 0, draggedColor);

    setDraggedIndex(index);
    onReorder(newPalette);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return (
    <div className="space-y-3">
      {palette.length === 0 ? (
        <div className="text-center py-12 text-gray-500 dark:text-gray-500 border-2 border-dashed border-gray-200 dark:border-[#2a2a2a] rounded-lg">
          No colors in palette. Add a color to get started.
        </div>
      ) : (
        <div className="grid grid-cols-5 gap-3">
          {palette.map((color, index) => (
            <div
              key={index}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              onClick={() => onSelect(index)}
              className={`group relative aspect-square rounded-lg cursor-pointer transition-all hover:scale-105 ${
                selectedIndex === index
                  ? 'ring-2 ring-gray-900 dark:ring-gray-100 ring-offset-2 dark:ring-offset-[#1a1a1a]'
                  : 'hover:ring-2 hover:ring-gray-400 dark:hover:ring-gray-600'
              }`}
              style={{ backgroundColor: color }}
            >
              {/* Color hex label */}
              <div className="absolute inset-x-0 bottom-0 p-2 bg-black/50 backdrop-blur-sm text-white text-xs font-mono rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity">
                {color}
              </div>

              {/* Remove button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(index);
                }}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 flex items-center justify-center text-sm"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Color count */}
      <div className="text-xs text-gray-500 dark:text-gray-500">
        {palette.length} {palette.length === 1 ? 'color' : 'colors'} in palette
      </div>
    </div>
  );
}

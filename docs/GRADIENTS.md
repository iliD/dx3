# Gradient Generator Documentation

## Overview

The Gradient Generator is a comprehensive tool for creating CSS and SVG gradients with full control over visual appearance and export formats. It supports both linear and radial gradients with advanced configuration options.

## Features

### Gradient Types

#### Linear Gradients (M1)
- **CSS Direction Controls**: Use keyword directions (to right, to left, etc.) or precise angles (0-360°)
- **8 Preset Directions**: Quick access to common gradient directions
- **Angle Slider**: Fine-tune gradient direction with 1-degree precision
- **SVG Coordinate Controls (M3)**: Full control over start point (x1, y1) and end point (x2, y2)

#### Radial Gradients (M2)
- **Shape Selection**: Circle or ellipse
- **Size Keywords**: closest-side, farthest-side, closest-corner, farthest-corner
- **Position Control**: 9 preset positions (center, corners, edges)
- **SVG Coordinate Controls (M4)**:
  - Center point (cx, cy)
  - Radius (r)
  - Focal point (fx, fy) for lighting effects
  - gradientUnits attribute (objectBoundingBox or userSpaceOnUse)

### Color Stops

- **Unlimited Color Stops**: Add as many color stops as needed (minimum 2)
- **Position Control**: Precise positioning from 0-100%
- **Color Picker**: Visual color selection with hex input
- **Automatic Sorting**: Stops are automatically sorted by position

### Export Formats

1. **CSS Gradient** - CSS custom properties with vendor prefixes (M6)
2. **Design Tokens** - JSON format with metadata (M5)
3. **SVG** - Standalone SVG with gradient definitions (M3, M4)
4. **Tailwind** - Tailwind CSS configuration
5. **SCSS** - Sass variables and color maps
6. **SwiftUI** - Native iOS gradient code
7. **Android XML** - Android drawable gradient
8. **Jetpack Compose** - Kotlin Compose gradient code
9. **Figma Tokens** - Figma plugin-compatible tokens

## Usage Guide

### Creating a Linear Gradient

1. **Select Gradient Type**
   - Click "Create a gradient" in the mode selector
   - Ensure "Linear" is selected in the Type dropdown

2. **Configure Direction**
   - Toggle between "Direction" and "Angle"
   - For Direction: Select from 8 preset options
   - For Angle: Use slider or type exact degree value

3. **Set Color Stops**
   - Click color picker to choose color
   - Enter position percentage (0-100%)
   - Click + button to add more stops
   - Click - button to remove stops (minimum 2 required)

4. **Configure SVG Coordinates** (Optional)
   - Adjust Start point (x1, y1)
   - Adjust End point (x2, y2)
   - Use preset buttons (→, ↓, ↘) for common directions

5. **Preview**
   - Switch between CSS Preview and SVG Preview tabs
   - CSS Preview shows rendered gradient
   - SVG Preview shows SVG element with coordinates

6. **Export**
   - Enter gradient name (required)
   - Click "Generate gradient"
   - Select export format from dropdown
   - Copy code from the export panel

### Creating a Radial Gradient

1. **Select Gradient Type**
   - Click "Create a gradient" in the mode selector
   - Select "Radial" in the Type dropdown

2. **Configure Radial Properties**
   - **Shape**: Circle or Ellipse
   - **Size**: Choose from 4 size keywords
   - **Position**: Select from 9 preset positions

3. **Set Color Stops**
   - Same as linear gradient (see above)

4. **Configure SVG Coordinates** (Optional)
   - Adjust Center (cx, cy)
   - Adjust Radius (r)
   - Adjust Focal point (fx, fy) for lighting effects
   - Select gradientUnits (objectBoundingBox or userSpaceOnUse)
   - Use preset buttons for quick configurations

5. **Preview & Export**
   - Same as linear gradient (see above)

## Examples

### Example 1: Simple Linear Gradient

**Configuration:**
- Type: Linear
- Direction: to right
- Stops:
  - #667eea at 0%
  - #764ba2 at 100%

**CSS Output:**
```css
:root {
  --my-gradient-gradient: linear-gradient(
    to right,
    #667eea 0%,
    #764ba2 100%
  );
}

.my-gradient-bg {
  background: var(--my-gradient-gradient);
}
```

### Example 2: Diagonal Linear Gradient with SVG Coordinates

**Configuration:**
- Type: Linear
- Direction: 135deg (or "to bottom right")
- SVG: x1=0, y1=0, x2=100, y2=100
- Stops:
  - #FF6B6B at 0%
  - #4ECDC4 at 50%
  - #45B7D1 at 100%

**SVG Output:**
```xml
<svg width="400" height="100" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="diagonalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#FF6B6B;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#4ECDC4;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#45B7D1;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="400" height="100" fill="url(#diagonalGradient)" />
</svg>
```

### Example 3: Radial Gradient with Focal Point

**Configuration:**
- Type: Radial
- Shape: circle
- Size: farthest-corner
- Position: center
- SVG: cx=50, cy=50, r=50, fx=25, fy=25
- Stops:
  - #FFFFFF at 0%
  - #FFD700 at 30%
  - #FF6347 at 100%

**Design Token Output:**
```json
{
  "spotlight": {
    "type": "gradient",
    "value": {
      "type": "radial",
      "stops": [
        {"color": "#FFFFFF", "position": 0, "alpha": 1},
        {"color": "#FFD700", "position": 30, "alpha": 1},
        {"color": "#FF6347", "position": 100, "alpha": 1}
      ],
      "shape": "circle",
      "size": "farthest-corner",
      "position": "center",
      "svg": {
        "cx": 50,
        "cy": 50,
        "r": 50,
        "fx": 25,
        "fy": 25,
        "gradientUnits": "objectBoundingBox"
      }
    },
    "metadata": {
      "created": "2025-11-15T...",
      "version": "1.0.0",
      "description": "Spotlight gradient"
    }
  }
}
```

## Browser Compatibility (M6)

### CSS Gradients

| Browser | Version | Support | Notes |
|---------|---------|---------|-------|
| Chrome | 26+ | Full | Standard syntax |
| Chrome | 10-25 | Partial | Requires -webkit- prefix |
| Firefox | 16+ | Full | Standard syntax |
| Firefox | 3.6-15 | Partial | Requires -moz- prefix |
| Safari | 7+ | Full | Standard syntax |
| Safari | 5.1-6.0 | Partial | Requires -webkit- prefix |
| Edge | 12+ | Full | Standard syntax |
| IE | 10+ | Full | Standard linear-gradient only |
| IE | 6-9 | None | Requires filter fallback |

### SVG Gradients

| Browser | Version | Support | Notes |
|---------|---------|---------|-------|
| Chrome | 1+ | Full | Excellent support |
| Firefox | 1.5+ | Full | Excellent support |
| Safari | 3+ | Full | Excellent support |
| Edge | 12+ | Full | Excellent support |
| IE | 9+ | Full | Good support |
| IE | 6-8 | Partial | Requires workarounds |

### Progressive Enhancement Example

The generated CSS includes vendor prefixes and fallbacks for maximum compatibility:

```css
.gradient-bg {
  /* Fallback for very old browsers */
  background: #667eea;
  /* Older WebKit */
  background: var(--gradient-webkit);
  /* Older Firefox */
  background: var(--gradient-moz);
  /* Modern browsers */
  background: var(--gradient);
}
```

## Technical Details

### State Management

The gradient generator maintains separate state for:
- Gradient configuration (type, direction, shape, size, position)
- Color stops (color, position, alpha)
- SVG coordinates (linear: x1, y1, x2, y2; radial: cx, cy, r, fx, fy)
- UI state (preview tab, naming)

### Data Structure

**Linear Gradient:**
```javascript
{
  name: "my-gradient",
  type: "linear",
  direction: "to right", // or "45deg"
  stops: [
    { color: "#667eea", position: 0, alpha: 1 },
    { color: "#764ba2", position: 100, alpha: 1 }
  ],
  svg: {
    x1: 0,
    y1: 0,
    x2: 100,
    y2: 0
  }
}
```

**Radial Gradient:**
```javascript
{
  name: "my-gradient",
  type: "radial",
  shape: "circle",
  size: "farthest-corner",
  position: "center",
  stops: [
    { color: "#667eea", position: 0, alpha: 1 },
    { color: "#764ba2", position: 100, alpha: 1 }
  ],
  svg: {
    cx: 50,
    cy: 50,
    r: 50,
    fx: 50,
    fy: 50,
    gradientUnits: "objectBoundingBox"
  }
}
```

## Requirements Fulfilled

### Phase 1: MUST HAVE

- ✅ **M1**: CSS Linear Gradients - Full implementation with direction and angle controls
- ✅ **M2**: CSS Radial Gradients - Complete with shape, size, and position controls
- ✅ **M3**: SVG Linear Gradients - Coordinate controls (x1, y1, x2, y2)
- ✅ **M4**: SVG Radial Gradients - Focal point controls (fx, fy) and gradientUnits
- ✅ **M5**: Design Token Structure - JSON format with metadata and versioning
- ✅ **M6**: Browser Compatibility - Vendor prefixes and comprehensive documentation
- ✅ **M7**: Documentation - This comprehensive guide with examples

## Best Practices

### Naming Conventions

- Use descriptive names: `hero-gradient`, `card-highlight`, `sunset-bg`
- Avoid generic names: `gradient1`, `test`, `temp`
- Use consistent casing based on export format

### Color Stop Placement

- **Smooth transitions**: Use evenly spaced stops
- **Sharp transitions**: Place stops close together
- **Highlight effects**: Add intermediate stops at strategic positions
- **Minimum 2 stops**: Required for valid gradient

### Performance

- **Limit color stops**: More stops = more complex rendering
- **Use CSS variables**: Better for theming and maintenance
- **Prefer CSS over SVG**: When both work, CSS is typically more performant
- **Test on target devices**: Mobile browsers may render differently

### Accessibility

- **Ensure sufficient contrast**: Text on gradients must meet WCAG guidelines
- **Provide fallback colors**: For browsers that don't support gradients
- **Test in different modes**: Dark mode, high contrast, etc.

## Troubleshooting

### Gradient not appearing

1. Check browser compatibility
2. Verify syntax (use export format as reference)
3. Ensure element has dimensions (width/height)
4. Check z-index and positioning

### Colors look different than expected

1. Verify color values are correct
2. Check color space (sRGB vs display-P3)
3. Test in multiple browsers
4. Consider color management settings

### SVG gradients not scaling properly

1. Check gradientUnits setting
2. Use objectBoundingBox for responsive scaling
3. Use userSpaceOnUse for fixed coordinates
4. Verify viewBox and preserveAspectRatio attributes

## Support

For issues, feature requests, or questions:
- GitHub Issues: [Report an issue]
- Documentation: This file
- Examples: See Examples section above

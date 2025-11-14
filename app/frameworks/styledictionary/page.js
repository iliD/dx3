import CodeBlock from '@/components/CodeBlock';

export const metadata = {
  title: 'How to set up Style Dictionary on your Mac | designDesignsDesign',
  description: 'A comprehensive guide to installing and configuring Style Dictionary for design token management on macOS',
};

export default function StyleDictionaryPage() {
  return (
    <div className="min-h-screen py-20">
      <div style={{ marginLeft: 'clamp(1.5rem, 8vw, 6rem)', marginRight: 'clamp(1.5rem, 4vw, 1.5rem)' }}>
        {/* Navigation */}
        <nav className="mb-8 p-4 bg-gray-50 dark:bg-[#0f0f0f] border border-gray-200 dark:border-[#2a2a2a] rounded-lg">
          <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3">Toolchain guides</h2>
          <ul className="space-y-2">
            <li>
              <a href="/frameworks/toolchain" className="text-gray-700 dark:text-gray-300 underline hover:no-underline hover:text-black dark:hover:text-white cursor-pointer">
                Mac terminal setup
              </a>
            </li>
            <li>
              <span className="text-gray-900 dark:text-gray-100 font-medium">Style Dictionary setup</span>
            </li>
          </ul>
        </nav>

        <h1 className="text-4xl mb-6">How to set up Style Dictionary on your Mac</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-12">
          A comprehensive guide to installing and configuring Style Dictionary for design token management on macOS
        </p>

        {/* Section 1: Introduction */}
        <section className="mb-12">
          <h2 className="text-2xl mb-4">What is Style Dictionary?</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Style Dictionary is a build system that allows you to define design tokens once and use them across multiple platforms and languages. It transforms design tokens into platform-specific formats like CSS, SCSS, JavaScript, iOS Swift, Android XML, and more.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            This guide will walk you through setting up Style Dictionary on macOS, from installation to creating your first design token system.
          </p>
        </section>

        {/* Section 2: Prerequisites */}
        <section className="mb-12">
          <h2 className="text-2xl mb-4">Prerequisites</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Before installing Style Dictionary, you'll need Node.js and npm installed on your Mac. If you haven't installed them yet, follow these steps:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
            <li>Install Homebrew if you haven't already (see our <a href="/frameworks/toolchain" className="underline hover:no-underline cursor-pointer">terminal setup guide</a>)</li>
            <li>Install Node.js via Homebrew</li>
            <li>Verify your installation</li>
          </ol>
          <CodeBlock
            code={`# Install Node.js and npm
brew install node

# Verify installation
node --version
npm --version`}
            language="bash"
          />
        </section>

        {/* Section 3: Installing Style Dictionary */}
        <section className="mb-12">
          <h2 className="text-2xl mb-4">Installing Style Dictionary</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            You can install Style Dictionary globally or as a project dependency. We recommend installing it as a project dependency to ensure version consistency across your team.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            First, create a new directory for your design tokens project:
          </p>
          <CodeBlock
            code={`# Create and navigate to your project directory
mkdir my-design-tokens
cd my-design-tokens

# Initialise a new npm project
npm init -y`}
            language="bash"
          />
          <p className="text-gray-700 dark:text-gray-300 mb-4 mt-6">
            Now install Style Dictionary:
          </p>
          <CodeBlock
            code={`# Install Style Dictionary as a dev dependency
npm install --save-dev style-dictionary`}
            language="bash"
          />
        </section>

        {/* Section 4: Project structure */}
        <section className="mb-12">
          <h2 className="text-2xl mb-4">Creating your project structure</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Create the following directory structure for your design tokens:
          </p>
          <CodeBlock
            code={`# Create directories
mkdir -p tokens/color
mkdir -p tokens/size
mkdir -p tokens/typography
mkdir build`}
            language="bash"
          />
          <p className="text-gray-700 dark:text-gray-300 mb-4 mt-6">
            Your project structure should look like this:
          </p>
          <CodeBlock
            code={`my-design-tokens/
├── tokens/
│   ├── color/
│   ├── size/
│   └── typography/
├── build/
├── config.json
└── package.json`}
            language="bash"
          />
        </section>

        {/* Section 5: Configuration file */}
        <section className="mb-12">
          <h2 className="text-2xl mb-4">Creating the configuration file</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Create a <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">config.json</code> file in your project root. This file tells Style Dictionary how to transform and output your tokens:
          </p>
          <CodeBlock
            code={`{
  "source": ["tokens/**/*.json"],
  "platforms": {
    "css": {
      "transformGroup": "css",
      "buildPath": "build/css/",
      "files": [{
        "destination": "variables.css",
        "format": "css/variables"
      }]
    },
    "scss": {
      "transformGroup": "scss",
      "buildPath": "build/scss/",
      "files": [{
        "destination": "variables.scss",
        "format": "scss/variables"
      }]
    },
    "js": {
      "transformGroup": "js",
      "buildPath": "build/js/",
      "files": [{
        "destination": "tokens.js",
        "format": "javascript/es6"
      }]
    }
  }
}`}
            language="json"
          />
        </section>

        {/* Section 6: Defining tokens */}
        <section className="mb-12">
          <h2 className="text-2xl mb-4">Defining your design tokens</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Create your first token file for colours. Create <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">tokens/color/base.json</code>:
          </p>
          <CodeBlock
            code={`{
  "color": {
    "base": {
      "gray": {
        "50": { "value": "#f9fafb" },
        "100": { "value": "#f3f4f6" },
        "200": { "value": "#e5e7eb" },
        "300": { "value": "#d1d5db" },
        "400": { "value": "#9ca3af" },
        "500": { "value": "#6b7280" },
        "600": { "value": "#4b5563" },
        "700": { "value": "#374151" },
        "800": { "value": "#1f2937" },
        "900": { "value": "#111827" }
      },
      "blue": {
        "500": { "value": "#3b82f6" },
        "600": { "value": "#2563eb" },
        "700": { "value": "#1d4ed8" }
      }
    },
    "brand": {
      "primary": { "value": "{color.base.blue.600.value}" },
      "secondary": { "value": "{color.base.gray.700.value}" }
    }
  }
}`}
            language="json"
          />
          <p className="text-gray-700 dark:text-gray-300 mb-4 mt-6">
            Create a typography token file at <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">tokens/typography/font.json</code>:
          </p>
          <CodeBlock
            code={`{
  "font": {
    "family": {
      "sans": { "value": "IBM Plex Sans, -apple-system, BlinkMacSystemFont, sans-serif" },
      "serif": { "value": "IBM Plex Serif, Georgia, serif" },
      "mono": { "value": "IBM Plex Mono, Menlo, Monaco, monospace" }
    },
    "size": {
      "xs": { "value": "0.75rem" },
      "sm": { "value": "0.875rem" },
      "base": { "value": "1rem" },
      "lg": { "value": "1.125rem" },
      "xl": { "value": "1.25rem" },
      "2xl": { "value": "1.5rem" },
      "3xl": { "value": "1.875rem" },
      "4xl": { "value": "2.25rem" }
    },
    "weight": {
      "normal": { "value": "400" },
      "bold": { "value": "700" }
    }
  }
}`}
            language="json"
          />
        </section>

        {/* Section 7: Build script */}
        <section className="mb-12">
          <h2 className="text-2xl mb-4">Adding build scripts</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Add build scripts to your <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">package.json</code>:
          </p>
          <CodeBlock
            code={`{
  "name": "my-design-tokens",
  "version": "1.0.0",
  "scripts": {
    "build": "style-dictionary build",
    "clean": "rm -rf build",
    "rebuild": "npm run clean && npm run build"
  },
  "devDependencies": {
    "style-dictionary": "^3.9.0"
  }
}`}
            language="json"
          />
        </section>

        {/* Section 8: Building tokens */}
        <section className="mb-12">
          <h2 className="text-2xl mb-4">Building your design tokens</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Run the build command to transform your tokens into platform-specific formats:
          </p>
          <CodeBlock
            code={`# Build your tokens
npm run build`}
            language="bash"
          />
          <p className="text-gray-700 dark:text-gray-300 mb-4 mt-6">
            You should see output similar to this:
          </p>
          <CodeBlock
            code={`✔︎ build/css/variables.css
✔︎ build/scss/variables.scss
✔︎ build/js/tokens.js`}
            language="bash"
          />
          <p className="text-gray-700 dark:text-gray-300 mb-4 mt-6">
            Your generated CSS file will look like this:
          </p>
          <CodeBlock
            code={`:root {
  --color-base-gray-50: #f9fafb;
  --color-base-gray-100: #f3f4f6;
  --color-base-gray-200: #e5e7eb;
  --color-base-blue-500: #3b82f6;
  --color-brand-primary: #2563eb;
  --font-family-sans: IBM Plex Sans, -apple-system, BlinkMacSystemFont, sans-serif;
  --font-size-base: 1rem;
  --font-weight-bold: 700;
}`}
            language="css"
          />
        </section>

        {/* Section 9: Using tokens in projects */}
        <section className="mb-12">
          <h2 className="text-2xl mb-4">Using tokens in your projects</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Import and use your generated tokens in your CSS:
          </p>
          <CodeBlock
            code={`/* Import your variables */
@import './build/css/variables.css';

/* Use them in your styles */
body {
  font-family: var(--font-family-sans);
  font-size: var(--font-size-base);
  color: var(--color-base-gray-900);
}

.button-primary {
  background-color: var(--color-brand-primary);
  color: white;
  font-weight: var(--font-weight-bold);
}`}
            language="css"
          />
          <p className="text-gray-700 dark:text-gray-300 mb-4 mt-6">
            Or use the JavaScript tokens in React or other frameworks:
          </p>
          <CodeBlock
            code={`import tokens from './build/js/tokens.js';

const Button = () => {
  return (
    <button
      style={{
        backgroundColor: tokens.color.brand.primary,
        fontFamily: tokens.font.family.sans,
        fontSize: tokens.font.size.base,
      }}
    >
      Click me
    </button>
  );
};`}
            language="javascript"
          />
        </section>

        {/* Section 10: Advanced configuration */}
        <section className="mb-12">
          <h2 className="text-2xl mb-4">Advanced configuration</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Style Dictionary supports custom transforms, formats, and filters. Here's an example of adding a custom transform for rem to px conversion:
          </p>
          <CodeBlock
            code={`// build-tokens.js
const StyleDictionary = require('style-dictionary');

StyleDictionary.registerTransform({
  name: 'size/pxToRem',
  type: 'value',
  matcher: (token) => token.attributes.category === 'size',
  transformer: (token) => {
    const baseFont = 16;
    const floatVal = parseFloat(token.value);

    if (isNaN(floatVal)) return token.value;

    if (token.value.endsWith('px')) {
      return \`\${floatVal / baseFont}rem\`;
    }

    return token.value;
  }
});

const sd = StyleDictionary.extend('config.json');
sd.buildAllPlatforms();`}
            language="javascript"
          />
          <p className="text-gray-700 dark:text-gray-300 mb-4 mt-6">
            Update your package.json to use the custom build script:
          </p>
          <CodeBlock
            code={`{
  "scripts": {
    "build": "node build-tokens.js"
  }
}`}
            language="json"
          />
        </section>

        {/* Section 11: Version control */}
        <section className="mb-12">
          <h2 className="text-2xl mb-4">Version control best practices</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Create a <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">.gitignore</code> file to exclude generated files:
          </p>
          <CodeBlock
            code={`# Dependencies
node_modules/

# Build output
build/

# macOS
.DS_Store

# Editor
.vscode/
.idea/`}
            language="bash"
          />
          <p className="text-gray-700 dark:text-gray-300 mb-4 mt-6">
            Commit your source tokens and configuration, but not the generated build files. Your CI/CD pipeline should rebuild tokens on deployment.
          </p>
        </section>

        {/* Section 12: Integration with design tools */}
        <section className="mb-12">
          <h2 className="text-2xl mb-4">Integration with design tools</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Style Dictionary works excellently with design tools like Figma. You can export design tokens from Figma using plugins and import them into your Style Dictionary project:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
            <li>Use the <a href="https://www.figma.com/community/plugin/888356646278934516" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline cursor-pointer">Design Tokens<span className="sr-only"> (opens in new tab)</span></a> Figma plugin to export tokens</li>
            <li>Place exported JSON files in your tokens directory</li>
            <li>Run your build command to transform them</li>
            <li>Import the generated files into your codebase</li>
          </ol>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            This creates a seamless design-to-code workflow where designers can update tokens in Figma and developers can pull the latest values.
          </p>
        </section>

        {/* Section 13: Resources */}
        <section className="mb-12">
          <h2 className="text-2xl mb-4">Additional resources</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Here are some helpful resources to learn more about Style Dictionary:
          </p>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <a href="https://amzn.github.io/style-dictionary/" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline cursor-pointer">
                Official Style Dictionary documentation<span className="sr-only"> (opens in new tab)</span>
              </a>
            </li>
            <li>
              <a href="https://github.com/amzn/style-dictionary" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline cursor-pointer">
                Style Dictionary on GitHub<span className="sr-only"> (opens in new tab)</span>
              </a>
            </li>
            <li>
              <a href="https://amzn.github.io/style-dictionary/#/examples" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline cursor-pointer">
                Example projects and templates<span className="sr-only"> (opens in new tab)</span>
              </a>
            </li>
            <li>
              <a href="https://www.designtokens.org/" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline cursor-pointer">
                Design Tokens Community Group<span className="sr-only"> (opens in new tab)</span>
              </a>
            </li>
          </ul>
        </section>

        {/* Final section */}
        <section className="mb-12 p-6 bg-gray-50 dark:bg-[#0f0f0f] border border-gray-200 dark:border-[#2a2a2a] rounded-lg">
          <h2 className="text-2xl mb-4">Next steps</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Now that you have Style Dictionary set up, you can:
          </p>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>• Expand your token definitions to include spacing, shadows, and animation values</li>
            <li>• Configure additional output platforms (iOS, Android, Flutter)</li>
            <li>• Set up automated builds in your CI/CD pipeline</li>
            <li>• Integrate with your design team's Figma workflow</li>
            <li>• Create component libraries that consume your design tokens</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

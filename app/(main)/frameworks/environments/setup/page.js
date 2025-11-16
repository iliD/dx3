export const metadata = {
  title: 'My Development Setup - Toolchain - designDesignsDesign',
  description: 'Personal development environment setup featuring Alacritty, VS Code, NeoVim, and Git.',
};

export default function EnvironmentsPage() {
  return (
    <div className="py-12 max-w-4xl" style={{ marginLeft: 'clamp(1.5rem, 8vw, 6rem)', marginRight: 'clamp(1.5rem, 4vw, 1.5rem)' }}>
      {/* Navigation */}
      <nav className="mb-8 p-4 bg-gray-50 dark:bg-[#0f0f0f] border border-gray-200 dark:border-[#2a2a2a] rounded-lg">
        <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3">Toolchain guides</h2>
        <ul className="space-y-2">
          <li>
            <a href="/frameworks/environments" className="text-gray-700 dark:text-gray-300 underline decoration-gray-400/50 dark:decoration-gray-500/50 hover:decoration-gray-700 dark:hover:decoration-gray-300 hover:text-black dark:hover:text-white transition-all cursor-pointer">
              Development environments
            </a>
          </li>
          <li>
            <span className="text-gray-900 dark:text-gray-100 font-medium">My development setup</span>
          </li>
          <li>
            <a href="/frameworks/toolchain" className="text-gray-700 dark:text-gray-300 underline decoration-gray-400/50 dark:decoration-gray-500/50 hover:decoration-gray-700 dark:hover:decoration-gray-300 hover:text-black dark:hover:text-white transition-all cursor-pointer">
              Mac terminal setup
            </a>
          </li>
          <li>
            <a href="/frameworks/styledictionary" className="text-gray-700 dark:text-gray-300 underline decoration-gray-400/50 dark:decoration-gray-500/50 hover:decoration-gray-700 dark:hover:decoration-gray-300 hover:text-black dark:hover:text-white transition-all cursor-pointer">
              Style Dictionary setup
            </a>
          </li>
        </ul>
      </nav>

      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl mb-4">My Development Setup</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          My personal development environment and workflow
        </p>
      </header>

      {/* Content */}
      <div className="prose prose-lg max-w-none space-y-12">

        {/* Visual Studio Code Section */}
        <section>
          <h2 className="text-2xl mb-4">Visual Studio Code</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-3">
            <a href="https://code.visualstudio.com" target="_blank" rel="noopener noreferrer" className="underline decoration-gray-400/50 dark:decoration-gray-500/50 hover:decoration-gray-700 dark:hover:decoration-gray-300 hover:text-black dark:hover:text-white transition-all cursor-pointer">Visual Studio Code<span className="sr-only"> (opens in new tab)</span></a> – Extensible code editor with rich ecosystem
          </p>
          <h4 className="text-lg mb-2 text-gray-900 dark:text-gray-100">Installed extensions</h4>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300 list-none">
                <li className="before:content-['–_'] before:text-gray-400"><a href="https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint" target="_blank" rel="noopener noreferrer" className="underline decoration-gray-400/50 dark:decoration-gray-500/50 hover:decoration-gray-700 dark:hover:decoration-gray-300 hover:text-black dark:hover:text-white transition-all cursor-pointer">ESLint<span className="sr-only"> (opens in new tab)</span></a> – Real-time linting feedback</li>
                <li className="before:content-['–_'] before:text-gray-400"><a href="https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode" target="_blank" rel="noopener noreferrer" className="underline decoration-gray-400/50 dark:decoration-gray-500/50 hover:decoration-gray-700 dark:hover:decoration-gray-300 hover:text-black dark:hover:text-white transition-all cursor-pointer">Prettier<span className="sr-only"> (opens in new tab)</span></a> – Automatic code formatting</li>
                <li className="before:content-['–_'] before:text-gray-400"><a href="https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens" target="_blank" rel="noopener noreferrer" className="underline decoration-gray-400/50 dark:decoration-gray-500/50 hover:decoration-gray-700 dark:hover:decoration-gray-300 hover:text-black dark:hover:text-white transition-all cursor-pointer">GitLens<span className="sr-only"> (opens in new tab)</span></a> – Enhanced Git integration</li>
                <li className="before:content-['–_'] before:text-gray-400"><a href="https://marketplace.visualstudio.com/items?itemName=monokai.theme-monokai-pro-vscode" target="_blank" rel="noopener noreferrer" className="underline decoration-gray-400/50 dark:decoration-gray-500/50 hover:decoration-gray-700 dark:hover:decoration-gray-300 hover:text-black dark:hover:text-white transition-all cursor-pointer">Monokai Pro<span className="sr-only"> (opens in new tab)</span></a> – Colour scheme</li>
                <li className="before:content-['–_'] before:text-gray-400"><a href="https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag" target="_blank" rel="noopener noreferrer" className="underline decoration-gray-400/50 dark:decoration-gray-500/50 hover:decoration-gray-700 dark:hover:decoration-gray-300 hover:text-black dark:hover:text-white transition-all cursor-pointer">Auto Rename Tag<span className="sr-only"> (opens in new tab)</span></a> – Automatically rename paired HTML/XML tags</li>
                <li className="before:content-['–_'] before:text-gray-400"><a href="https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense" target="_blank" rel="noopener noreferrer" className="underline decoration-gray-400/50 dark:decoration-gray-500/50 hover:decoration-gray-700 dark:hover:decoration-gray-300 hover:text-black dark:hover:text-white transition-all cursor-pointer">Path Intellisense<span className="sr-only"> (opens in new tab)</span></a> – Autocomplete for file paths</li>
                <li className="before:content-['–_'] before:text-gray-400"><a href="https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss" target="_blank" rel="noopener noreferrer" className="underline decoration-gray-400/50 dark:decoration-gray-500/50 hover:decoration-gray-700 dark:hover:decoration-gray-300 hover:text-black dark:hover:text-white transition-all cursor-pointer">Tailwind CSS IntelliSense<span className="sr-only"> (opens in new tab)</span></a> – Autocomplete for Tailwind classes</li>
                <li className="before:content-['–_'] before:text-gray-400"><a href="https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens" target="_blank" rel="noopener noreferrer" className="underline decoration-gray-400/50 dark:decoration-gray-500/50 hover:decoration-gray-700 dark:hover:decoration-gray-300 hover:text-black dark:hover:text-white transition-all cursor-pointer">Error Lens<span className="sr-only"> (opens in new tab)</span></a> – Highlight errors and warnings inline</li>
              </ul>
        </section>

        {/* Neovim Section */}
        <section>
          <h2 className="text-2xl mb-4">Neovim</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-3">
            <a href="https://neovim.io" target="_blank" rel="noopener noreferrer" className="underline decoration-gray-400/50 dark:decoration-gray-500/50 hover:decoration-gray-700 dark:hover:decoration-gray-300 hover:text-black dark:hover:text-white transition-all cursor-pointer">Neovim<span className="sr-only"> (opens in new tab)</span></a> – Hyperextensible Vim-based text editor configured with <a href="https://www.lazyvim.org" target="_blank" rel="noopener noreferrer" className="underline decoration-gray-400/50 dark:decoration-gray-500/50 hover:decoration-gray-700 dark:hover:decoration-gray-300 hover:text-black dark:hover:text-white transition-all cursor-pointer">LazyVim<span className="sr-only"> (opens in new tab)</span></a>
          </p>
          <h4 className="text-lg mb-2 text-gray-900 dark:text-gray-100">Key plugins</h4>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300 list-none">
                <li className="before:content-['–_'] before:text-gray-400"><a href="https://github.com/folke/lazy.nvim" target="_blank" rel="noopener noreferrer" className="underline decoration-gray-400/50 dark:decoration-gray-500/50 hover:decoration-gray-700 dark:hover:decoration-gray-300 hover:text-black dark:hover:text-white transition-all cursor-pointer">lazy.nvim<span className="sr-only"> (opens in new tab)</span></a> – Modern plugin manager</li>
                <li className="before:content-['–_'] before:text-gray-400"><a href="https://github.com/neovim/nvim-lspconfig" target="_blank" rel="noopener noreferrer" className="underline decoration-gray-400/50 dark:decoration-gray-500/50 hover:decoration-gray-700 dark:hover:decoration-gray-300 hover:text-black dark:hover:text-white transition-all cursor-pointer">nvim-lspconfig<span className="sr-only"> (opens in new tab)</span></a> – LSP configuration</li>
                <li className="before:content-['–_'] before:text-gray-400"><a href="https://github.com/nvim-treesitter/nvim-treesitter" target="_blank" rel="noopener noreferrer" className="underline decoration-gray-400/50 dark:decoration-gray-500/50 hover:decoration-gray-700 dark:hover:decoration-gray-300 hover:text-black dark:hover:text-white transition-all cursor-pointer">nvim-treesitter<span className="sr-only"> (opens in new tab)</span></a> – Syntax highlighting and code understanding</li>
                <li className="before:content-['–_'] before:text-gray-400"><a href="https://github.com/nvim-telescope/telescope.nvim" target="_blank" rel="noopener noreferrer" className="underline decoration-gray-400/50 dark:decoration-gray-500/50 hover:decoration-gray-700 dark:hover:decoration-gray-300 hover:text-black dark:hover:text-white transition-all cursor-pointer">telescope.nvim<span className="sr-only"> (opens in new tab)</span></a> – Fuzzy finder</li>
                <li className="before:content-['–_'] before:text-gray-400"><a href="https://github.com/nvim-neo-tree/neo-tree.nvim" target="_blank" rel="noopener noreferrer" className="underline decoration-gray-400/50 dark:decoration-gray-500/50 hover:decoration-gray-700 dark:hover:decoration-gray-300 hover:text-black dark:hover:text-white transition-all cursor-pointer">neo-tree.nvim<span className="sr-only"> (opens in new tab)</span></a> – File explorer</li>
                <li className="before:content-['–_'] before:text-gray-400"><a href="https://github.com/lewis6991/gitsigns.nvim" target="_blank" rel="noopener noreferrer" className="underline decoration-gray-400/50 dark:decoration-gray-500/50 hover:decoration-gray-700 dark:hover:decoration-gray-300 hover:text-black dark:hover:text-white transition-all cursor-pointer">gitsigns.nvim<span className="sr-only"> (opens in new tab)</span></a> – Git integration</li>
                <li className="before:content-['–_'] before:text-gray-400"><a href="https://github.com/williamboman/mason.nvim" target="_blank" rel="noopener noreferrer" className="underline decoration-gray-400/50 dark:decoration-gray-500/50 hover:decoration-gray-700 dark:hover:decoration-gray-300 hover:text-black dark:hover:text-white transition-all cursor-pointer">mason.nvim<span className="sr-only"> (opens in new tab)</span></a> – LSP/DAP/linter installer</li>
                <li className="before:content-['–_'] before:text-gray-400"><a href="https://github.com/Saghen/blink.cmp" target="_blank" rel="noopener noreferrer" className="underline decoration-gray-400/50 dark:decoration-gray-500/50 hover:decoration-gray-700 dark:hover:decoration-gray-300 hover:text-black dark:hover:text-white transition-all cursor-pointer">blink.cmp<span className="sr-only"> (opens in new tab)</span></a> – Completion engine</li>
                <li className="before:content-['–_'] before:text-gray-400"><a href="https://github.com/loctvl842/monokai-pro.nvim" target="_blank" rel="noopener noreferrer" className="underline decoration-gray-400/50 dark:decoration-gray-500/50 hover:decoration-gray-700 dark:hover:decoration-gray-300 hover:text-black dark:hover:text-white transition-all cursor-pointer">monokai-pro.nvim<span className="sr-only"> (opens in new tab)</span></a> – Colour scheme</li>
                <li className="before:content-['–_'] before:text-gray-400"><a href="https://github.com/folke/noice.nvim" target="_blank" rel="noopener noreferrer" className="underline decoration-gray-400/50 dark:decoration-gray-500/50 hover:decoration-gray-700 dark:hover:decoration-gray-300 hover:text-black dark:hover:text-white transition-all cursor-pointer">noice.nvim<span className="sr-only"> (opens in new tab)</span></a> – Enhanced UI for messages and command line</li>
              </ul>
        </section>

        {/* Terminal Section */}
        <section>
          <h2 className="text-2xl mb-4">Terminal</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-3">
            <a href="https://github.com/alacritty/alacritty" target="_blank" rel="noopener noreferrer" className="underline decoration-gray-400/50 dark:decoration-gray-500/50 hover:decoration-gray-700 dark:hover:decoration-gray-300 hover:text-black dark:hover:text-white transition-all cursor-pointer">Alacritty<span className="sr-only"> (opens in new tab)</span></a> – GPU-accelerated terminal emulator
          </p>
          <h4 className="text-lg mb-2 text-gray-900 dark:text-gray-100">Configuration</h4>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300 list-none">
            <li className="before:content-['–_'] before:text-gray-400">Monokai Pro – Colour scheme</li>
            <li className="before:content-['–_'] before:text-gray-400">JetBrainsMono Nerd Font Mono – Font (size 16)</li>
          </ul>
        </section>

        {/* Shell Section */}
        <section>
          <h2 className="text-2xl mb-4">Shell</h2>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300 list-none">
            <li className="before:content-['–_'] before:text-gray-400"><a href="https://www.zsh.org" target="_blank" rel="noopener noreferrer" className="underline decoration-gray-400/50 dark:decoration-gray-500/50 hover:decoration-gray-700 dark:hover:decoration-gray-300 hover:text-black dark:hover:text-white transition-all cursor-pointer">Zsh<span className="sr-only"> (opens in new tab)</span></a> with <a href="https://ohmyz.sh" target="_blank" rel="noopener noreferrer" className="underline decoration-gray-400/50 dark:decoration-gray-500/50 hover:decoration-gray-700 dark:hover:decoration-gray-300 hover:text-black dark:hover:text-white transition-all cursor-pointer">Oh My Zsh<span className="sr-only"> (opens in new tab)</span></a> – Shell framework</li>
            <li className="before:content-['–_'] before:text-gray-400"><a href="https://starship.rs" target="_blank" rel="noopener noreferrer" className="underline decoration-gray-400/50 dark:decoration-gray-500/50 hover:decoration-gray-700 dark:hover:decoration-gray-300 hover:text-black dark:hover:text-white transition-all cursor-pointer">Starship<span className="sr-only"> (opens in new tab)</span></a> – Cross-shell prompt</li>
          </ul>
        </section>

        {/* Package Managers Section */}
        <section>
          <h2 className="text-2xl mb-4">Package managers</h2>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300 list-none">
            <li className="before:content-['–_'] before:text-gray-400"><a href="https://www.npmjs.com" target="_blank" rel="noopener noreferrer" className="underline decoration-gray-400/50 dark:decoration-gray-500/50 hover:decoration-gray-700 dark:hover:decoration-gray-300 hover:text-black dark:hover:text-white transition-all cursor-pointer">npm<span className="sr-only"> (opens in new tab)</span></a> 11.6.0 – Node.js package manager</li>
            <li className="before:content-['–_'] before:text-gray-400"><a href="https://nodejs.org" target="_blank" rel="noopener noreferrer" className="underline decoration-gray-400/50 dark:decoration-gray-500/50 hover:decoration-gray-700 dark:hover:decoration-gray-300 hover:text-black dark:hover:text-white transition-all cursor-pointer">Node.js<span className="sr-only"> (opens in new tab)</span></a> 24.10.0 – JavaScript runtime</li>
            <li className="before:content-['–_'] before:text-gray-400"><a href="https://brew.sh" target="_blank" rel="noopener noreferrer" className="underline decoration-gray-400/50 dark:decoration-gray-500/50 hover:decoration-gray-700 dark:hover:decoration-gray-300 hover:text-black dark:hover:text-white transition-all cursor-pointer">Homebrew<span className="sr-only"> (opens in new tab)</span></a> 5.0.1 – Package manager for macOS</li>
          </ul>
        </section>

        {/* Version Control Section */}
        <section>
          <h2 className="text-2xl mb-4">Version control</h2>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300 list-none">
            <li className="before:content-['–_'] before:text-gray-400"><a href="https://git-scm.com" target="_blank" rel="noopener noreferrer" className="underline decoration-gray-400/50 dark:decoration-gray-500/50 hover:decoration-gray-700 dark:hover:decoration-gray-300 hover:text-black dark:hover:text-white transition-all cursor-pointer">Git<span className="sr-only"> (opens in new tab)</span></a> – Distributed version control system</li>
            <li className="before:content-['–_'] before:text-gray-400"><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="underline decoration-gray-400/50 dark:decoration-gray-500/50 hover:decoration-gray-700 dark:hover:decoration-gray-300 hover:text-black dark:hover:text-white transition-all cursor-pointer">GitHub<span className="sr-only"> (opens in new tab)</span></a> – Git hosting and collaboration platform</li>
            <li className="before:content-['–_'] before:text-gray-400"><a href="https://www.gitkraken.com" target="_blank" rel="noopener noreferrer" className="underline decoration-gray-400/50 dark:decoration-gray-500/50 hover:decoration-gray-700 dark:hover:decoration-gray-300 hover:text-black dark:hover:text-white transition-all cursor-pointer">GitKraken<span className="sr-only"> (opens in new tab)</span></a> – Cross-platform Git GUI</li>
          </ul>
        </section>

        {/* Dotfiles Section */}
        <section>
          <div className="p-8 border border-gray-200 dark:border-[#2a2a2a] rounded-lg">
            <div className="flex items-start gap-4">
              <svg className="w-8 h-8 text-gray-900 dark:text-gray-100 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              <div className="flex-1">
                <h2 className="text-xl text-gray-900 dark:text-gray-100 mb-3">.dotfiles</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  Configuration files for my development environment
                </p>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300 mb-4">
                  <li><a href="https://github.com/alacritty/alacritty" target="_blank" rel="noopener noreferrer" className="underline decoration-gray-400/50 dark:decoration-gray-500/50 hover:decoration-gray-700 dark:hover:decoration-gray-300 hover:text-black dark:hover:text-white transition-all cursor-pointer">Alacritty configuration<span className="sr-only"> (opens in new tab)</span></a></li>
                </ul>
                <a
                  href="https://github.com/yourusername/dotfiles"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white cursor-pointer"
                >
                  <span className="underline hover:no-underline">View on GitHub</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span className="sr-only"> (opens in new tab)</span>
                </a>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

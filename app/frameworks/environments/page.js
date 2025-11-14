export const metadata = {
  title: 'Development Environments - Toolchain - designDesignsDesign',
  description: 'Overview of development environment setup and configuration for modern web development.',
};

export default function EnvironmentsPage() {
  return (
    <div className="py-12 max-w-4xl" style={{ marginLeft: 'clamp(1.5rem, 8vw, 6rem)', marginRight: 'clamp(1.5rem, 4vw, 1.5rem)' }}>
      {/* Navigation */}
      <nav className="mb-8 p-4 bg-gray-50 dark:bg-[#0f0f0f] border border-gray-200 dark:border-[#2a2a2a] rounded-lg">
        <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3">Toolchain guides</h2>
        <ul className="space-y-2">
          <li>
            <span className="text-gray-900 dark:text-gray-100 font-medium">Development environments</span>
          </li>
          <li>
            <a href="/frameworks/environments/setup" className="text-gray-700 dark:text-gray-300 underline hover:no-underline hover:text-black dark:hover:text-white cursor-pointer">
              My development setup
            </a>
          </li>
          <li>
            <a href="/frameworks/toolchain" className="text-gray-700 dark:text-gray-300 underline hover:no-underline hover:text-black dark:hover:text-white cursor-pointer">
              Mac terminal setup
            </a>
          </li>
          <li>
            <a href="/frameworks/styledictionary" className="text-gray-700 dark:text-gray-300 underline hover:no-underline hover:text-black dark:hover:text-white cursor-pointer">
              Style Dictionary setup
            </a>
          </li>
        </ul>
      </nav>

      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl mb-4">Development Environments</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Essential tools and configurations for setting up a modern development environment
        </p>
      </header>

      {/* Content */}
      <div className="prose prose-lg max-w-none space-y-12">

        {/* Section 1 */}
        <section>
          <h2 className="text-2xl mb-6">Terminals</h2>

          {/* OS Icons */}
          <div className="flex items-center gap-8 mb-8">
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-gray-900 dark:text-gray-100" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <span className="text-sm text-gray-700 dark:text-gray-300">macOS</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-gray-900 dark:text-gray-100" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.84-.415 1.917-.485 2.828-.101 1.351.101 2.727.735 3.677 1.305 1.955 4.456 2.113 6.157 2.113h.765c1.704 0 4.851-.159 6.157-2.113.634-.95.836-2.326.735-3.677-.07-.91-.207-1.987-.485-2.828-.59-1.771-1.831-3.47-2.716-4.521-.75-1.067-.974-1.928-1.05-3.02-.065-1.491 1.056-5.965-3.17-6.298-.165-.013-.325-.021-.48-.021zm-5.632 5.998c.002 0 .006-.003.009-.003.26.003.509.127.671.334.311.397.427.91.434 1.406.012.757.129 1.555.532 2.309.179.335.535.531.832.531.173 0 .349-.049.506-.156.47-.318.59-.96.264-1.427-.297-.426-.398-1.003-.409-1.544-.007-.421-.083-.834-.333-1.182-.396-.55-1.214-.701-1.825-.305-.611.396-.761 1.214-.365 1.825.177.247.424.415.684.212z"/>
              </svg>
              <span className="text-sm text-gray-700 dark:text-gray-300">Linux</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-gray-900 dark:text-gray-100" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M0 12v12h11.375C7.375 24 4.125 20.75 4.125 16.75S7.375 9.5 11.375 9.5H24V0H11.375C5.062 0 0 5.062 0 11.375V12zm12.125 10.5c-3.656 0-6.625-2.969-6.625-6.625S8.469 9.25 12.125 9.25h10.25v13.25h-10.25z"/>
              </svg>
              <span className="text-sm text-gray-700 dark:text-gray-300">Unix</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-gray-900 dark:text-gray-100" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M0 12.357l5.643 3.255 2.1-2.1 8.636 4.989v-7.714l-5.643-3.254-2.1 2.1-8.636-4.988v7.712zm24 0l-5.643 3.255-2.1-2.1-8.636 4.989v-7.714l5.643-3.254 2.1 2.1 8.636-4.988v7.712z"/>
              </svg>
              <span className="text-sm text-gray-700 dark:text-gray-300">Windows</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* macOS Column */}
            <div>
              <h3 className="text-lg mb-4 text-gray-900 dark:text-gray-100">macOS</h3>
              <ol className="space-y-2 text-gray-700 dark:text-gray-300 list-none">
                <li><a href="https://iterm2.com" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline hover:text-black dark:hover:text-white cursor-pointer">iTerm2<span className="sr-only"> (opens in new tab)</span></a></li>
                <li><a href="https://sw.kovidgoyal.net/kitty/" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline hover:text-black dark:hover:text-white cursor-pointer">Kitty<span className="sr-only"> (opens in new tab)</span></a></li>
                <li><a href="https://github.com/alacritty/alacritty" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline hover:text-black dark:hover:text-white cursor-pointer">Alacritty<span className="sr-only"> (opens in new tab)</span></a></li>
                <li><a href="https://www.warp.dev" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline hover:text-black dark:hover:text-white cursor-pointer">Warp<span className="sr-only"> (opens in new tab)</span></a></li>
                <li><a href="https://hyper.is" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline hover:text-black dark:hover:text-white cursor-pointer">Hyper<span className="sr-only"> (opens in new tab)</span></a></li>
                <li><a href="https://tabby.sh" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline hover:text-black dark:hover:text-white cursor-pointer">Tabby<span className="sr-only"> (opens in new tab)</span></a></li>
                <li><a href="https://www.wezfurlong.org/wezterm/" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline hover:text-black dark:hover:text-white cursor-pointer">WezTerm<span className="sr-only"> (opens in new tab)</span></a></li>
                <li><a href="https://rio.sh" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline hover:text-black dark:hover:text-white cursor-pointer">Rio<span className="sr-only"> (opens in new tab)</span></a></li>
                <li><a href="https://github.com/warp-tech/ghostty" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline hover:text-black dark:hover:text-white cursor-pointer">Ghostty<span className="sr-only"> (opens in new tab)</span></a></li>
              </ol>
            </div>

            {/* Linux Column */}
            <div>
              <h3 className="text-lg mb-4 text-gray-900 dark:text-gray-100">Linux</h3>
              <ol className="space-y-2 text-gray-700 dark:text-gray-300 list-none">
                <li><a href="https://wiki.gnome.org/Apps/Terminal" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline hover:text-black dark:hover:text-white cursor-pointer">GNOME Terminal<span className="sr-only"> (opens in new tab)</span></a></li>
                <li><a href="https://sw.kovidgoyal.net/kitty/" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline hover:text-black dark:hover:text-white cursor-pointer">Kitty<span className="sr-only"> (opens in new tab)</span></a></li>
                <li><a href="https://github.com/alacritty/alacritty" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline hover:text-black dark:hover:text-white cursor-pointer">Alacritty<span className="sr-only"> (opens in new tab)</span></a></li>
                <li><a href="https://konsole.kde.org" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline hover:text-black dark:hover:text-white cursor-pointer">Konsole<span className="sr-only"> (opens in new tab)</span></a></li>
                <li><a href="https://gnome-terminator.org" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline hover:text-black dark:hover:text-white cursor-pointer">Terminator<span className="sr-only"> (opens in new tab)</span></a></li>
                <li><a href="https://www.wezfurlong.org/wezterm/" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline hover:text-black dark:hover:text-white cursor-pointer">WezTerm<span className="sr-only"> (opens in new tab)</span></a></li>
                <li><a href="https://gnunn1.github.io/tilix-web/" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline hover:text-black dark:hover:text-white cursor-pointer">Tilix<span className="sr-only"> (opens in new tab)</span></a></li>
                <li><a href="http://software.schmorp.de/pkg/rxvt-unicode.html" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline hover:text-black dark:hover:text-white cursor-pointer">URxvt<span className="sr-only"> (opens in new tab)</span></a></li>
                <li><a href="https://invisible-island.net/xterm/" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline hover:text-black dark:hover:text-white cursor-pointer">xterm<span className="sr-only"> (opens in new tab)</span></a></li>
              </ol>
            </div>

            {/* Windows Column */}
            <div>
              <h3 className="text-lg mb-4 text-gray-900 dark:text-gray-100">Windows</h3>
              <ol className="space-y-2 text-gray-700 dark:text-gray-300 list-none">
                <li><a href="https://github.com/microsoft/terminal" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline hover:text-black dark:hover:text-white cursor-pointer">Windows Terminal<span className="sr-only"> (opens in new tab)</span></a></li>
                <li><a href="https://www.wezfurlong.org/wezterm/" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline hover:text-black dark:hover:text-white cursor-pointer">WezTerm<span className="sr-only"> (opens in new tab)</span></a></li>
                <li><a href="https://github.com/alacritty/alacritty" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline hover:text-black dark:hover:text-white cursor-pointer">Alacritty<span className="sr-only"> (opens in new tab)</span></a></li>
                <li><a href="https://hyper.is" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline hover:text-black dark:hover:text-white cursor-pointer">Hyper<span className="sr-only"> (opens in new tab)</span></a></li>
                <li><a href="https://www.chiark.greenend.org.uk/~sgtatham/putty/" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline hover:text-black dark:hover:text-white cursor-pointer">PuTTY<span className="sr-only"> (opens in new tab)</span></a></li>
                <li><a href="https://conemu.github.io" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline hover:text-black dark:hover:text-white cursor-pointer">ConEmu<span className="sr-only"> (opens in new tab)</span></a></li>
                <li><a href="https://cmder.app" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline hover:text-black dark:hover:text-white cursor-pointer">Cmder<span className="sr-only"> (opens in new tab)</span></a></li>
                <li><a href="https://mobaxterm.mobatek.net" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline hover:text-black dark:hover:text-white cursor-pointer">MobaXterm<span className="sr-only"> (opens in new tab)</span></a></li>
                <li><a href="https://learn.microsoft.com/en-us/powershell/" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline hover:text-black dark:hover:text-white cursor-pointer">PowerShell<span className="sr-only"> (opens in new tab)</span></a></li>
                <li><a href="https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/windows-commands" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline hover:text-black dark:hover:text-white cursor-pointer">Command Prompt<span className="sr-only"> (opens in new tab)</span></a></li>
              </ol>
            </div>
          </div>
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
                  Configuration files for terminal environments
                </p>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300 mb-4">
                  <li><a href="https://iterm2.com" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline hover:text-black dark:hover:text-white cursor-pointer">iTerm2<span className="sr-only"> (opens in new tab)</span></a></li>
                  <li><a href="https://github.com/alacritty/alacritty" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline hover:text-black dark:hover:text-white cursor-pointer">Alacritty<span className="sr-only"> (opens in new tab)</span></a></li>
                  <li><a href="https://www.wezfurlong.org/wezterm/" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline hover:text-black dark:hover:text-white cursor-pointer">WezTerm<span className="sr-only"> (opens in new tab)</span></a></li>
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

        {/* Section 2 */}
        <section>
          <h2 className="text-2xl mb-4">Essential tools</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl mb-3">IDE</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li><a href="https://code.visualstudio.com" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline hover:text-black dark:hover:text-white cursor-pointer">Visual Studio Code<span className="sr-only"> (opens in new tab)</span></a> - Extensible code editor with rich ecosystem</li>
                <li><a href="https://www.cursor.com" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline hover:text-black dark:hover:text-white cursor-pointer">Cursor<span className="sr-only"> (opens in new tab)</span></a> - AI-powered code editor</li>
                <li><a href="https://www.jetbrains.com/webstorm/" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline hover:text-black dark:hover:text-white cursor-pointer">WebStorm<span className="sr-only"> (opens in new tab)</span></a> - Full-featured IDE for JavaScript development</li>
                <li><a href="https://www.jetbrains.com/idea/" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline hover:text-black dark:hover:text-white cursor-pointer">IntelliJ IDEA<span className="sr-only"> (opens in new tab)</span></a> - Powerful IDE for Java and polyglot development</li>
                <li><a href="https://www.sublimetext.com" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline hover:text-black dark:hover:text-white cursor-pointer">Sublime Text<span className="sr-only"> (opens in new tab)</span></a> - Fast, lightweight text editor</li>
                <li><a href="https://zed.dev" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline hover:text-black dark:hover:text-white cursor-pointer">Zed<span className="sr-only"> (opens in new tab)</span></a> - High-performance multiplayer code editor</li>
                <li><a href="https://pulsar-edit.dev" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline hover:text-black dark:hover:text-white cursor-pointer">Pulsar<span className="sr-only"> (opens in new tab)</span></a> - Community-led continuation of Atom editor</li>
                <li><a href="https://codeium.com/windsurf" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline hover:text-black dark:hover:text-white cursor-pointer">Windsurf<span className="sr-only"> (opens in new tab)</span></a> - AI-native IDE by Codeium</li>
                <li><a href="https://www.barebones.com/products/bbedit/" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline hover:text-black dark:hover:text-white cursor-pointer">BBEdit<span className="sr-only"> (opens in new tab)</span></a> - Professional text and code editor for macOS</li>
                <li><a href="https://nova.app" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline hover:text-black dark:hover:text-white cursor-pointer">Nova<span className="sr-only"> (opens in new tab)</span></a> - Native macOS code editor</li>
                <li><a href="https://brackets.io" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline hover:text-black dark:hover:text-white cursor-pointer">Brackets<span className="sr-only"> (opens in new tab)</span></a> - Modern, open-source text editor for web design</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl mb-3">Text editors</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li><a href="https://neovim.io" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline hover:text-black dark:hover:text-white cursor-pointer">Neovim<span className="sr-only"> (opens in new tab)</span></a> - Hyperextensible Vim-based text editor</li>
                <li><a href="https://www.vim.org" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline hover:text-black dark:hover:text-white cursor-pointer">Vim<span className="sr-only"> (opens in new tab)</span></a> - Highly configurable text editor</li>
                <li><a href="https://www.gnu.org/software/emacs/" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline hover:text-black dark:hover:text-white cursor-pointer">Emacs<span className="sr-only"> (opens in new tab)</span></a> - Extensible, customisable text editor</li>
                <li><a href="https://kakoune.org" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline hover:text-black dark:hover:text-white cursor-pointer">Kakoune<span className="sr-only"> (opens in new tab)</span></a> - Modal editor with multiple selections</li>
                <li><a href="https://helix-editor.com" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline hover:text-black dark:hover:text-white cursor-pointer">Helix<span className="sr-only"> (opens in new tab)</span></a> - Post-modern modal text editor</li>
                <li><a href="https://micro-editor.github.io" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline hover:text-black dark:hover:text-white cursor-pointer">Micro<span className="sr-only"> (opens in new tab)</span></a> - Modern terminal-based text editor</li>
                <li><a href="https://www.nano-editor.org" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline hover:text-black dark:hover:text-white cursor-pointer">Nano<span className="sr-only"> (opens in new tab)</span></a> - Simple, user-friendly text editor</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl mb-3">Terminal</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li><a href="/frameworks/toolchain" className="underline hover:no-underline hover:text-black dark:hover:text-white cursor-pointer">iTerm2 setup guide</a> - Enhanced terminal emulator for macOS</li>
                <li><a href="https://hyper.is" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline hover:text-black dark:hover:text-white cursor-pointer">Hyper<span className="sr-only"> (opens in new tab)</span></a> - Cross-platform terminal built with web technologies</li>
                <li><a href="https://github.com/alacritty/alacritty" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline hover:text-black dark:hover:text-white cursor-pointer">Alacritty<span className="sr-only"> (opens in new tab)</span></a> - GPU-accelerated terminal emulator</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl mb-3">Version control</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li><a href="https://git-scm.com" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline hover:text-black dark:hover:text-white cursor-pointer">Git<span className="sr-only"> (opens in new tab)</span></a> - Distributed version control system</li>
                <li><a href="https://subversion.apache.org" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline hover:text-black dark:hover:text-white cursor-pointer">Subversion (SVN)<span className="sr-only"> (opens in new tab)</span></a> - Centralised version control system</li>
                <li><a href="https://www.mercurial-scm.org" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline hover:text-black dark:hover:text-white cursor-pointer">Mercurial<span className="sr-only"> (opens in new tab)</span></a> - Distributed version control system</li>
                <li><a href="https://www.perforce.com" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline hover:text-black dark:hover:text-white cursor-pointer">Perforce<span className="sr-only"> (opens in new tab)</span></a> - Enterprise version control and collaboration</li>
                <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline hover:text-black dark:hover:text-white cursor-pointer">GitHub<span className="sr-only"> (opens in new tab)</span></a> - Git hosting and collaboration platform</li>
                <li><a href="https://gitlab.com" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline hover:text-black dark:hover:text-white cursor-pointer">GitLab<span className="sr-only"> (opens in new tab)</span></a> - DevOps platform with Git repository management</li>
                <li><a href="https://bitbucket.org" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline hover:text-black dark:hover:text-white cursor-pointer">Bitbucket<span className="sr-only"> (opens in new tab)</span></a> - Git solution for teams using Jira</li>
                <li><a href="https://azure.microsoft.com/en-gb/products/devops" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline hover:text-black dark:hover:text-white cursor-pointer">Azure DevOps<span className="sr-only"> (opens in new tab)</span></a> - Microsoft's DevOps tooling with Git repos</li>
                <li><a href="https://www.sourcetreeapp.com" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline hover:text-black dark:hover:text-white cursor-pointer">Sourcetree<span className="sr-only"> (opens in new tab)</span></a> - Visual Git client</li>
                <li><a href="https://www.gitkraken.com" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline hover:text-black dark:hover:text-white cursor-pointer">GitKraken<span className="sr-only"> (opens in new tab)</span></a> - Cross-platform Git GUI</li>
                <li><a href="https://desktop.github.com" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline hover:text-black dark:hover:text-white cursor-pointer">GitHub Desktop<span className="sr-only"> (opens in new tab)</span></a> - Simplified Git workflow for GitHub</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section>
          <h2 className="text-2xl mb-4">Runtime environments</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl mb-3">Node.js</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                JavaScript runtime environment for building server-side and command-line tools.
              </p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li><a href="https://nodejs.org" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline hover:text-black dark:hover:text-white cursor-pointer">Node.js<span className="sr-only"> (opens in new tab)</span></a> - Install LTS version for stability</li>
                <li><a href="https://github.com/nvm-sh/nvm" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline hover:text-black dark:hover:text-white cursor-pointer">nvm<span className="sr-only"> (opens in new tab)</span></a> - Node Version Manager for managing multiple Node versions</li>
                <li><a href="https://pnpm.io" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline hover:text-black dark:hover:text-white cursor-pointer">pnpm<span className="sr-only"> (opens in new tab)</span></a> - Fast, disk space efficient package manager</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl mb-3">Package managers</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li><a href="https://www.npmjs.com" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline hover:text-black dark:hover:text-white cursor-pointer">npm<span className="sr-only"> (opens in new tab)</span></a> - Default Node.js package manager</li>
                <li><a href="https://yarnpkg.com" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline hover:text-black dark:hover:text-white cursor-pointer">Yarn<span className="sr-only"> (opens in new tab)</span></a> - Alternative package manager with improved performance</li>
                <li><a href="https://brew.sh" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline hover:text-black dark:hover:text-white cursor-pointer">Homebrew<span className="sr-only"> (opens in new tab)</span></a> - Package manager for macOS</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section>
          <h2 className="text-2xl mb-4">Development workflow</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl mb-3">Local development servers</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li><a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline hover:text-black dark:hover:text-white cursor-pointer">Vite<span className="sr-only"> (opens in new tab)</span></a> - Fast development server with hot module replacement</li>
                <li><a href="https://nextjs.org" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline hover:text-black dark:hover:text-white cursor-pointer">Next.js<span className="sr-only"> (opens in new tab)</span></a> - React framework with built-in development server</li>
                <li><a href="https://webpack.js.org/configuration/dev-server/" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline hover:text-black dark:hover:text-white cursor-pointer">webpack-dev-server<span className="sr-only"> (opens in new tab)</span></a> - Development server for webpack projects</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl mb-3">Code quality tools</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li><a href="https://eslint.org" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline hover:text-black dark:hover:text-white cursor-pointer">ESLint<span className="sr-only"> (opens in new tab)</span></a> - JavaScript linting and code quality</li>
                <li><a href="https://prettier.io" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline hover:text-black dark:hover:text-white cursor-pointer">Prettier<span className="sr-only"> (opens in new tab)</span></a> - Opinionated code formatter</li>
                <li><a href="https://www.typescriptlang.org" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline hover:text-black dark:hover:text-white cursor-pointer">TypeScript<span className="sr-only"> (opens in new tab)</span></a> - Static type checking for JavaScript</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl mb-3">Testing frameworks</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li><a href="https://vitest.dev" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline hover:text-black dark:hover:text-white cursor-pointer">Vitest<span className="sr-only"> (opens in new tab)</span></a> - Fast unit testing framework</li>
                <li><a href="https://jestjs.io" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline hover:text-black dark:hover:text-white cursor-pointer">Jest<span className="sr-only"> (opens in new tab)</span></a> - Comprehensive JavaScript testing solution</li>
                <li><a href="https://playwright.dev" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline hover:text-black dark:hover:text-white cursor-pointer">Playwright<span className="sr-only"> (opens in new tab)</span></a> - End-to-end testing for web applications</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 5 */}
        <section>
          <h2 className="text-2xl mb-4">Browser development tools</h2>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li><a href="https://developer.chrome.com/docs/devtools/" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline hover:text-black dark:hover:text-white cursor-pointer">Chrome DevTools<span className="sr-only"> (opens in new tab)</span></a> - Built-in browser debugging tools</li>
            <li><a href="https://react.dev/learn/react-developer-tools" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline hover:text-black dark:hover:text-white cursor-pointer">React Developer Tools<span className="sr-only"> (opens in new tab)</span></a> - Browser extension for React debugging</li>
            <li><a href="https://github.com/zalmoxisus/redux-devtools-extension" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline hover:text-black dark:hover:text-white cursor-pointer">Redux DevTools<span className="sr-only"> (opens in new tab)</span></a> - State management debugging</li>
          </ul>
        </section>

        {/* Section 6 */}
        <section>
          <h2 className="text-2xl mb-4">Environment configuration</h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              Properly configuring environment variables is crucial for managing sensitive data and environment-specific settings.
            </p>
            <ul className="space-y-2">
              <li>Use <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">.env</code> files for local development</li>
              <li>Never commit sensitive credentials to version control</li>
              <li>Use <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">.env.example</code> to document required variables</li>
              <li>Leverage platform-specific environment management (Vercel, Netlify, etc.)</li>
            </ul>
          </div>
        </section>

        {/* Section 7 */}
        <section>
          <h2 className="text-2xl mb-4">Recommended VS Code extensions</h2>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>ESLint - Real-time linting feedback</li>
            <li>Prettier - Automatic code formatting</li>
            <li>GitLens - Enhanced Git integration</li>
            <li>Auto Rename Tag - Automatically rename paired HTML/XML tags</li>
            <li>Path Intellisense - Autocomplete for file paths</li>
            <li>Tailwind CSS IntelliSense - Autocomplete for Tailwind classes</li>
            <li>Error Lens - Highlight errors and warnings inline</li>
          </ul>
        </section>

        {/* Section 8 */}
        <section>
          <h2 className="text-2xl mb-4">Next steps</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            With your development environment configured, explore our other toolchain guides:
          </p>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <a href="/frameworks/toolchain" className="underline hover:no-underline hover:text-black dark:hover:text-white cursor-pointer">
                Mac terminal setup
              </a> - Configure iTerm2, Oh My Zsh, and PowerLevel10K
            </li>
            <li>
              <a href="/frameworks/styledictionary" className="underline hover:no-underline hover:text-black dark:hover:text-white cursor-pointer">
                Style Dictionary setup
              </a> - Design token management system
            </li>
          </ul>
        </section>

      </div>
    </div>
  );
}

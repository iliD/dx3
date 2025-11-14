import CodeBlock from '@/components/CodeBlock';

export const metadata = {
  title: 'How to setup your Mac terminal - Toolchain - designDesignsDesign',
  description: 'Complete guide to setting up a modern Mac terminal with iTerm2, Oh My Zsh, and PowerLevel10K.',
};

export default function ToolchainPage() {
  return (
    <div className="py-12 max-w-4xl" style={{ marginLeft: 'clamp(1.5rem, 8vw, 6rem)', marginRight: 'clamp(1.5rem, 4vw, 1.5rem)' }}>
      {/* Navigation */}
      <nav className="mb-8 p-4 bg-gray-50 dark:bg-[#0f0f0f] border border-gray-200 dark:border-[#2a2a2a] rounded-lg">
        <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3">Toolchain guides</h2>
        <ul className="space-y-2">
          <li>
            <span className="text-gray-900 dark:text-gray-100 font-medium">Mac terminal setup</span>
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
        <h1 className="text-4xl mb-4">How to setup your Mac terminal</h1>
      </header>

      {/* Content */}
      <div className="prose prose-lg max-w-none space-y-12">

        {/* Section 1 */}
        <section>
          <h2 className="text-xl mb-4">Install Homebrew</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Initial package manager installation for macOS.
          </p>
          <CodeBlock code='/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"' />
        </section>

        {/* Section 2 */}
        <section>
          <h2 className="text-xl mb-4">Add Homebrew to path</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Configure shell environment to recognise Homebrew (replace [username] with actual username).
          </p>
          <CodeBlock code={`echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' > /Users/[username]/.zprofile\neval "$(/opt/homebrew/bin/brew shellenv)"`} />
        </section>

        {/* Section 3 */}
        <section>
          <h2 className="text-xl mb-4">Install iTerm2</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            To install terminal emulator via Homebrew, run:
          </p>
          <CodeBlock code="brew install --cask iterm2" />
        </section>

        {/* Section 4 */}
        <section>
          <h2 className="text-xl mb-4">Install Git</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Version control system installation if not already present.
          </p>
          <CodeBlock code="brew install git" />
        </section>

        {/* Section 5 */}
        <section>
          <h2 className="text-xl mb-4">Install Oh My Zsh</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Shell framework for enhanced zsh configuration.
          </p>
          <CodeBlock code='sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"' />
        </section>

        {/* Section 6 */}
        <section>
          <h2 className="text-xl mb-4">Install PowerLevel10K theme</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Clone theme repository and modify <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">~/.zshrc</code> configuration file.
          </p>
          <CodeBlock code="git clone https://github.com/romkatv/powerlevel10k.git $ZSH_CUSTOM/themes/powerlevel10k" />
          <p className="text-gray-700 dark:text-gray-300 mb-4 mt-4">
            Update configuration:
          </p>
          <CodeBlock code='ZSH_THEME="powerlevel10k/powerlevel10k"' />
          <p className="text-gray-700 dark:text-gray-300 mb-4 mt-4">
            Reload configuration:
          </p>
          <CodeBlock code="source ~/.zshrc" />
        </section>

        {/* Section 7 */}
        <section>
          <h2 className="text-xl mb-4">Install Meslo Nerd Font</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Font installation requiring user confirmation; restart iTerm2 afterward.
          </p>
        </section>

        {/* Section 8 */}
        <section>
          <h2 className="text-xl mb-4">Update VSCode terminal font (Optional)</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Modify VSCode settings for consistent font display. Add to your settings.json:
          </p>
          <CodeBlock code='"terminal.integrated.fontFamily": "MesloLGS NF"' />
        </section>

        {/* Section 9 */}
        <section>
          <h2 className="text-xl mb-4">Configure PowerLevel10K</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Interactive configuration setup; restart iTerm2 or execute configuration command:
          </p>
          <CodeBlock code="p10k configure" />
        </section>

        {/* Section 10 */}
        <section>
          <h2 className="text-xl mb-4">Increase terminal font size</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li>Open iTerm2 preferences</li>
            <li>Navigate to Profiles {'>'} Text</li>
            <li>Adjust font size (recommended: ~20px)</li>
          </ol>
        </section>

        {/* Section 11 */}
        <section>
          <h2 className="text-xl mb-4">Change iTerm2 colours</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Apply custom colour profile download and configuration:
          </p>
          <CodeBlock code="curl https://raw.githubusercontent.com/josean-dev/dev-environment-files/main/coolnight.itermcolors --output ~/Downloads/coolnight.itermcolors" />
          <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300 mt-4">
            <li>Open iTerm2 preferences</li>
            <li>Go to Profiles {'>'} Colours</li>
            <li>Import coolnight.itermcolors file</li>
            <li>Select imported profile</li>
          </ol>
        </section>

        {/* Section 12 */}
        <section>
          <h2 className="text-xl mb-4">Install ZSH plugins</h2>

          <p className="text-gray-700 dark:text-gray-300 mb-4 font-semibold">
            zsh-autosuggestions:
          </p>
          <CodeBlock code="git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions" />

          <p className="text-gray-700 dark:text-gray-300 mb-4 mt-6 font-semibold">
            zsh-syntax-highlighting:
          </p>
          <CodeBlock code="git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting" />

          <p className="text-gray-700 dark:text-gray-300 mb-4 mt-6">
            Update configuration in <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">~/.zshrc</code>:
          </p>
          <CodeBlock code="plugins=(git zsh-autosuggestions zsh-syntax-highlighting web-search)" />

          <p className="text-gray-700 dark:text-gray-300 mb-4 mt-6">
            Reload configuration:
          </p>
          <CodeBlock code="source ~/.zshrc" />
        </section>

        {/* Section 13 */}
        <section>
          <h2 className="text-xl mb-4">You're done!</h2>
          <p className="text-gray-700 dark:text-gray-300">
            Your terminal setup is now complete with an improved development experience.
          </p>
        </section>

      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { codeToHtml } from 'shiki';

export default function CodeBlock({ code, language = 'bash' }) {
  const [copied, setCopied] = useState(false);
  const [html, setHtml] = useState('');
  const { theme } = useTheme();

  useEffect(() => {
    async function highlightCode() {
      try {
        const highlighted = await codeToHtml(code, {
          lang: language,
          theme: theme === 'dark' ? 'github-dark' : 'github-light',
        });
        setHtml(highlighted);
      } catch (err) {
        console.error('Syntax highlighting failed:', err);
        // Fallback to plain code
        const isDark = theme === 'dark';
        setHtml(`<pre class="shiki ${isDark ? 'github-dark' : 'github-light'}" style="background-color:${isDark ? '#0d1117' : '#ffffff'};color:${isDark ? '#c9d1d9' : '#24292f'}"><code>${code}</code></pre>`);
      }
    }
    highlightCode();
  }, [code, language, theme]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="relative group">
      <div
        className="border border-gray-200 dark:border-[#2a2a2a] rounded-lg overflow-x-auto [&>pre]:!m-0 [&>pre]:!p-4 [&>pre]:!bg-transparent"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 px-3 py-1.5 text-xs font-medium bg-white dark:bg-[#2a2a2a] border border-gray-300 dark:border-[#3a3a3a] rounded-md hover:bg-gray-50 dark:hover:bg-[#3a3a3a] transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 shadow-sm cursor-pointer"
        aria-label="Copy code"
      >
        {copied ? (
          <span className="flex items-center gap-1.5 text-green-700 dark:text-green-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Copied!
          </span>
        ) : (
          <span className="flex items-center gap-1.5 text-gray-700 dark:text-gray-300">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Copy
          </span>
        )}
      </button>
    </div>
  );
}

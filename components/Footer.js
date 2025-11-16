'use client';

export default function Footer() {
  return (
    <footer className="w-full bg-white dark:bg-[#1a1a1a] border-t border-gray-200 dark:border-gray-800 py-8">
      <div style={{ marginLeft: 'clamp(1.5rem, 8vw, 6rem)', marginRight: 'clamp(1.5rem, 4vw, 1.5rem)' }}>
        <div className="font-mono text-sm space-y-2">
          <div>designDesignsDesign</div>
          <div>London</div>
          <div>Mon – Fri: 9 – 5</div>
        </div>
      </div>
    </footer>
  );
}

'use client';

export default function Footer() {
  return (
    <footer className="w-full bg-white dark:bg-[#1a1a1a] border-t border-gray-200 dark:border-gray-800 py-8">
      <div style={{ marginLeft: 'clamp(1.5rem, 8vw, 6rem)', marginRight: 'clamp(1.5rem, 8vw, 6rem)' }}>
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          {/* Info Section */}
          <div className="font-mono text-sm space-y-2">
            <div>designDesignsDesign</div>
            <div>London</div>
            <div>Mon – Fri: 9 – 5</div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity"
              aria-label="YouTube"
            >
              <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.50001 17C1.80143 13.7033 1.80143 10.2967 2.50001 7C2.5918 6.66521 2.76914 6.36007 3.01461 6.11461C3.26008 5.86914 3.56522 5.69179 3.90001 5.6C9.26346 4.71146 14.7366 4.71146 20.1 5.6C20.4348 5.69179 20.7399 5.86914 20.9854 6.11461C21.2309 6.36007 21.4082 6.66521 21.5 7C22.1986 10.2967 22.1986 13.7033 21.5 17C21.4082 17.3348 21.2309 17.6399 20.9854 17.8854C20.7399 18.1309 20.4348 18.3082 20.1 18.4C14.7366 19.2887 9.26344 19.2887 3.90001 18.4C3.56522 18.3082 3.26008 18.1309 3.01461 17.8854C2.76914 17.6399 2.5918 17.3348 2.50001 17Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 15L15 12L10 9V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity"
              aria-label="GitHub"
            >
              <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 22V18C15.1392 16.7473 14.78 15.4901 14 14.5C17 14.5 20 12.5 20 9C20.08 7.75 19.73 6.52 19 5.5C19.28 4.35 19.28 3.15 19 2C19 2 18 2 16 3.5C13.36 3 10.64 3 8.00004 3.5C6.00004 2 5.00004 2 5.00004 2C4.70004 3.15 4.70004 4.35 5.00004 5.5C4.27191 6.51588 3.91851 7.75279 4.00004 9C4.00004 12.5 7.00004 14.5 10 14.5C9.61004 14.99 9.32004 15.55 9.15004 16.15C8.98004 16.75 8.93004 17.38 9.00004 18M9.00004 18V22M9.00004 18C4.49004 20 4 16 2 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a
              href="/rss.xml"
              className="hover:opacity-70 transition-opacity"
              aria-label="RSS Feed"
            >
              <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 11C6.38695 11 8.67613 11.9482 10.364 13.636C12.0518 15.3239 13 17.6131 13 20M4 4C8.24346 4 12.3131 5.68571 15.3137 8.68629C18.3143 11.6869 20 15.7565 20 20M6 19C6 19.5523 5.55228 20 5 20C4.44772 20 4 19.5523 4 19C4 18.4477 4.44772 18 5 18C5.55228 18 6 18.4477 6 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

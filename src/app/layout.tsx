import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Link from 'next/link';
import { STRINGS } from '@/constants/strings';
import { AtlassianProvider } from '@/components/AtlassianProvider';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: STRINGS.app.title,
  description: STRINGS.app.description,
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AtlassianProvider>
          <a href="#main-content" className="skip-link">
            {STRINGS.nav.skipToContent}
          </a>
          <header className="app-header">
            <nav className="app-nav" aria-label="Main navigation">
              <Link href="/" className="app-logo">
                {STRINGS.app.title}
              </Link>
            </nav>
          </header>
          <main id="main-content" tabIndex={-1} className="app-main">
            {children}
          </main>
          <footer className="app-footer">
            <div className="footer-content">
              <p>
                {STRINGS.footer.dataProvider}{' '}
                <a
                  href="https://www.tvmaze.com/api"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  {STRINGS.footer.apiName}
                </a>
              </p>
            </div>
          </footer>
        </AtlassianProvider>
      </body>
    </html>
  );
};

export default RootLayout;

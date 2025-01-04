import '@/styles/globals.css';

import type { Viewport } from 'next';
import { ThemeProvider } from 'next-themes';

import { generateSeoMetadata } from '@/lib/generate-seo-metadata';

export const viewport: Viewport = {
  themeColor: 'black',
};

export const generateMetadata = () => {
  return generateSeoMetadata();
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html
      lang='en'
      className={'scroll-smooth font-primary'}
      suppressHydrationWarning
    >
      <body className='bg-light tracking-wide text-dark transition-all duration-300 selection:bg-[rgb(var(--tw-clr-primary-300)_/_30%)] dark:bg-black dark:text-light'>
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          enableSystem={false}
        >
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;

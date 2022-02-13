import type { NextPage } from 'next';

import ButtonLink from '@/components/links/ButtonLink';
import CustomLink from '@/components/links/CustomLink';
import Seo from '@/components/Seo';

const HomePage: NextPage = () => {
  return (
    <>
      <Seo />

      <main>
        <section className='bg-black'>
          <div className='layout flex min-h-screen flex-col items-center justify-center text-center'>
            <h1>Open Graph Generator</h1>
            <p className='mt-2 text-sm text-primary-50'>
              Made for personal use using{' '}
              <CustomLink href='https://github.com/neg4n/next-api-og-image'>
                next-api-og-image
              </CustomLink>
            </p>
            <div className='mt-4 flex flex-wrap gap-2 text-sm text-gray-50'>
              <ButtonLink href='https://github.com/lordronz/og-image'>
                See the repository
              </ButtonLink>
              <ButtonLink href='/builder'>Link Builder</ButtonLink>
            </div>

            <footer className='absolute bottom-2 text-gray-50'>
              © {new Date().getFullYear()} By Aaron Christopher
            </footer>
          </div>
        </section>
      </main>
    </>
  );
};

export default HomePage;

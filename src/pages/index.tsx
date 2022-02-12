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
          <div className='flex flex-col items-center justify-center min-h-screen text-center layout'>
            <h1>Open Graph Generator</h1>
            <p className='mt-2 text-sm text-primary-50'>
              Made for personal use using{' '}
              <CustomLink href='https://github.com/neg4n/next-api-og-image'>
                next-api-og-image
              </CustomLink>
            </p>
            <div className='flex flex-wrap gap-2 mt-4 text-sm text-gray-50'>
              <ButtonLink href='https://github.com/lordronz/og-image'>
                See the repository
              </ButtonLink>
              <ButtonLink href='/builder'>Link Builder</ButtonLink>
            </div>

            <footer className='absolute text-gray-50 bottom-2'>
              © {new Date().getFullYear()} By Aaron Christopher
            </footer>
          </div>
        </section>
      </main>
    </>
  );
};

export default HomePage;

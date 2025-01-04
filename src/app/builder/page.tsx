import type { Metadata, NextPage } from 'next';

import BuilderPage from '@/components/pages/builder';
import { generateSeoMetadata } from '@/lib/generate-seo-metadata';

export const generateMetadata = (): Metadata => {
  return {
    ...generateSeoMetadata({ templateTitle: 'Build' }),
  };
};

const Page: NextPage = () => {
  return <BuilderPage />;
};

export default Page;

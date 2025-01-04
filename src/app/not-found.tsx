import type { Metadata, NextPage } from 'next';

import NotFound from '@/components/pages/not-found';
import { generateSeoMetadata } from '@/lib/generate-seo-metadata';

export const generateMetadata = (): Metadata => {
  return {
    ...generateSeoMetadata({ templateTitle: 'Not Found' }),
  };
};

const NotFoundPage: NextPage = () => {
  return <NotFound />;
};

export default NotFoundPage;

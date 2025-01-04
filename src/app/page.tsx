import type { Metadata, NextPage } from 'next';

import Home from '@/components/pages/home-page';
import { generateSeoMetadata } from '@/lib/generate-seo-metadata';

export const generateMetadata = (): Metadata => {
  return generateSeoMetadata();
};

const HomePage: NextPage = () => {
  return <Home />;
};

export default HomePage;

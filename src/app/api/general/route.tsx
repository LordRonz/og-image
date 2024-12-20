import { ImageResponse } from 'next/og';

import ORIGIN_URL from '@/constant/originUrl';
import { loadGoogleFont } from '@/lib/helper';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const hasDesc = searchParams.has('description');
    const desc = hasDesc
      ? searchParams.get('description')?.slice(0, 512)
      : 'Description';
    const hasSiteName = searchParams.has('siteName');
    const siteName = hasSiteName
      ? searchParams.get('siteName')?.slice(0, 100)
      : 'Site Name';
    const hasLogo = searchParams.has('logo');
    const logo = hasLogo
      ? searchParams.get('logo')?.slice(0, 200)
      : `${ORIGIN_URL}/images/logo.jpg`;
    const hasTheme = searchParams.has('theme');
    const theme = hasTheme ? searchParams.get('theme')?.slice(0, 10) : 'dark';
    const templateTitle = searchParams.get('templateTitle')?.slice(0, 50);
    const hasLogoWidth = searchParams.has('logoWidth');
    const logoWidth = hasLogoWidth
      ? (searchParams.get('logoWidth')?.slice(0, 4) ?? '100')
      : '100';
    const logoHeight = searchParams.get('logoHeight')?.slice(0, 4);
    const isDark = theme === 'dark';

    return new ImageResponse(
      (
        <div
          style={{
            backgroundColor: isDark ? '#111' : '#eee',
            backgroundSize: '150px 150px',
            height: '100%',
            width: '100%',
            display: 'flex',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            flexWrap: 'nowrap',
            color: isDark ? 'black' : 'white',
          }}
        >
          <img
            src={logo}
            alt='Favicon'
            width={+logoWidth}
            height={logoHeight ? +logoHeight : undefined}
          />
          <h1
            tw='block text-6xl font-bold mb-0'
            style={{ color: isDark ? '#E5E7EB' : '#374151' }}
          >
            {templateTitle || siteName}
          </h1>
          {templateTitle && (
            <h3
              tw='block text-2xl font-bold mt-2'
              style={{ color: isDark ? '#E5E7EB' : '#374151' }}
            >
              {siteName}
            </h3>
          )}
          <p
            tw='mt-4 text-3xl'
            style={{
              color: isDark ? '#D1D5DB' : '#1F2937',
            }}
          >
            {desc}
          </p>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Geist',
            data: await loadGoogleFont('Geist'),
            style: 'normal',
            weight: 400,
          },
          {
            name: 'Geist',
            data: await loadGoogleFont('Geist', 700),
            style: 'normal',
            weight: 700,
          },
        ],
      },
    );
  } catch (e: unknown) {
    console.log(`${(e as Error).message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}

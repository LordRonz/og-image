import { ImageResponse } from 'next/og';

import ORIGIN_URL from '@/constant/originUrl';
import { loadGoogleFont } from '@/lib/helper';
// App router includes @vercel/og.
// No need to install it.

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const hasTitle = searchParams.has('title');
    const title = hasTitle ? searchParams.get('title')?.slice(0, 64) : 'Title';
    const hasType = searchParams.has('type');
    const type = hasType ? searchParams.get('type')?.slice(0, 100) : 'Website';
    const hasDesc = searchParams.has('description');
    const desc = hasDesc ? searchParams.get('description')?.slice(0, 512) : '';

    return new ImageResponse(
      (
        <div
          style={{
            backgroundColor: '#222',
            backgroundSize: '150px 150px',
            height: '100%',
            width: '100%',
            display: 'flex',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            flexWrap: 'nowrap',
            color: 'white',
          }}
        >
          <div tw='flex items-center justify-center space-x-3'>
            <img
              tw='max-w-28 mr-8'
              src={`${ORIGIN_URL}/images/logo.jpg`}
              alt='Favicon'
            />
            <span tw='text-left block flex-col'>
              <h2 tw='font-semibold text-3xl'>{type} by</h2>
              <p
                style={{
                  color: '#222',
                  backgroundImage:
                    'linear-gradient(to top right, #eb2754, #ff9a9a)',
                  marginTop: '0.5rem',
                  padding: '0.4rem 1rem',
                  fontWeight: 700,
                  fontSize: '2.3rem',
                }}
              >
                Aaron Christopher
              </p>
            </span>
          </div>
          <h1 tw='mt-8 text-6xl'>{title}</h1>
          {desc ? <p tw='text-2xl mt-4 text-[#D1D5DB]'>{desc}</p> : ''}
          <p
            style={{
              position: 'absolute',
              bottom: '1rem',
              right: '1rem',
              fontWeight: 600,
              fontSize: '1.5rem',
              backgroundImage:
                'linear-gradient(to top right, #eb2754, #ff9a9a)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            aaronct.dev
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

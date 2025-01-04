/* eslint-disable @next/next/no-img-element */
'use client';
import type { NextPage } from 'next';
import queryString from 'query-string';
import * as React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';

import { GeneralQueryEnum } from '@/app/api/general/type';
import Button from '@/components/buttons/Button';
import Input from '@/components/forms/Input';
import SelectInput from '@/components/forms/SelectInput';
import ORIGIN_URL from '@/constant/originUrl';
import { toastStyle } from '@/constant/toast';

type Query = Record<keyof typeof GeneralQueryEnum | 'ogType', string>;

const BuilderPage: NextPage = () => {
  const [link, setLink] = React.useState(`${ORIGIN_URL}/api/general`);
  const [imgLink, setImgLink] = React.useState(`${ORIGIN_URL}/api/general`);

  //#region  //*=========== Forms ===========
  const methods = useForm<Query>({
    mode: 'onTouched',
    defaultValues: {
      theme: 'dark',
    },
  });
  const { handleSubmit, watch } = methods;
  //#endregion  //*======== Forms ===========

  //#region  //*=========== Show live change ===========
  const formData = watch();
  React.useEffect(() => {
    const { ogType, ...rest } = formData;
    const qurl = queryString.stringifyUrl(
      {
        url: `${ORIGIN_URL}/api/${ogType}`,
        query: { ...rest },
      },
      {
        skipEmptyString: true,
      },
    );

    setLink(qurl);
  }, [formData]);
  //#endregion  //*======== Show live change ===========

  //#region  //*=========== Submit ===========
  const onSubmit: SubmitHandler<Query> = () => {
    setImgLink(link);
  };
  //#endregion  //*======== Submit ===========

  return (
    <>
      <section className='bg-black'>
        <div className='layout min-h-screen py-20'>
          <h1>Builder</h1>

          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='grid items-center gap-8 md:grid-cols-[2fr,3fr]'>
                <div className='mt-8 flex flex-col gap-3 md:max-w-sm'>
                  <SelectInput
                    id='ogType'
                    label='ogType'
                    helperText='api type routes'
                  >
                    <option value='general'>general</option>
                    <option value='gradient'>gradient</option>
                    <option value='blog'>blog</option>
                  </SelectInput>
                  <Input id='siteName' label='siteName' />
                  <Input id='description' label='description' />
                  <Input
                    id='templateTitle'
                    label='templateTitle'
                    helperText='Adding templateTitle will change layout'
                  />
                  <Input
                    id='logo'
                    label='Logo Links'
                    helperText={`default: ${ORIGIN_URL}/images/logo.jpg`}
                  />
                  <Input
                    id='banner'
                    label='Banner Links'
                    helperText='This is only for /blog'
                  />
                  <div className='flex gap-2'>
                    <Input
                      className='w-full'
                      id='logoWidth'
                      label='logoWidth'
                      helperText='default: 100'
                    />
                    <Input
                      className='w-full'
                      id='logoHeight'
                      label='logoHeight'
                      helperText='default: auto'
                    />
                  </div>
                  <SelectInput id='theme' label='theme'>
                    <option value='dark'>dark</option>
                    <option value='light'>light</option>
                  </SelectInput>
                  <Button type='submit'>Generate</Button>
                </div>
                <div>
                  <CopyToClipboard
                    text={imgLink}
                    onCopy={() =>
                      toast.success('Copied image URL to clipboard')
                    }
                  >
                    <img
                      key={imgLink}
                      src={imgLink}
                      className='w-full cursor-pointer bg-gray-500'
                      alt=''
                      width='1200'
                      height='630'
                      title='Click to copy image URL to clipboard'
                    />
                  </CopyToClipboard>
                  <p className='mt-2 break-all text-sm text-primary-50'>
                    {link}
                  </p>
                </div>
              </div>
            </form>
          </FormProvider>
        </div>
      </section>
      <Toaster
        toastOptions={{
          style: toastStyle,
          loading: {
            iconTheme: {
              primary: '#eb2754',
              secondary: 'black',
            },
          },
        }}
      />
    </>
  );
};

export default BuilderPage;

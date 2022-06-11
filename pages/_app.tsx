import React from 'react';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

const TSmithCreative = ({ Component, pageProps }: AppProps) => {
  // @TODO: This will cause problems if I start using query args or fragments.
  const canonincalURL = process.env.NEXT_PUBLIC_SITE_DOMAIN + useRouter().asPath;

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />

        <meta name="viewport" content="width=device-width" />
        <link rel="canonical" href={canonincalURL} />
        <meta property="og:url" content={canonincalURL} />
        <meta name="twitter:url" content={canonincalURL} />
      </Head>

      <div>Header</div>
      <Component {...pageProps} />
      <div>Footer</div>
      <div>Analytics</div>
    </>
  );
};

export default TSmithCreative;

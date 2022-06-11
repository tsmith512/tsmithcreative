import React from 'react';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

import '../styles/global.scss';

import {
  Footer,
  Nav,
} from '../components';

const TSmithCreative = ({ Component, pageProps }: AppProps) => {
  // @TODO: This will cause problems if I start using query args or fragments.
  const canonincalURL = process.env.NEXT_PUBLIC_SITE_DOMAIN + useRouter().asPath;

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={canonincalURL} />
        <meta property="og:url" content={canonincalURL} />
        <meta name="twitter:url" content={canonincalURL} />

        <link rel="dns-prefetch" href="https://cloud.typography.com/" />
        {/* @TODO: Async load this*/}
        <link rel="stylesheet" href="https://cloud.typography.com/6795652/7424152/css/fonts.css" />
      </Head>

      <Nav />
      <Component {...pageProps} />
      <Footer />
      <div>Analytics</div>
    </>
  );
};

export default TSmithCreative;

import React from 'react';
import Head from 'next/head';

interface MyAppProps {
  Component: React.ComponentType<any>;
  pageProps: any;
}

export default function MyApp({ Component, pageProps }: MyAppProps) {
  return (
    <>
      <Head>
        <link rel="icon" type="image/png" href="/logo-elkimagic-06.png" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

import '@/styles/globals.css';
import { ErrorBoundary, StoreProvider } from '@/components';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement, pageProps: P) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <StoreProvider>
      <ErrorBoundary>
        {getLayout(<Component {...pageProps} />, pageProps)}
      </ErrorBoundary>
    </StoreProvider>
  );
}

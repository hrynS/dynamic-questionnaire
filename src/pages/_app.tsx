import '@/styles/globals.css';
import { ErrorBoundary, StoreProvider } from '@/components';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
    </StoreProvider>
  );
}

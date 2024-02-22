import '@/styles/globals.css';
import { store } from '@/app/store';
import ErrorBoundary from '@/components/containers/ErrorBoundary/ErrorBoundary';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
    </Provider>
  );
}

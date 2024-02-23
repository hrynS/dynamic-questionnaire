import ErrorSection from '@/components/containers/ErrorBoundary/ErrorSection';
import Layout from '@/lib/features/Questionnaire/components/Layout';
import Head from 'next/head';
import React, { PropsWithChildren } from 'react';

class ErrorBoundary extends React.Component<
  PropsWithChildren,
  {
    hasError: boolean;
  }
> {
  constructor(props: {}) {
    super(props);

    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <Layout mainClassName={'bg-gradient-primary'}>
          <Head>
            <title>Something went wrong</title>
          </Head>
          <ErrorSection resetError={() => this.setState({ hasError: false })} />
        </Layout>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

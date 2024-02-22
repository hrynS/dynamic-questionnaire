import ErrorSection from '@/components/containers/ErrorBoundary/ErrorSection';
import Layout from '@/features/Questionnaire/components/Layout';
import Head from 'next/head';

export default function Error404() {
  return (
    <Layout mainClassName={'bg-gradient-primary'}>
      <Head>
        <title>The page was not found</title>
      </Head>
      <ErrorSection heading={'Oops! The page was not found'} />
    </Layout>
  );
}
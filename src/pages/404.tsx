import { ErrorSection } from '@/components';
import Layout from '@/lib/features/Questionnaire/components/Layout';
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

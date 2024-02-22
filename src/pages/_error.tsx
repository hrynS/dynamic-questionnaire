import ErrorSection from '@/components/containers/ErrorBoundary/ErrorSection';
import Layout from '@/features/Questionnaire/components/Layout';
import { NextPageContext } from 'next';
import Head from 'next/head';

interface ErrorProps {
  status?: string;
}

function Error({ status }: ErrorProps) {
  console.log('Error_props', status);
  return (
    <Layout mainClassName={'bg-gradient-primary'}>
      <Head>
        <title>Something went wrong</title>
      </Head>
      <ErrorSection />
    </Layout>
  );
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  console.log('Error.getInitialProps ', err);
  const status = res ? res.statusCode : err ? err.statusCode : 404;
  return { status };
};

export default Error;

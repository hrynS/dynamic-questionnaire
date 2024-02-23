import { ErrorSection } from '@/components';
import Layout from '@/lib/features/Questionnaire/components/Layout';
import { NextPageContext } from 'next';
import Head from 'next/head';

interface ErrorProps {
  statusCode?: string;
}

function Error({ statusCode }: ErrorProps) {
  return (
    <Layout mainClassName={'bg-gradient-primary'}>
      <Head>
        <title>{`Something went wrong ${statusCode && `- ${statusCode}`}`}</title>
      </Head>
      <ErrorSection />
    </Layout>
  );
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;

import Layout from '@/lib/features/Questionnaire/components/layouts/Layout';
import Head from 'next/head';
import { PropsWithChildren } from 'react';

export default function QuestionnairePageLayout({
  children,
}: PropsWithChildren) {
  return (
    <Layout mainClassName={'bg-gradient-primary'}>
      <Head>
        <title>How does this work?</title>
      </Head>
      {children}
    </Layout>
  );
}

import Layout from '@/lib/features/Questionnaire/components/layouts/Layout';
import Head from 'next/head';
import { PropsWithChildren } from 'react';

export default function QuestionLayout({ children }: PropsWithChildren) {
  return (
    <Layout
      headerProps={{
        isLight: false,
      }}
    >
      <Head>
        <title>Questionnaire</title>
      </Head>
      {children}
    </Layout>
  );
}

import '@/features/Questionnaire/styles/questionnaire.css';
import { BASE_PATHNAME } from '@/features/Questionnaire/constants';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button, Section } from '@/components';
import Layout from '@/features/Questionnaire/components/Layout';

export default function Page() {
  return (
    <Layout
      headerProps={{
        isLight: true,
      }}
      mainClassName={'bg-gradient-primary'}
    >
      <Head>
        <title>How does this work?</title>
      </Head>
      <Section heading={'Thanks for completing the questionnaire!'}>
        <Link className={'w-full flex justify-center '} href={'/'}>
          <Button className={'w-full text-lg bg-primary-white text-violet'}>
            Start over
          </Button>
        </Link>
      </Section>
    </Layout>
  );
}

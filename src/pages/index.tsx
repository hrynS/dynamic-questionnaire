import { Button, Section } from '@/components';
import Layout from '@/features/Questionnaire/components/Layout';
import Head from 'next/head';
import Link from 'next/link';
export default function Home() {
  return (
    <Layout
      headerProps={{
        isLight: true,
      }}
      mainClassName={'bg-gradient-primary'}
    >
      <Head>
        <title>Start the questionnaire</title>
      </Head>
      <Section
        heading={'Find out your unique astrological blueprint'}
        text={'We’re going to change your relationship with astrology.'}
      >
        <Link className={'w-full flex justify-center '} href={'/question/1'}>
          <Button className={'w-full text-lg bg-primary-white text-violet'}>
            Start questionnaire
          </Button>
        </Link>
      </Section>
    </Layout>
  );
}

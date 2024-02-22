import '@/features/Questionnaire/styles/questionnaire.css';
import { BASE_PATHNAME } from '@/features/Questionnaire/constants';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Button, Section } from '@/components';
import Layout from '@/features/Questionnaire/components/Layout';

export default function Page() {
  const router = useRouter();
  const { questionId } = router.query;

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
      <Section
        heading={'So how does it work?'}
        text={
          'We analyze hundreds of data points to create your unique astrological\n' +
          '        blueprint. This is combined with AI to tailor-make your astrological\n' +
          '        insights, based on your answers. We’re going to change your relationship\n' +
          '        with astrology.'
        }
      >
        <Button
          className={'w-full text-lg p-3.5 bg-primary-white text-violet'}
          onClick={() => router.push(`${BASE_PATHNAME}/${questionId}`)}
        >
          Next
        </Button>
      </Section>
    </Layout>
  );
}

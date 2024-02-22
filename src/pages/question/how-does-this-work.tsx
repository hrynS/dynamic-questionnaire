import '@/features/Questionnaire/styles/questionnaire.css';
import { BASE_PATHNAME } from '@/features/Questionnaire/constants';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Button } from '@/components';
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
      <h1 className="text-primary-white text-2xl font-bold mb-5">
        So how does it work?
      </h1>
      <p className="text-primary-white font-normal text-center text-sm leading-6 mb-10">
        We analyze hundreds of data points to create your unique astrological
        blueprint. This is combined with AI to tailor-make your astrological
        insights, based on your answers. We’re going to change your relationship
        with astrology.
      </p>
      <Button
        className={'w-full text-lg p-3.5 bg-primary-white text-violet'}
        onClick={() => router.push(`${BASE_PATHNAME}/${questionId}`)}
      >
        Next
      </Button>
    </Layout>
  );
}

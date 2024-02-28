import '@/lib/features/Questionnaire/styles/questionnaire.module.css';
import { useAppDispatch } from '@/lib/store/hooks';
import { resetQuestionnaire } from '@/lib/features/Questionnaire/slice';
import Head from 'next/head';
import Link from 'next/link';
import { Button, Section } from '@/components';
import Layout from '@/lib/features/Questionnaire/components/layouts/Layout';

export default function Page() {
  const dispatch = useAppDispatch();

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
          <Button
            onClick={() => dispatch(resetQuestionnaire())}
            className={'w-full text-lg bg-primary-white text-violet'}
          >
            Start over
          </Button>
        </Link>
      </Section>
    </Layout>
  );
}

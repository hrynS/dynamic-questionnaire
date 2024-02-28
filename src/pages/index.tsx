import { Button, Section } from '@/components';
import Layout from '@/lib/features/Questionnaire/components/layouts/Layout';
import { QuestionRepository } from '@/lib/repositories';
import Head from 'next/head';
import Link from 'next/link';

export async function getStaticProps() {
  const { questionnaireEntryQuestion } = await QuestionRepository.getAll();
  return {
    props: {
      questionnaireEntryQuestion,
    },
  };
}

type Props = {
  questionnaireEntryQuestion: string;
};

export default function Home({ questionnaireEntryQuestion }: Props) {
  return (
    <Layout mainClassName={'bg-gradient-primary'}>
      <Head>
        <title>Start the questionnaire</title>
      </Head>
      <Section
        heading={'Find out your unique astrological blueprint'}
        text={'We’re going to change your relationship with astrology.'}
      >
        <Link
          className={'w-full flex justify-center '}
          href={`/question/${questionnaireEntryQuestion}`}
        >
          <Button className={'w-full text-lg bg-primary-white text-violet'}>
            Start questionnaire
          </Button>
        </Link>
      </Section>
    </Layout>
  );
}

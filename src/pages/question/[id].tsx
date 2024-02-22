import '@/features/Questionnaire/styles/questionnaire.css';
import Layout from '@/features/Questionnaire/components/Layout';
import { QUESTION_TYPE_TO_COMPONENT } from '@/features/Questionnaire/constants';
import { Question, Questionnaire } from '@/features/Questionnaire/types';
import { QuestionRepository } from '@/lib/repositories';
import Head from 'next/head';

export async function getStaticPaths() {
  const questionnaire: Questionnaire = await QuestionRepository.getAll();

  const paths = Object.values(questionnaire).map(({ id }) => ({
    params: { id },
  }));

  return { paths, fallback: false };
}

interface ParamsWithId {
  params: {
    id: string;
  };
}

export async function getStaticProps({ params }: ParamsWithId) {
  const question = await QuestionRepository.getById(params.id);
  return {
    props: {
      question,
    },
  };
}

interface Props {
  question: Question;
}

export default function Page({ question }: Props) {
  console.log('Question_Page_should_be_on_server', question);
  const QuestionComponent = QUESTION_TYPE_TO_COMPONENT[question.type];
  return (
    <Layout>
      <Head>
        <title>Questionnaire</title>
      </Head>
      <QuestionComponent question={question} />
    </Layout>
  );
}

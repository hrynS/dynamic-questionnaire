import Layout from '@/lib/features/Questionnaire/components/Layout';
import { QUESTION_TYPE_TO_COMPONENT } from '@/lib/features/Questionnaire/constants';
import questionnaireStyles from '@/lib/features/Questionnaire/styles/questionnaire.module.css';
import { Question } from '@/lib/features/Questionnaire/types';
import { QuestionRepository } from '@/lib/repositories';
import { ParamsWithId } from '@/lib/shared/types';
import Head from 'next/head';

export async function getStaticPaths() {
  const { questionnaire } = await QuestionRepository.getAll();

  const paths = Object.values(questionnaire).map(({ id }) => ({
    params: { id },
  }));

  return { paths, fallback: false };
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

export default function QuestionPage({ question }: Props) {
  const QuestionComponent = QUESTION_TYPE_TO_COMPONENT[question.type];
  return (
    <Layout
      headerProps={{
        isLight: false,
      }}
    >
      <Head>
        <title>Questionnaire</title>
      </Head>
      <section
        className={`${questionnaireStyles['question-section']} flex flex-col items-center text-center pt-4 gap-y-7`}
      >
        <QuestionComponent question={question} />
      </section>
    </Layout>
  );
}

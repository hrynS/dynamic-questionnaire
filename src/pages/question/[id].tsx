import { default as BaseLayout } from '@/lib/features/Questionnaire/components/layouts/Layout';
import {
  QUESTION_TYPE_TO_COMPONENT,
  QUESTION_TYPE_TO_LAYOUT,
} from '@/lib/features/Questionnaire/constants';
import questionnaireStyles from '@/lib/features/Questionnaire/styles/questionnaire.module.css';
import { Question } from '@/lib/features/Questionnaire/types';
import { QuestionRepository } from '@/lib/repositories';
import { ParamsWithId } from '@/lib/shared/types';
import { ReactElement } from 'react';

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
    <section
      className={`${questionnaireStyles['question-section']} flex flex-col items-center text-center pt-4 gap-y-7`}
    >
      <QuestionComponent question={question} />
    </section>
  );
}

QuestionPage.getLayout = function getLayout(
  page: ReactElement,
  pageProps: Props,
) {
  const Layout = QUESTION_TYPE_TO_LAYOUT[pageProps.question.type] ?? BaseLayout;

  return <Layout>{page}</Layout>;
};

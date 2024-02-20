import { QUESTION_TYPE_TO_COMPONENT } from '@/constants';
import { QuestionRepository } from '@/lib/repositories';
import { useRouter } from 'next/router';

export async function getStaticPaths() {
  const questions = await QuestionRepository.getAll();
  console.log('getStaticPaths_res', questions);

  const paths = Object.values(questions).map(({ id }) => ({
    params: { id },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const question = await QuestionRepository.getById(params.id);
  console.log('getStaticProps_res', question, params);
  return {
    props: {
      question,
    },
  };
}

export default function Page({ question }) {
  const router = useRouter();
  const QuestionComponent = QUESTION_TYPE_TO_COMPONENT[question.type];
  return <QuestionComponent question={question} />;
}

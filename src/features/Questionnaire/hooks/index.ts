import { BASE_PATHNAME } from '@/features/Questionnaire/constants';
import { QuestionnaireState } from '@/features/Questionnaire/slice';
import { getNextQuestionUrlFromRules } from '@/features/Questionnaire/utils';
import { Question } from '../types';
import { useRouter } from 'next/router';

export const useQuestionSubmitAction = (
  question: Question,
  questionnaire: QuestionnaireState,
): (() => void) => {
  const { next } = question;
  const router = useRouter();

  switch (true) {
    case 'href' in next && 'rules' in next:
      return () => {
        // TODO: solution on passing the rules through the intermediate page
      };
    case 'href' in next:
      return () => {
        router.push(next.href);
      };
    case 'rules' in next:
      return () => {
        const url = getNextQuestionUrlFromRules(next.rules, questionnaire);
        if (!url) return () => {};

        router.push(url);
      };
    case 'questionId' in next:
      return () => {
        router.push(`${BASE_PATHNAME}/${next.questionId}`);
      };
    default:
      return () => {
        //   TODO: consider throwing an error when url is not resolved
      };
  }
};

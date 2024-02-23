import {
  Question,
  QuestionnaireState,
} from '@/lib/features/Questionnaire/types';
import {
  getIntermediatePageUrl,
  getNextQuestionUrlFromRules,
  getNextUrl,
  getQuestionUrl,
} from '@/lib/features/Questionnaire/utils';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

const raiseErrorOnEmptyUrl = (id: Question['id'], url?: string) => {
  if (!url) {
    throw new Error(
      `There is no url generated based on rule. Check the questionnaire configuration. Question id - ${id}`,
    );
  }
};

export const useMemoizedSubmitAction = (
  question: Question,
  questionnaire: QuestionnaireState,
) => {
  const router = useRouter();
  const createOnSubmitAction = useCallback(
    (questionnaire: QuestionnaireState) => {
      const { id, next } = question;

      switch (true) {
        case 'href' in next && 'rules' in next:
          return () => {
            const url = getNextQuestionUrlFromRules(
              next.rules,
              questionnaire,
              getIntermediatePageUrl(next.href),
            );

            raiseErrorOnEmptyUrl(id, url);

            if (url) router.push(url);
          };

        case 'href' in next:
          return () => {
            router.push(getNextUrl(next.href));
          };

        case 'rules' in next:
          return () => {
            const url = getNextQuestionUrlFromRules(
              next.rules,
              questionnaire,
              getQuestionUrl,
            );

            raiseErrorOnEmptyUrl(id, url);

            if (url) router.push(url);
          };

        case 'questionId' in next:
          return () => {
            router.push(getQuestionUrl(next.questionId));
          };

        default:
          return () => {
            throw new Error(
              `There is no action on submit. Check the questionnaire configuration. Question id - ${id}`,
            );
          };
      }
    },
    [question, questionnaire, router],
  );

  return createOnSubmitAction;
};

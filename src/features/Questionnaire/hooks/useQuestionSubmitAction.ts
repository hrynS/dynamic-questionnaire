import { questionnaireSelector } from '@/features/Questionnaire/selectors';
import { Question, QuestionnaireState } from '@/features/Questionnaire/types';
import {
  getIntermediatePageUrl,
  getNextQuestionUrlFromRules,
  getQuestionUrl,
} from '@/features/Questionnaire/utils';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

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

  console.log('useQuestionSubmitAction', questionnaire);
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
          router.push(next.href);
        };
      case 'rules' in next:
        return () => {
          const url = getNextQuestionUrlFromRules(
            next.rules,
            questionnaire,
            getQuestionUrl,
          );
          console.log('only_rules', url);
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

export const useQuestionSubmitAction = (
  question: Question,
): ((shouldSubmit: boolean) => void) => {
  const questionnaire = useSelector(questionnaireSelector);
  const [shouldSubmitQuestion, setShouldSubmitQuestion] =
    useState<boolean>(false);

  // set shouldSubmit flag to true when the Next button is clicked
  useEffect(() => {
    if (questionnaire[question.id]?.value) {
      setShouldSubmitQuestion(true);
    }
  }, [questionnaire]);

  // generate link to the next page
  const createOnSubmitAction = useMemoizedSubmitAction(question, questionnaire);

  // go to the next page
  useEffect(() => {
    if (shouldSubmitQuestion) {
      createOnSubmitAction(questionnaire)();
    }
    setShouldSubmitQuestion(false);
  }, [shouldSubmitQuestion, createOnSubmitAction]);

  return setShouldSubmitQuestion;
};
